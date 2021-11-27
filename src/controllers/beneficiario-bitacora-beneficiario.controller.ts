import {Filter, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param, post, requestBody} from '@loopback/rest';
import {Beneficiario, BitacoraBeneficiario} from '../models';
import {BeneficiarioRepository} from '../repositories';

export class BeneficiarioBitacoraBeneficiarioController {
  constructor(
    @repository(BeneficiarioRepository)
    protected beneficiarioRepository: BeneficiarioRepository,
  ) {}

  @get('/beneficiarios/{id}/log', {
    responses: {
      '200': {
        description:
          'Bitacora de la actividad en efectuada sobre un beneficiario ',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(BitacoraBeneficiario),
            },
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

  @post('/beneficiarios/{id}/log', {
    responses: {
      '200': {
        description: 'Registrar nueva actividad en la bitacora beneficiario',
        content: {
          'application/json': {schema: getModelSchemaRef(BitacoraBeneficiario)},
        },
      },
    },
  })
  async create(
    @param.path.number('id')
    id: typeof Beneficiario.prototype.idBeneficiario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BitacoraBeneficiario, {
            title: 'NewBitacoraBeneficiarioInBeneficiario',
            exclude: ['idBitacoraBeneficiario'],
            optional: ['beneficiarioId'],
          }),
        },
      },
    })
    bitacoraBeneficiario: Omit<BitacoraBeneficiario, 'idBitacoraBeneficiario'>,
  ): Promise<BitacoraBeneficiario> {
    return this.beneficiarioRepository
      .logBeneficiarios(id)
      .create(bitacoraBeneficiario);
  }

  //ESTOS ENDPOINTS NO SE UTILIZAN DEBIDO A QUE DARIA LA POSIBILIDAD DE ELIMINAR
  //EL REGISTRO DE LA BITACORA DE UN BENEFICIARIO

  /*  @patch('/beneficiarios/{id}/bitacora-beneficiarios', {
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
    bitacoraBeneficiario: Omit<BitacoraBeneficiario, 'idBitacoraBeneficiario'>,
  ): Promise<BitacoraBeneficiario> {
    return this.beneficiarioRepository
      .logBeneficiarios(id)
      .create(bitacoraBeneficiario);
  }
*/
}
