import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {BitacoraSolicitud, BitacoraSolicitudRelations} from '../models';

export class BitacoraSolicitudRepository extends DefaultCrudRepository<
  BitacoraSolicitud,
  typeof BitacoraSolicitud.prototype.idBitacoraSolicitud,
  BitacoraSolicitudRelations
> {
  constructor(@inject('datasources.Azure') dataSource: AzureDataSource) {
    super(BitacoraSolicitud, dataSource);
  }
}
