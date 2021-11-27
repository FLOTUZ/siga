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
  Beneficiario,
  BitacoraBeneficiario,
} from '../models';
import {BeneficiarioRepository} from '../repositories';

export class BeneficiarioBitacoraBeneficiarioController {
  constructor(
    @repository(BeneficiarioRepository) protected beneficiarioRepository: BeneficiarioRepository,
  ) { }

  @get('/beneficiarios/{id}/bitacora-beneficiarios', {
    responses: {
      '200': {
        description: 'Array of Beneficiario has many BitacoraBeneficiario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(BitacoraBeneficiario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<BitacoraBeneficiario>,
  ): Promise<BitacoraBeneficiario[]> {
    return this.beneficiarioRepository.logBeneficiarios(id).find(filter);
  }

  @post('/beneficiarios/{id}/bitacora-beneficiarios', {
    responses: {
      '200': {
        description: 'Beneficiario model instance',
        content: {'application/json': {schema: getModelSchemaRef(BitacoraBeneficiario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Beneficiario.prototype.idBeneficiario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BitacoraBeneficiario, {
            title: 'NewBitacoraBeneficiarioInBeneficiario',
            exclude: ['idBitacoraBeneficiario'],
            optional: ['beneficiarioId']
          }),
        },
      },
    }) bitacoraBeneficiario: Omit<BitacoraBeneficiario, 'idBitacoraBeneficiario'>,
  ): Promise<BitacoraBeneficiario> {
    return this.beneficiarioRepository.logBeneficiarios(id).create(bitacoraBeneficiario);
  }

  @patch('/beneficiarios/{id}/bitacora-beneficiarios', {
    responses: {
      '200': {
        description: 'Beneficiario.BitacoraBeneficiario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BitacoraBeneficiario, {partial: true}),
        },
      },
    })
    bitacoraBeneficiario: Partial<BitacoraBeneficiario>,
    @param.query.object('where', getWhereSchemaFor(BitacoraBeneficiario)) where?: Where<BitacoraBeneficiario>,
  ): Promise<Count> {
    return this.beneficiarioRepository.logBeneficiarios(id).patch(bitacoraBeneficiario, where);
  }

  @del('/beneficiarios/{id}/bitacora-beneficiarios', {
    responses: {
      '200': {
        description: 'Beneficiario.BitacoraBeneficiario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(BitacoraBeneficiario)) where?: Where<BitacoraBeneficiario>,
  ): Promise<Count> {
    return this.beneficiarioRepository.logBeneficiarios(id).delete(where);
  }
}
