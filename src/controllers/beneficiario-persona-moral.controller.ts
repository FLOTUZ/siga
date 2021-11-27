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
import {Beneficiario, PersonaMoral} from '../models';
import {BeneficiarioRepository} from '../repositories';

export class BeneficiarioPersonaMoralController {
  constructor(
    @repository(BeneficiarioRepository)
    protected beneficiarioRepository: BeneficiarioRepository,
  ) {}

  @get('/beneficiarios/{id}/persona-moral', {
    responses: {
      '200': {
        description: 'Beneficiario has one PersonaMoral',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PersonaMoral),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<PersonaMoral>,
  ): Promise<PersonaMoral> {
    return this.beneficiarioRepository.personaMoral(id).get(filter);
  }

  @post('/beneficiarios/{id}/persona-moral', {
    responses: {
      '200': {
        description: 'Beneficiario model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(PersonaMoral)},
        },
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Beneficiario.prototype.idBeneficiario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PersonaMoral, {
            title: 'NewPersonaMoralInBeneficiario',
            exclude: ['idPersonaMoral'],
            optional: ['beneficiarioId'],
          }),
        },
      },
    })
    personaMoral: Omit<PersonaMoral, 'idPersonaMoral'>,
  ): Promise<PersonaMoral> {
    return this.beneficiarioRepository.personaMoral(id).create(personaMoral);
  }

  @patch('/beneficiarios/{id}/persona-moral', {
    responses: {
      '200': {
        description: 'Beneficiario.PersonaMoral PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PersonaMoral, {partial: true}),
        },
      },
    })
    personaMoral: Partial<PersonaMoral>,
    @param.query.object('where', getWhereSchemaFor(PersonaMoral))
    where?: Where<PersonaMoral>,
  ): Promise<Count> {
    return this.beneficiarioRepository
      .personaMoral(id)
      .patch(personaMoral, where);
  }

  @del('/beneficiarios/{id}/persona-moral', {
    responses: {
      '200': {
        description: 'Beneficiario.PersonaMoral DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PersonaMoral))
    where?: Where<PersonaMoral>,
  ): Promise<Count> {
    return this.beneficiarioRepository.personaMoral(id).delete(where);
  }
}
