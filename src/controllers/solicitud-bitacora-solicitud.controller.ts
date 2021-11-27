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
  BitacoraSolicitud,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudBitacoraSolicitudController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/bitacora-solicituds', {
    responses: {
      '200': {
        description: 'Array of Solicitud has many BitacoraSolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(BitacoraSolicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<BitacoraSolicitud>,
  ): Promise<BitacoraSolicitud[]> {
    return this.solicitudRepository.bitacoraSolicitudes(id).find(filter);
  }

  @post('/solicituds/{id}/bitacora-solicituds', {
    responses: {
      '200': {
        description: 'Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(BitacoraSolicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Solicitud.prototype.idSolicitud,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BitacoraSolicitud, {
            title: 'NewBitacoraSolicitudInSolicitud',
            exclude: ['idBitacoraSolicitud'],
            optional: ['solicitudId']
          }),
        },
      },
    }) bitacoraSolicitud: Omit<BitacoraSolicitud, 'idBitacoraSolicitud'>,
  ): Promise<BitacoraSolicitud> {
    return this.solicitudRepository.bitacoraSolicitudes(id).create(bitacoraSolicitud);
  }

  @patch('/solicituds/{id}/bitacora-solicituds', {
    responses: {
      '200': {
        description: 'Solicitud.BitacoraSolicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BitacoraSolicitud, {partial: true}),
        },
      },
    })
    bitacoraSolicitud: Partial<BitacoraSolicitud>,
    @param.query.object('where', getWhereSchemaFor(BitacoraSolicitud)) where?: Where<BitacoraSolicitud>,
  ): Promise<Count> {
    return this.solicitudRepository.bitacoraSolicitudes(id).patch(bitacoraSolicitud, where);
  }

  @del('/solicituds/{id}/bitacora-solicituds', {
    responses: {
      '200': {
        description: 'Solicitud.BitacoraSolicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(BitacoraSolicitud)) where?: Where<BitacoraSolicitud>,
  ): Promise<Count> {
    return this.solicitudRepository.bitacoraSolicitudes(id).delete(where);
  }
}
