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
import {BitacoraPrograma} from '../models';
import {BitacoraProgramaRepository} from '../repositories';

export class BitacoraProgramaController {
  constructor(
    @repository(BitacoraProgramaRepository)
    public bitacoraProgramaRepository: BitacoraProgramaRepository,
  ) {}

  @post('/programas-log')
  @response(200, {
    description: 'BitacoraPrograma model instance',
    content: {
      'application/json': {schema: getModelSchemaRef(BitacoraPrograma)},
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BitacoraPrograma, {
            title: 'NewBitacoraPrograma',
            exclude: ['idBitacoraPrograma'],
          }),
        },
      },
    })
    bitacoraPrograma: Omit<BitacoraPrograma, 'idBitacoraPrograma'>,
  ): Promise<BitacoraPrograma> {
    return this.bitacoraProgramaRepository.create(bitacoraPrograma);
  }

  @get('/programas-log/count')
  @response(200, {
    description: 'BitacoraPrograma model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(BitacoraPrograma) where?: Where<BitacoraPrograma>,
  ): Promise<Count> {
    return this.bitacoraProgramaRepository.count(where);
  }

  @get('/programas-log')
  @response(200, {
    description: 'Array of BitacoraPrograma model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(BitacoraPrograma, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(BitacoraPrograma) filter?: Filter<BitacoraPrograma>,
  ): Promise<BitacoraPrograma[]> {
    return this.bitacoraProgramaRepository.find(filter);
  }

  @patch('/programas-log')
  @response(200, {
    description: 'BitacoraPrograma PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BitacoraPrograma, {partial: true}),
        },
      },
    })
    bitacoraPrograma: BitacoraPrograma,
    @param.where(BitacoraPrograma) where?: Where<BitacoraPrograma>,
  ): Promise<Count> {
    return this.bitacoraProgramaRepository.updateAll(bitacoraPrograma, where);
  }

  @get('/programas-log/{id}')
  @response(200, {
    description: 'BitacoraPrograma model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(BitacoraPrograma, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(BitacoraPrograma, {exclude: 'where'})
    filter?: FilterExcludingWhere<BitacoraPrograma>,
  ): Promise<BitacoraPrograma> {
    return this.bitacoraProgramaRepository.findById(id, filter);
  }

  @patch('/programas-log/{id}')
  @response(204, {
    description: 'BitacoraPrograma PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BitacoraPrograma, {partial: true}),
        },
      },
    })
    bitacoraPrograma: BitacoraPrograma,
  ): Promise<void> {
    await this.bitacoraProgramaRepository.updateById(id, bitacoraPrograma);
  }

  @put('/programas-log/{id}')
  @response(204, {
    description: 'BitacoraPrograma PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() bitacoraPrograma: BitacoraPrograma,
  ): Promise<void> {
    await this.bitacoraProgramaRepository.replaceById(id, bitacoraPrograma);
  }

  @del('/programas-log/{id}')
  @response(204, {
    description: 'BitacoraPrograma DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.bitacoraProgramaRepository.deleteById(id);
  }
}
