import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {Comunidad, ComunidadRelations, Beneficiario} from '../models';
import {BeneficiarioRepository} from './beneficiario.repository';

export class ComunidadRepository extends DefaultCrudRepository<
  Comunidad,
  typeof Comunidad.prototype.idComunidad,
  ComunidadRelations
> {

  public readonly beneficiarios: HasManyRepositoryFactory<Beneficiario, typeof Comunidad.prototype.idComunidad>;

  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource, @repository.getter('BeneficiarioRepository') protected beneficiarioRepositoryGetter: Getter<BeneficiarioRepository>,
  ) {
    super(Comunidad, dataSource);
    this.beneficiarios = this.createHasManyRepositoryFactoryFor('beneficiarios', beneficiarioRepositoryGetter,);
    this.registerInclusionResolver('beneficiarios', this.beneficiarios.inclusionResolver);
  }
}
