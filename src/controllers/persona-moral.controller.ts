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
import {PersonaMoral} from '../models';
import {PersonaMoralRepository} from '../repositories';

export class PersonaMoralController {
  constructor(
    @repository(PersonaMoralRepository)
    public personaMoralRepository: PersonaMoralRepository,
  ) {}

  @post('/personas-morales')
  @response(200, {
    description: 'PersonaMoral model instance',
    content: {'application/json': {schema: getModelSchemaRef(PersonaMoral)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PersonaMoral, {
            title: 'NewPersonaMoral',
            exclude: ['idPersonaMoral'],
          }),
        },
      },
    })
    personaMoral: Omit<PersonaMoral, 'idPersonaMoral'>,
  ): Promise<PersonaMoral> {
    return this.personaMoralRepository.create(personaMoral);
  }

  @get('/personas-morales/count')
  @response(200, {
    description: 'PersonaMoral model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PersonaMoral) where?: Where<PersonaMoral>,
  ): Promise<Count> {
    return this.personaMoralRepository.count(where);
  }

  @get('/personas-morales')
  @response(200, {
    description: 'Array of PersonaMoral model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PersonaMoral, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PersonaMoral) filter?: Filter<PersonaMoral>,
  ): Promise<PersonaMoral[]> {
    return this.personaMoralRepository.find(filter);
  }

  @patch('/personas-morales')
  @response(200, {
    description: 'PersonaMoral PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PersonaMoral, {partial: true}),
        },
      },
    })
    personaMoral: PersonaMoral,
    @param.where(PersonaMoral) where?: Where<PersonaMoral>,
  ): Promise<Count> {
    return this.personaMoralRepository.updateAll(personaMoral, where);
  }

  @get('/personas-morales/{id}')
  @response(200, {
    description: 'PersonaMoral model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PersonaMoral, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PersonaMoral, {exclude: 'where'})
    filter?: FilterExcludingWhere<PersonaMoral>,
  ): Promise<PersonaMoral> {
    return this.personaMoralRepository.findById(id, filter);
  }

  @patch('/personas-morales/{id}')
  @response(204, {
    description: 'PersonaMoral PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PersonaMoral, {partial: true}),
        },
      },
    })
    personaMoral: PersonaMoral,
  ): Promise<void> {
    await this.personaMoralRepository.updateById(id, personaMoral);
  }

  @put('/personas-morales/{id}')
  @response(204, {
    description: 'PersonaMoral PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() personaMoral: PersonaMoral,
  ): Promise<void> {
    await this.personaMoralRepository.replaceById(id, personaMoral);
  }

  @del('/personas-morales/{id}')
  @response(204, {
    description: 'PersonaMoral DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.personaMoralRepository.deleteById(id);
  }
}
