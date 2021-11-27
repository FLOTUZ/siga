import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {Programa, ProgramaRelations} from '../models';
import {BitacoraProgramaRepository} from './bitacora-programa.repository';
import {SolicitudRepository} from './solicitud.repository';
import {UnidadRepository} from './unidad.repository';

export class ProgramaRepository extends DefaultCrudRepository<
  Programa,
  typeof Programa.prototype.idPrograma,
  ProgramaRelations
> {
  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource,
    @repository.getter('BitacoraProgramaRepository')
    protected bitacoraProgramaRepositoryGetter: Getter<BitacoraProgramaRepository>,
    @repository.getter('SolicitudRepository')
    protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
    @repository.getter('UnidadRepository')
    protected unidadRepositoryGetter: Getter<UnidadRepository>,
  ) {
    super(Programa, dataSource);
  }
}
