import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {PersonaMoral, PersonaMoralRelations} from '../models';
import {BeneficiarioRepository} from './beneficiario.repository';

export class PersonaMoralRepository extends DefaultCrudRepository<
  PersonaMoral,
  typeof PersonaMoral.prototype.idPersonaMoral,
  PersonaMoralRelations
> {
  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource,
    @repository.getter('BeneficiarioRepository')
    protected beneficiarioRepositoryGetter: Getter<BeneficiarioRepository>,
  ) {
    super(PersonaMoral, dataSource);
  }
}
