import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {Beneficiario, Usuario} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioBeneficiarioController {
  constructor(
    @repository(UsuarioRepository)
    protected usuarioRepository: UsuarioRepository,
  ) {}

  @get('/usuarios/{id}/beneficiarios', {
    responses: {
      '200': {
        description:
          'Obtener lista de beneficiarios relacionados al usuario que los dio de alta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Beneficiario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Beneficiario>,
  ): Promise<Beneficiario[]> {
    return this.usuarioRepository.beneficiariosDadosDeAlta(id).find(filter);
  }

  @post('/usuarios/{id}/beneficiarios', {
    responses: {
      '200': {
        description:
          'Alta de un BENEFICIARIO relacionando con el USUARIO que lo actualiza',
        content: {
          'application/json': {schema: getModelSchemaRef(Beneficiario)},
        },
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Usuario.prototype.idUsuario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Beneficiario, {
            title: 'NewBeneficiarioInUsuario',
            exclude: ['idBeneficiario'],
            optional: ['usuarioCargaId'],
          }),
        },
      },
    })
    beneficiario: Omit<Beneficiario, 'idBeneficiario'>,
  ): Promise<Beneficiario> {
    return this.usuarioRepository
      .beneficiariosDadosDeAlta(id)
      .create(beneficiario);
  }

  @patch('/usuarios/{id}/beneficiarios', {
    responses: {
      '200': {
        description:
          'Actualizar el BENEFICIARIO relacionando con el USUARIO que lo actualiza',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Beneficiario, {partial: true}),
        },
      },
    })
    beneficiario: Partial<Beneficiario>,
    @param.query.object('where', getWhereSchemaFor(Beneficiario))
    where?: Where<Beneficiario>,
  ): Promise<Count> {
    return this.usuarioRepository
      .beneficiariosDadosDeAlta(id)
      .patch(beneficiario, where);
  }

  // Se deshabilita la eliminacion de beneficiarios al que ha atendido el usuario
  // del sistema
  /* @del('/usuarios/{id}/beneficiarios', {
    responses: {
      '200': {
        description: 'Usuario.Beneficiario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Beneficiario))
    where?: Where<Beneficiario>,
  ): Promise<Count> {
    return this.usuarioRepository.beneficiariosDadosDeAlta(id).delete(where);
  } */
}
