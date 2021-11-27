import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, BitacoraSolicitud, Usuario, Captura} from '../models';
import {BitacoraSolicitudRepository} from './bitacora-solicitud.repository';
import {CapturaRepository} from './captura.repository';
import {UsuarioRepository} from './usuario.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.idSolicitud,
  SolicitudRelations
> {

  public readonly logSolicitud: HasManyRepositoryFactory<BitacoraSolicitud, typeof Solicitud.prototype.idSolicitud>;

  public readonly capturadores: HasManyThroughRepositoryFactory<Usuario, typeof Usuario.prototype.idUsuario,
          Captura,
          typeof Solicitud.prototype.idSolicitud
        >;

  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource,
    @repository.getter('BitacoraSolicitudRepository')
    protected bitacoraSolicitudRepositoryGetter: Getter<BitacoraSolicitudRepository>, @repository.getter('CapturaRepository') protected capturaRepositoryGetter: Getter<CapturaRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Solicitud, dataSource);
    this.capturadores = this.createHasManyThroughRepositoryFactoryFor('capturadores', usuarioRepositoryGetter, capturaRepositoryGetter,);
    this.registerInclusionResolver('capturadores', this.capturadores.inclusionResolver);
    this.logSolicitud = this.createHasManyRepositoryFactoryFor('logSolicitud', bitacoraSolicitudRepositoryGetter,);
    this.registerInclusionResolver('logSolicitud', this.logSolicitud.inclusionResolver);
  }
}
