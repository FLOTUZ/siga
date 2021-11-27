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
import {Solicitud, Usuario} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioSolicitudController {
  constructor(
    @repository(UsuarioRepository)
    protected usuarioRepository: UsuarioRepository,
  ) {}

  @get('/usuarios/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Usuario has one Solicitud',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Solicitud),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Solicitud>,
  ): Promise<Solicitud> {
    return this.usuarioRepository.apoyosEntregados(id).get(filter);
  }

  @post('/usuarios/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Usuario.prototype.idUsuario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitudInUsuario',
            exclude: ['idSolicitud'],
            optional: ['usuarioEntregaId'],
          }),
        },
      },
    })
    solicitud: Omit<Solicitud, 'idSolicitud'>,
  ): Promise<Solicitud> {
    return this.usuarioRepository.apoyosEntregados(id).create(solicitud);
  }

  @patch('/usuarios/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Usuario.Solicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    solicitud: Partial<Solicitud>,
    @param.query.object('where', getWhereSchemaFor(Solicitud))
    where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.usuarioRepository.apoyosEntregados(id).patch(solicitud, where);
  }

  @del('/usuarios/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Usuario.Solicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Solicitud))
    where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.usuarioRepository.apoyosEntregados(id).delete(where);
  }
}
