import {Filter, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param, post, requestBody} from '@loopback/rest';
import {BitacoraSolicitud, Solicitud} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudBitacoraSolicitudController {
  constructor(
    @repository(SolicitudRepository)
    protected solicitudRepository: SolicitudRepository,
  ) {}

  @get('/solicitudes/{id}/log', {
    responses: {
      '200': {
        description: 'Arreglo de logs de actividad en una solicitud',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(BitacoraSolicitud),
            },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<BitacoraSolicitud>,
  ): Promise<BitacoraSolicitud[]> {
    return this.solicitudRepository.logSolicitud(id).find(filter);
  }

  @post('/solicitudes/{id}/log', {
    responses: {
      '200': {
        description: 'Registrar nueva actividad en el log de la solicitud',
        content: {
          'application/json': {schema: getModelSchemaRef(BitacoraSolicitud)},
        },
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
            optional: ['solicitudId'],
          }),
        },
      },
    })
    bitacoraSolicitud: Omit<BitacoraSolicitud, 'idBitacoraSolicitud'>,
  ): Promise<BitacoraSolicitud> {
    return this.solicitudRepository.logSolicitud(id).create(bitacoraSolicitud);
  }

  //ESTOS ENDPOINTS NO SE UTILIZAN DEBIDO A QUE DARIA LA POSIBILIDAD DE ELIMINAR
  //EL REGISTRO DE LA BITACORA DE UNA SOLICITUD

  /* @patch('/solicituds/{id}/bitacora-solicituds', {
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
    return this.solicitudRepository.logSolicitud(id).patch(bitacoraSolicitud, where);
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
    return this.solicitudRepository.logSolicitud(id).delete(where);
  } */
}
