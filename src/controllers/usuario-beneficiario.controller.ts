import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
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
        description: 'Array of Usuario has many Beneficiario',
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
        description: 'Usuario model instance',
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
        description: 'Usuario.Beneficiario PATCH success count',
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

  @del('/usuarios/{id}/beneficiarios', {
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
  }
}
