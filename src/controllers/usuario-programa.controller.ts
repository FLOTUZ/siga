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
import {Programa, Usuario} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioProgramaController {
  constructor(
    @repository(UsuarioRepository)
    protected usuarioRepository: UsuarioRepository,
  ) {}

  @get('/usuarios/{id}/programas', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Programa',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Programa)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Programa>,
  ): Promise<Programa[]> {
    return this.usuarioRepository.programasCapturados(id).find(filter);
  }

  @post('/usuarios/{id}/programas', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Programa)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Usuario.prototype.idUsuario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Programa, {
            title: 'NewProgramaInUsuario',
            exclude: ['idPrograma'],
            optional: ['usuarioId'],
          }),
        },
      },
    })
    programa: Omit<Programa, 'idPrograma'>,
  ): Promise<Programa> {
    return this.usuarioRepository.programasCapturados(id).create(programa);
  }

  @patch('/usuarios/{id}/programas', {
    responses: {
      '200': {
        description: 'Usuario.Programa PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Programa, {partial: true}),
        },
      },
    })
    programa: Partial<Programa>,
    @param.query.object('where', getWhereSchemaFor(Programa))
    where?: Where<Programa>,
  ): Promise<Count> {
    return this.usuarioRepository
      .programasCapturados(id)
      .patch(programa, where);
  }

  @del('/usuarios/{id}/programas', {
    responses: {
      '200': {
        description: 'Usuario.Programa DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Programa))
    where?: Where<Programa>,
  ): Promise<Count> {
    return this.usuarioRepository.programasCapturados(id).delete(where);
  }
}
