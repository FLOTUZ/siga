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
import {Captura} from '../models';
import {CapturaRepository} from '../repositories';

export class CapturaController {
  constructor(
    @repository(CapturaRepository)
    public capturaRepository: CapturaRepository,
  ) {}

  @post('/capturas')
  @response(200, {
    description: 'Captura model instance',
    content: {'application/json': {schema: getModelSchemaRef(Captura)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Captura, {
            title: 'NewCaptura',
            exclude: ['idCaptura'],
          }),
        },
      },
    })
    captura: Omit<Captura, 'idCaptura'>,
  ): Promise<Captura> {
    return this.capturaRepository.create(captura);
  }

  @get('/capturas/count')
  @response(200, {
    description: 'Captura model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Captura) where?: Where<Captura>): Promise<Count> {
    return this.capturaRepository.count(where);
  }

  @get('/capturas')
  @response(200, {
    description: 'Array of Captura model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Captura, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Captura) filter?: Filter<Captura>,
  ): Promise<Captura[]> {
    return this.capturaRepository.find(filter);
  }

  @patch('/capturas')
  @response(200, {
    description: 'Captura PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Captura, {partial: true}),
        },
      },
    })
    captura: Captura,
    @param.where(Captura) where?: Where<Captura>,
  ): Promise<Count> {
    return this.capturaRepository.updateAll(captura, where);
  }

  @get('/capturas/{id}')
  @response(200, {
    description: 'Captura model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Captura, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Captura, {exclude: 'where'})
    filter?: FilterExcludingWhere<Captura>,
  ): Promise<Captura> {
    return this.capturaRepository.findById(id, filter);
  }

  @patch('/capturas/{id}')
  @response(204, {
    description: 'Captura PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Captura, {partial: true}),
        },
      },
    })
    captura: Captura,
  ): Promise<void> {
    await this.capturaRepository.updateById(id, captura);
  }

  @put('/capturas/{id}')
  @response(204, {
    description: 'Captura PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() captura: Captura,
  ): Promise<void> {
    await this.capturaRepository.replaceById(id, captura);
  }

  @del('/capturas/{id}')
  @response(204, {
    description: 'Captura DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.capturaRepository.deleteById(id);
  }
}
