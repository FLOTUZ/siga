import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository, HasOneRepositoryFactory} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {
  BitacoraPrograma,
  Programa,
  ProgramaRelations,
  Solicitud, Unidad} from '../models';
import {BitacoraProgramaRepository} from './bitacora-programa.repository';
import {SolicitudRepository} from './solicitud.repository';
import {UnidadRepository} from './unidad.repository';

export class ProgramaRepository extends DefaultCrudRepository<
  Programa,
  typeof Programa.prototype.idPrograma,
  ProgramaRelations
> {
  public readonly bitacoraProgramas: HasManyRepositoryFactory<
    BitacoraPrograma,
    typeof Programa.prototype.idPrograma
  >;

  public readonly solicitudes: HasManyRepositoryFactory<
    Solicitud,
    typeof Programa.prototype.idPrograma
  >;

  public readonly unidad: HasOneRepositoryFactory<Unidad, typeof Programa.prototype.idPrograma>;

  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource,
    @repository.getter('BitacoraProgramaRepository')
    protected bitacoraProgramaRepositoryGetter: Getter<BitacoraProgramaRepository>,
    @repository.getter('SolicitudRepository')
    protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('UnidadRepository') protected unidadRepositoryGetter: Getter<UnidadRepository>,
  ) {
    super(Programa, dataSource);
    this.unidad = this.createHasOneRepositoryFactoryFor('unidad', unidadRepositoryGetter);
    this.registerInclusionResolver('unidad', this.unidad.inclusionResolver);

    this.solicitudes = this.createHasManyRepositoryFactoryFor(
      'solicitudes',
      solicitudRepositoryGetter,
    );
    this.registerInclusionResolver(
      'solicitudes',
      this.solicitudes.inclusionResolver,
    );
    this.bitacoraProgramas = this.createHasManyRepositoryFactoryFor(
      'bitacoraProgramas',
      bitacoraProgramaRepositoryGetter,
    );
    this.registerInclusionResolver(
      'bitacoraProgramas',
      this.bitacoraProgramas.inclusionResolver,
    );
  }
}
