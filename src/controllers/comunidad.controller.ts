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
import {Comunidad} from '../models';
import {ComunidadRepository} from '../repositories';

export class ComunidadController {
  constructor(
    @repository(ComunidadRepository)
    public comunidadRepository : ComunidadRepository,
  ) {}

  @post('/comunidades')
  @response(200, {
    description: 'Comunidad model instance',
    content: {'application/json': {schema: getModelSchemaRef(Comunidad)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comunidad, {
            title: 'NewComunidad',
            exclude: ['idComunidad'],
          }),
        },
      },
    })
    comunidad: Omit<Comunidad, 'idComunidad'>,
  ): Promise<Comunidad> {
    return this.comunidadRepository.create(comunidad);
  }

  @get('/comunidades/count')
  @response(200, {
    description: 'Comunidad model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Comunidad) where?: Where<Comunidad>,
  ): Promise<Count> {
    return this.comunidadRepository.count(where);
  }

  @get('/comunidades')
  @response(200, {
    description: 'Array of Comunidad model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Comunidad, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Comunidad) filter?: Filter<Comunidad>,
  ): Promise<Comunidad[]> {
    return this.comunidadRepository.find(filter);
  }

  @patch('/comunidades')
  @response(200, {
    description: 'Comunidad PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comunidad, {partial: true}),
        },
      },
    })
    comunidad: Comunidad,
    @param.where(Comunidad) where?: Where<Comunidad>,
  ): Promise<Count> {
    return this.comunidadRepository.updateAll(comunidad, where);
  }

  @get('/comunidades/{id}')
  @response(200, {
    description: 'Comunidad model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Comunidad, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Comunidad, {exclude: 'where'}) filter?: FilterExcludingWhere<Comunidad>
  ): Promise<Comunidad> {
    return this.comunidadRepository.findById(id, filter);
  }

  @patch('/comunidades/{id}')
  @response(204, {
    description: 'Comunidad PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comunidad, {partial: true}),
        },
      },
    })
    comunidad: Comunidad,
  ): Promise<void> {
    await this.comunidadRepository.updateById(id, comunidad);
  }

  @put('/comunidades/{id}')
  @response(204, {
    description: 'Comunidad PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() comunidad: Comunidad,
  ): Promise<void> {
    await this.comunidadRepository.replaceById(id, comunidad);
  }

  @del('/comunidades/{id}')
  @response(204, {
    description: 'Comunidad DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.comunidadRepository.deleteById(id);
  }
}
