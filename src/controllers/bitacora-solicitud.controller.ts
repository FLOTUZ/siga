import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {BitacoraSolicitud} from '../models';
import {BitacoraSolicitudRepository} from '../repositories';

export class BitacoraSolicitudController {
  constructor(
    @repository(BitacoraSolicitudRepository)
    public bitacoraSolicitudRepository : BitacoraSolicitudRepository,
  ) {}

  @post('/solicitud-log')
  @response(200, {
    description: 'BitacoraSolicitud model instance',
    content: {'application/json': {schema: getModelSchemaRef(BitacoraSolicitud)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BitacoraSolicitud, {
            title: 'NewBitacoraSolicitud',
            exclude: ['idBitacoraSolicitud'],
          }),
        },
      },
    })
    bitacoraSolicitud: Omit<BitacoraSolicitud, 'idBitacoraSolicitud'>,
  ): Promise<BitacoraSolicitud> {
    return this.bitacoraSolicitudRepository.create(bitacoraSolicitud);
  }

  @get('/solicitud-log/count')
  @response(200, {
    description: 'BitacoraSolicitud model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(BitacoraSolicitud) where?: Where<BitacoraSolicitud>,
  ): Promise<Count> {
    return this.bitacoraSolicitudRepository.count(where);
  }

  @get('/solicitud-log')
  @response(200, {
    description: 'Array of BitacoraSolicitud model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(BitacoraSolicitud, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(BitacoraSolicitud) filter?: Filter<BitacoraSolicitud>,
  ): Promise<BitacoraSolicitud[]> {
    return this.bitacoraSolicitudRepository.find(filter);
  }

  @patch('/solicitud-log')
  @response(200, {
    description: 'BitacoraSolicitud PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BitacoraSolicitud, {partial: true}),
        },
      },
    })
    bitacoraSolicitud: BitacoraSolicitud,
    @param.where(BitacoraSolicitud) where?: Where<BitacoraSolicitud>,
  ): Promise<Count> {
    return this.bitacoraSolicitudRepository.updateAll(bitacoraSolicitud, where);
  }

  @get('/solicitud-log/{id}')
  @response(200, {
    description: 'BitacoraSolicitud model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(BitacoraSolicitud, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(BitacoraSolicitud, {exclude: 'where'}) filter?: FilterExcludingWhere<BitacoraSolicitud>
  ): Promise<BitacoraSolicitud> {
    return this.bitacoraSolicitudRepository.findById(id, filter);
  }

  @patch('/solicitud-log/{id}')
  @response(204, {
    description: 'BitacoraSolicitud PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BitacoraSolicitud, {partial: true}),
        },
      },
    })
    bitacoraSolicitud: BitacoraSolicitud,
  ): Promise<void> {
    await this.bitacoraSolicitudRepository.updateById(id, bitacoraSolicitud);
  }

  @put('/solicitud-log/{id}')
  @response(204, {
    description: 'BitacoraSolicitud PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() bitacoraSolicitud: BitacoraSolicitud,
  ): Promise<void> {
    await this.bitacoraSolicitudRepository.replaceById(id, bitacoraSolicitud);
  }

  @del('/solicitud-log/{id}')
  @response(204, {
    description: 'BitacoraSolicitud DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.bitacoraSolicitudRepository.deleteById(id);
  }
}
