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
import {BitacoraBeneficiario} from '../models';
import {BitacoraBeneficiarioRepository} from '../repositories';

export class BitacoraBeneficiarioController {
  constructor(
    @repository(BitacoraBeneficiarioRepository)
    public bitacoraBeneficiarioRepository : BitacoraBeneficiarioRepository,
  ) {}

  @post('/beneficiario-log')
  @response(200, {
    description: 'BitacoraBeneficiario model instance',
    content: {'application/json': {schema: getModelSchemaRef(BitacoraBeneficiario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BitacoraBeneficiario, {
            title: 'NewBitacoraBeneficiario',
            exclude: ['idBitacoraBeneficiario'],
          }),
        },
      },
    })
    bitacoraBeneficiario: Omit<BitacoraBeneficiario, 'idBitacoraBeneficiario'>,
  ): Promise<BitacoraBeneficiario> {
    return this.bitacoraBeneficiarioRepository.create(bitacoraBeneficiario);
  }

  @get('/beneficiario-log/count')
  @response(200, {
    description: 'BitacoraBeneficiario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(BitacoraBeneficiario) where?: Where<BitacoraBeneficiario>,
  ): Promise<Count> {
    return this.bitacoraBeneficiarioRepository.count(where);
  }

  @get('/beneficiario-log')
  @response(200, {
    description: 'Array of BitacoraBeneficiario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(BitacoraBeneficiario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(BitacoraBeneficiario) filter?: Filter<BitacoraBeneficiario>,
  ): Promise<BitacoraBeneficiario[]> {
    return this.bitacoraBeneficiarioRepository.find(filter);
  }

  @patch('/beneficiario-log')
  @response(200, {
    description: 'BitacoraBeneficiario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BitacoraBeneficiario, {partial: true}),
        },
      },
    })
    bitacoraBeneficiario: BitacoraBeneficiario,
    @param.where(BitacoraBeneficiario) where?: Where<BitacoraBeneficiario>,
  ): Promise<Count> {
    return this.bitacoraBeneficiarioRepository.updateAll(bitacoraBeneficiario, where);
  }

  @get('/beneficiario-log/{id}')
  @response(200, {
    description: 'BitacoraBeneficiario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(BitacoraBeneficiario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(BitacoraBeneficiario, {exclude: 'where'}) filter?: FilterExcludingWhere<BitacoraBeneficiario>
  ): Promise<BitacoraBeneficiario> {
    return this.bitacoraBeneficiarioRepository.findById(id, filter);
  }

  @patch('/beneficiario-log/{id}')
  @response(204, {
    description: 'BitacoraBeneficiario PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BitacoraBeneficiario, {partial: true}),
        },
      },
    })
    bitacoraBeneficiario: BitacoraBeneficiario,
  ): Promise<void> {
    await this.bitacoraBeneficiarioRepository.updateById(id, bitacoraBeneficiario);
  }

  @put('/beneficiario-log/{id}')
  @response(204, {
    description: 'BitacoraBeneficiario PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() bitacoraBeneficiario: BitacoraBeneficiario,
  ): Promise<void> {
    await this.bitacoraBeneficiarioRepository.replaceById(id, bitacoraBeneficiario);
  }

  @del('/beneficiario-log/{id}')
  @response(204, {
    description: 'BitacoraBeneficiario DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.bitacoraBeneficiarioRepository.deleteById(id);
  }
}
