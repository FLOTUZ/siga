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
import {BitacoraUsuario} from '../models';
import {BitacoraUsuarioRepository} from '../repositories';

export class BitacoraUsuarioController {
  constructor(
    @repository(BitacoraUsuarioRepository)
    public bitacoraUsuarioRepository : BitacoraUsuarioRepository,
  ) {}

  @post('/usuario-log')
  @response(200, {
    description: 'BitacoraUsuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(BitacoraUsuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BitacoraUsuario, {
            title: 'NewBitacoraUsuario',
            exclude: ['idBitacoraUsuario'],
          }),
        },
      },
    })
    bitacoraUsuario: Omit<BitacoraUsuario, 'idBitacoraUsuario'>,
  ): Promise<BitacoraUsuario> {
    return this.bitacoraUsuarioRepository.create(bitacoraUsuario);
  }

  @get('/usuario-log/count')
  @response(200, {
    description: 'BitacoraUsuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(BitacoraUsuario) where?: Where<BitacoraUsuario>,
  ): Promise<Count> {
    return this.bitacoraUsuarioRepository.count(where);
  }

  @get('/usuario-log')
  @response(200, {
    description: 'Array of BitacoraUsuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(BitacoraUsuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(BitacoraUsuario) filter?: Filter<BitacoraUsuario>,
  ): Promise<BitacoraUsuario[]> {
    return this.bitacoraUsuarioRepository.find(filter);
  }

  @patch('/usuario-log')
  @response(200, {
    description: 'BitacoraUsuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BitacoraUsuario, {partial: true}),
        },
      },
    })
    bitacoraUsuario: BitacoraUsuario,
    @param.where(BitacoraUsuario) where?: Where<BitacoraUsuario>,
  ): Promise<Count> {
    return this.bitacoraUsuarioRepository.updateAll(bitacoraUsuario, where);
  }

  @get('/usuario-log/{id}')
  @response(200, {
    description: 'BitacoraUsuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(BitacoraUsuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(BitacoraUsuario, {exclude: 'where'}) filter?: FilterExcludingWhere<BitacoraUsuario>
  ): Promise<BitacoraUsuario> {
    return this.bitacoraUsuarioRepository.findById(id, filter);
  }

  @patch('/usuario-log/{id}')
  @response(204, {
    description: 'BitacoraUsuario PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BitacoraUsuario, {partial: true}),
        },
      },
    })
    bitacoraUsuario: BitacoraUsuario,
  ): Promise<void> {
    await this.bitacoraUsuarioRepository.updateById(id, bitacoraUsuario);
  }

  @put('/usuario-log/{id}')
  @response(204, {
    description: 'BitacoraUsuario PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() bitacoraUsuario: BitacoraUsuario,
  ): Promise<void> {
    await this.bitacoraUsuarioRepository.replaceById(id, bitacoraUsuario);
  }

  @del('/usuario-log/{id}')
  @response(204, {
    description: 'BitacoraUsuario DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.bitacoraUsuarioRepository.deleteById(id);
  }
}
