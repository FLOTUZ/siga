import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {PersonaFisica, PersonaFisicaRelations} from '../models';

export class PersonaFisicaRepository extends DefaultCrudRepository<
  PersonaFisica,
  typeof PersonaFisica.prototype.idPersonaFisica,
  PersonaFisicaRelations
> {
  constructor(@inject('datasources.Azure') dataSource: AzureDataSource) {
    super(PersonaFisica, dataSource);
  }
}
