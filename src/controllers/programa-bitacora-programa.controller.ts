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
  Programa,
  BitacoraPrograma,
} from '../models';
import {ProgramaRepository} from '../repositories';

export class ProgramaBitacoraProgramaController {
  constructor(
    @repository(ProgramaRepository) protected programaRepository: ProgramaRepository,
  ) { }

  @get('/programas/{id}/bitacora-programas', {
    responses: {
      '200': {
        description: 'Array of Programa has many BitacoraPrograma',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(BitacoraPrograma)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<BitacoraPrograma>,
  ): Promise<BitacoraPrograma[]> {
    return this.programaRepository.bitacoraProgramas(id).find(filter);
  }

  @post('/programas/{id}/bitacora-programas', {
    responses: {
      '200': {
        description: 'Programa model instance',
        content: {'application/json': {schema: getModelSchemaRef(BitacoraPrograma)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Programa.prototype.idPrograma,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BitacoraPrograma, {
            title: 'NewBitacoraProgramaInPrograma',
            exclude: ['idBitacoraPrograma'],
            optional: ['programaId']
          }),
        },
      },
    }) bitacoraPrograma: Omit<BitacoraPrograma, 'idBitacoraPrograma'>,
  ): Promise<BitacoraPrograma> {
    return this.programaRepository.bitacoraProgramas(id).create(bitacoraPrograma);
  }

  @patch('/programas/{id}/bitacora-programas', {
    responses: {
      '200': {
        description: 'Programa.BitacoraPrograma PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BitacoraPrograma, {partial: true}),
        },
      },
    })
    bitacoraPrograma: Partial<BitacoraPrograma>,
    @param.query.object('where', getWhereSchemaFor(BitacoraPrograma)) where?: Where<BitacoraPrograma>,
  ): Promise<Count> {
    return this.programaRepository.bitacoraProgramas(id).patch(bitacoraPrograma, where);
  }

  @del('/programas/{id}/bitacora-programas', {
    responses: {
      '200': {
        description: 'Programa.BitacoraPrograma DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(BitacoraPrograma)) where?: Where<BitacoraPrograma>,
  ): Promise<Count> {
    return this.programaRepository.bitacoraProgramas(id).delete(where);
  }
}
