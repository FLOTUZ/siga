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
  PersonaFisica,
} from '../models';
import {BeneficiarioRepository} from '../repositories';

export class BeneficiarioPersonaFisicaController {
  constructor(
    @repository(BeneficiarioRepository) protected beneficiarioRepository: BeneficiarioRepository,
  ) { }

  @get('/beneficiarios/{id}/persona-fisica', {
    responses: {
      '200': {
        description: 'Beneficiario has one PersonaFisica',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PersonaFisica),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<PersonaFisica>,
  ): Promise<PersonaFisica> {
    return this.beneficiarioRepository.personaFisica(id).get(filter);
  }

  @post('/beneficiarios/{id}/persona-fisica', {
    responses: {
      '200': {
        description: 'Beneficiario model instance',
        content: {'application/json': {schema: getModelSchemaRef(PersonaFisica)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Beneficiario.prototype.idBeneficiario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PersonaFisica, {
            title: 'NewPersonaFisicaInBeneficiario',
            exclude: ['idPersonaFisica'],
            optional: ['beneficiarioId']
          }),
        },
      },
    }) personaFisica: Omit<PersonaFisica, 'idPersonaFisica'>,
  ): Promise<PersonaFisica> {
    return this.beneficiarioRepository.personaFisica(id).create(personaFisica);
  }

  @patch('/beneficiarios/{id}/persona-fisica', {
    responses: {
      '200': {
        description: 'Beneficiario.PersonaFisica PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PersonaFisica, {partial: true}),
        },
      },
    })
    personaFisica: Partial<PersonaFisica>,
    @param.query.object('where', getWhereSchemaFor(PersonaFisica)) where?: Where<PersonaFisica>,
  ): Promise<Count> {
    return this.beneficiarioRepository.personaFisica(id).patch(personaFisica, where);
  }

  @del('/beneficiarios/{id}/persona-fisica', {
    responses: {
      '200': {
        description: 'Beneficiario.PersonaFisica DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PersonaFisica)) where?: Where<PersonaFisica>,
  ): Promise<Count> {
    return this.beneficiarioRepository.personaFisica(id).delete(where);
  }
}
