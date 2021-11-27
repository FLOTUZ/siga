import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, BitacoraSolicitud} from '../models';
import {BitacoraSolicitudRepository} from './bitacora-solicitud.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.idSolicitud,
  SolicitudRelations
> {

  public readonly logSolicitud: HasManyRepositoryFactory<BitacoraSolicitud, typeof Solicitud.prototype.idSolicitud>;

  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource,
    @repository.getter('BitacoraSolicitudRepository')
    protected bitacoraSolicitudRepositoryGetter: Getter<BitacoraSolicitudRepository>,
  ) {
    super(Solicitud, dataSource);
    this.logSolicitud = this.createHasManyRepositoryFactoryFor('logSolicitud', bitacoraSolicitudRepositoryGetter,);
    this.registerInclusionResolver('logSolicitud', this.logSolicitud.inclusionResolver);
  }
}
