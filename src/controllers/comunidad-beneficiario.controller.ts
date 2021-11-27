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
  Comunidad,
  Beneficiario,
} from '../models';
import {ComunidadRepository} from '../repositories';

export class ComunidadBeneficiarioController {
  constructor(
    @repository(ComunidadRepository) protected comunidadRepository: ComunidadRepository,
  ) { }

  @get('/comunidads/{id}/beneficiarios', {
    responses: {
      '200': {
        description: 'Array of Comunidad has many Beneficiario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Beneficiario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Beneficiario>,
  ): Promise<Beneficiario[]> {
    return this.comunidadRepository.beneficiarios(id).find(filter);
  }

  @post('/comunidads/{id}/beneficiarios', {
    responses: {
      '200': {
        description: 'Comunidad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Beneficiario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Comunidad.prototype.idComunidad,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Beneficiario, {
            title: 'NewBeneficiarioInComunidad',
            exclude: ['idBeneficiario'],
            optional: ['comunidadId']
          }),
        },
      },
    }) beneficiario: Omit<Beneficiario, 'idBeneficiario'>,
  ): Promise<Beneficiario> {
    return this.comunidadRepository.beneficiarios(id).create(beneficiario);
  }

  @patch('/comunidads/{id}/beneficiarios', {
    responses: {
      '200': {
        description: 'Comunidad.Beneficiario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Beneficiario, {partial: true}),
        },
      },
    })
    beneficiario: Partial<Beneficiario>,
    @param.query.object('where', getWhereSchemaFor(Beneficiario)) where?: Where<Beneficiario>,
  ): Promise<Count> {
    return this.comunidadRepository.beneficiarios(id).patch(beneficiario, where);
  }

  @del('/comunidads/{id}/beneficiarios', {
    responses: {
      '200': {
        description: 'Comunidad.Beneficiario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Beneficiario)) where?: Where<Beneficiario>,
  ): Promise<Count> {
    return this.comunidadRepository.beneficiarios(id).delete(where);
  }
}
