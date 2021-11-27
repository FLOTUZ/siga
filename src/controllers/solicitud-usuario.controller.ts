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
Solicitud,
Captura,
Usuario,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudUsuarioController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of Solicitud has many Usuario through Captura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.solicitudRepository.capturadores(id).find(filter);
  }

  @post('/solicituds/{id}/usuarios', {
    responses: {
      '200': {
        description: 'create a Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Solicitud.prototype.idSolicitud,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInSolicitud',
            exclude: ['idUsuario'],
          }),
        },
      },
    }) usuario: Omit<Usuario, 'idUsuario'>,
  ): Promise<Usuario> {
    return this.solicitudRepository.capturadores(id).create(usuario);
  }

  @patch('/solicituds/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Solicitud.Usuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Partial<Usuario>,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.solicitudRepository.capturadores(id).patch(usuario, where);
  }

  @del('/solicituds/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Solicitud.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.solicitudRepository.capturadores(id).delete(where);
  }
}
