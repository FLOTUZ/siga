import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {Solicitud, SolicitudRelations} from '../models';
import {BitacoraSolicitudRepository} from './bitacora-solicitud.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.idSolicitud,
  SolicitudRelations
> {
  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource,
    @repository.getter('BitacoraSolicitudRepository')
    protected bitacoraSolicitudRepositoryGetter: Getter<BitacoraSolicitudRepository>,
  ) {
    super(Solicitud, dataSource);
  }
}
