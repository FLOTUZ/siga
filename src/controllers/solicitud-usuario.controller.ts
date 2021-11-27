import {Filter, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param, post, requestBody} from '@loopback/rest';
import {Solicitud, Usuario} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudUsuarioController {
  constructor(
    @repository(SolicitudRepository)
    protected solicitudRepository: SolicitudRepository,
  ) {}

  @get('/solicitudes/{id}/usuarios', {
    responses: {
      '200': {
        description:
          'Arreglo de usuarios que participaron en captura de una solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.solicitudRepository.capturadores(id).find(filter);
  }

  @post('/solicitudes/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Registrar capturador participante en la solicitud',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Solicitud.prototype.idSolicitud,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'Nuevo usuario capturador en solicitud',
            exclude: ['idUsuario'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, 'idUsuario'>,
  ): Promise<Usuario> {
    return this.solicitudRepository.capturadores(id).create(usuario);
  }

  //  Se dehabilitan los metodos PUT y DELETE debido a que en caso de dejarlos
  //  habilitados, serian capaces de alterar las solicitudes que han dado de alta

  /* @patch('/solicituds/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Solicitud.Usuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Partial<Usuario>,
    @param.query.object('where', getWhereSchemaFor(Usuario))
    where?: Where<Usuario>,
  ): Promise<Count> {
    return this.solicitudRepository.capturadores(id).patch(usuario, where);
  }

  @del('/solicituds/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Solicitud.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Usuario))
    where?: Where<Usuario>,
  ): Promise<Count> {
    return this.solicitudRepository.capturadores(id).delete(where);
  } */
}
