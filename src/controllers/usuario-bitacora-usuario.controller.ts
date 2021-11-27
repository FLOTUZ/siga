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
import {
  Usuario,
  BitacoraUsuario,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioBitacoraUsuarioController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/bitacora-usuarios', {
    responses: {
      '200': {
        description: 'Array of Usuario has many BitacoraUsuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(BitacoraUsuario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<BitacoraUsuario>,
  ): Promise<BitacoraUsuario[]> {
    return this.usuarioRepository.bitacoraUsuario(id).find(filter);
  }

  @post('/usuarios/{id}/bitacora-usuarios', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(BitacoraUsuario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Usuario.prototype.idUsuario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BitacoraUsuario, {
            title: 'NewBitacoraUsuarioInUsuario',
            exclude: ['idBitacoraUsuario'],
            optional: ['usuarioId']
          }),
        },
      },
    }) bitacoraUsuario: Omit<BitacoraUsuario, 'idBitacoraUsuario'>,
  ): Promise<BitacoraUsuario> {
    return this.usuarioRepository.bitacoraUsuario(id).create(bitacoraUsuario);
  }

  @patch('/usuarios/{id}/bitacora-usuarios', {
    responses: {
      '200': {
        description: 'Usuario.BitacoraUsuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BitacoraUsuario, {partial: true}),
        },
      },
    })
    bitacoraUsuario: Partial<BitacoraUsuario>,
    @param.query.object('where', getWhereSchemaFor(BitacoraUsuario)) where?: Where<BitacoraUsuario>,
  ): Promise<Count> {
    return this.usuarioRepository.bitacoraUsuario(id).patch(bitacoraUsuario, where);
  }

  @del('/usuarios/{id}/bitacora-usuarios', {
    responses: {
      '200': {
        description: 'Usuario.BitacoraUsuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(BitacoraUsuario)) where?: Where<BitacoraUsuario>,
  ): Promise<Count> {
    return this.usuarioRepository.bitacoraUsuario(id).delete(where);
  }
}
