import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {Programa, ProgramaRelations} from '../models';

export class ProgramaRepository extends DefaultCrudRepository<
  Programa,
  typeof Programa.prototype.idPrograma,
  ProgramaRelations
> {
  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource,
  ) {
    super(Programa, dataSource);
  }
}
