import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {PersonaMoral, PersonaMoralRelations} from '../models';

export class PersonaMoralRepository extends DefaultCrudRepository<
  PersonaMoral,
  typeof PersonaMoral.prototype.idPersonaMoral,
  PersonaMoralRelations
> {
  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource,
  ) {
    super(PersonaMoral, dataSource);
  }
}
