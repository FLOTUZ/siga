import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, BitacoraSolicitud} from '../models';
import {BitacoraSolicitudRepository} from './bitacora-solicitud.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.idSolicitud,
  SolicitudRelations
> {

  public readonly bitacoraSolicitudes: HasManyRepositoryFactory<BitacoraSolicitud, typeof Solicitud.prototype.idSolicitud>;

  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource, @repository.getter('BitacoraSolicitudRepository') protected bitacoraSolicitudRepositoryGetter: Getter<BitacoraSolicitudRepository>,
  ) {
    super(Solicitud, dataSource);
    this.bitacoraSolicitudes = this.createHasManyRepositoryFactoryFor('bitacoraSolicitudes', bitacoraSolicitudRepositoryGetter,);
    this.registerInclusionResolver('bitacoraSolicitudes', this.bitacoraSolicitudes.inclusionResolver);
  }
}
