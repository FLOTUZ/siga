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
import {PersonaFisica} from '../models';
import {PersonaFisicaRepository} from '../repositories';

export class PersonaFisicaController {
  constructor(
    @repository(PersonaFisicaRepository)
    public personaFisicaRepository : PersonaFisicaRepository,
  ) {}

  @post('/personas-fisicas')
  @response(200, {
    description: 'PersonaFisica model instance',
    content: {'application/json': {schema: getModelSchemaRef(PersonaFisica)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PersonaFisica, {
            title: 'NewPersonaFisica',
            exclude: ['idPersonaFisica'],
          }),
        },
      },
    })
    personaFisica: Omit<PersonaFisica, 'idPersonaFisica'>,
  ): Promise<PersonaFisica> {
    return this.personaFisicaRepository.create(personaFisica);
  }

  @get('/personas-fisicas/count')
  @response(200, {
    description: 'PersonaFisica model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PersonaFisica) where?: Where<PersonaFisica>,
  ): Promise<Count> {
    return this.personaFisicaRepository.count(where);
  }

  @get('/personas-fisicas')
  @response(200, {
    description: 'Array of PersonaFisica model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PersonaFisica, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PersonaFisica) filter?: Filter<PersonaFisica>,
  ): Promise<PersonaFisica[]> {
    return this.personaFisicaRepository.find(filter);
  }

  @patch('/personas-fisicas')
  @response(200, {
    description: 'PersonaFisica PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PersonaFisica, {partial: true}),
        },
      },
    })
    personaFisica: PersonaFisica,
    @param.where(PersonaFisica) where?: Where<PersonaFisica>,
  ): Promise<Count> {
    return this.personaFisicaRepository.updateAll(personaFisica, where);
  }

  @get('/personas-fisicas/{id}')
  @response(200, {
    description: 'PersonaFisica model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PersonaFisica, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PersonaFisica, {exclude: 'where'}) filter?: FilterExcludingWhere<PersonaFisica>
  ): Promise<PersonaFisica> {
    return this.personaFisicaRepository.findById(id, filter);
  }

  @patch('/personas-fisicas/{id}')
  @response(204, {
    description: 'PersonaFisica PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PersonaFisica, {partial: true}),
        },
      },
    })
    personaFisica: PersonaFisica,
  ): Promise<void> {
    await this.personaFisicaRepository.updateById(id, personaFisica);
  }

  @put('/personas-fisicas/{id}')
  @response(204, {
    description: 'PersonaFisica PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() personaFisica: PersonaFisica,
  ): Promise<void> {
    await this.personaFisicaRepository.replaceById(id, personaFisica);
  }

  @del('/personas-fisicas/{id}')
  @response(204, {
    description: 'PersonaFisica DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.personaFisicaRepository.deleteById(id);
  }
}
