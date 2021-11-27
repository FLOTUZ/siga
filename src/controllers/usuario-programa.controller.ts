import {Filter, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param, post, requestBody} from '@loopback/rest';
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
        description: 'Lista de PROGRAMAS dados de alta por un USUARIO',
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
        description:
          'Nuevo programa dado de alta por un usuario especificado por su ID',
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
            title: 'Nuevo programa dado de alta por usuario',
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

  // Estos endpoints se deshabilitan debido a que de lo contrario, se deberia
  // especificar el ID del usuario para eliminar o editar un PROGRAMA
  /*
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
  } */
}
