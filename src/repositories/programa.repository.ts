import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {Programa, ProgramaRelations, BitacoraPrograma} from '../models';
import {BitacoraProgramaRepository} from './bitacora-programa.repository';

export class ProgramaRepository extends DefaultCrudRepository<
  Programa,
  typeof Programa.prototype.idPrograma,
  ProgramaRelations
> {

  public readonly bitacoraProgramas: HasManyRepositoryFactory<BitacoraPrograma, typeof Programa.prototype.idPrograma>;

  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource, @repository.getter('BitacoraProgramaRepository') protected bitacoraProgramaRepositoryGetter: Getter<BitacoraProgramaRepository>,
  ) {
    super(Programa, dataSource);
    this.bitacoraProgramas = this.createHasManyRepositoryFactoryFor('bitacoraProgramas', bitacoraProgramaRepositoryGetter,);
    this.registerInclusionResolver('bitacoraProgramas', this.bitacoraProgramas.inclusionResolver);
  }
}
