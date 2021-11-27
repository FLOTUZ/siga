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
  Programa,
  Solicitud,
} from '../models';
import {ProgramaRepository} from '../repositories';

export class ProgramaSolicitudController {
  constructor(
    @repository(ProgramaRepository) protected programaRepository: ProgramaRepository,
  ) { }

  @get('/programas/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Array of Programa has many Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Solicitud>,
  ): Promise<Solicitud[]> {
    return this.programaRepository.solicitudes(id).find(filter);
  }

  @post('/programas/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Programa model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Programa.prototype.idPrograma,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitudInPrograma',
            exclude: ['idSolicitud'],
            optional: ['programaId']
          }),
        },
      },
    }) solicitud: Omit<Solicitud, 'idSolicitud'>,
  ): Promise<Solicitud> {
    return this.programaRepository.solicitudes(id).create(solicitud);
  }

  @patch('/programas/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Programa.Solicitud PATCH success count',
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
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.programaRepository.solicitudes(id).patch(solicitud, where);
  }

  @del('/programas/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Programa.Solicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.programaRepository.solicitudes(id).delete(where);
  }
}
