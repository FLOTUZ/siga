import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  HasManyThroughRepositoryFactory,
  HasOneRepositoryFactory,
  repository,
} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {
  Beneficiario,
  Captura,
  Programa,
  Solicitud,
  Usuario,
  UsuarioRelations, BitacoraUsuario} from '../models';
import {BeneficiarioRepository} from './beneficiario.repository';
import {BitacoraUsuarioRepository} from './bitacora-usuario.repository';
import {CapturaRepository} from './captura.repository';
import {ProgramaRepository} from './programa.repository';
import {SolicitudRepository} from './solicitud.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.idUsuario,
  UsuarioRelations
> {
  public readonly programasCapturados: HasManyRepositoryFactory<
    Programa,
    typeof Usuario.prototype.idUsuario
  >;

  public readonly solicitudesCapturadas: HasManyThroughRepositoryFactory<
    Solicitud,
    typeof Solicitud.prototype.idSolicitud,
    Captura,
    typeof Usuario.prototype.idUsuario
  >;

  public readonly solicitudesAutorizadas: HasManyRepositoryFactory<
    Solicitud,
    typeof Usuario.prototype.idUsuario
  >;

  public readonly apoyosEntregados: HasOneRepositoryFactory<
    Solicitud,
    typeof Usuario.prototype.idUsuario
  >;

  public readonly beneficiariosDadosDeAlta: HasManyRepositoryFactory<
    Beneficiario,
    typeof Usuario.prototype.idUsuario
  >;

  public readonly bitacoraUsuario: HasManyRepositoryFactory<BitacoraUsuario, typeof Usuario.prototype.idUsuario>;

  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource,
    @repository.getter('ProgramaRepository')
    protected programaRepositoryGetter: Getter<ProgramaRepository>,
    @repository.getter('SolicitudRepository')
    protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
    @repository.getter('CapturaRepository')
    protected capturaRepositoryGetter: Getter<CapturaRepository>,
    @repository.getter('BeneficiarioRepository')
    protected beneficiarioRepositoryGetter: Getter<BeneficiarioRepository>,
    @repository.getter('BitacoraUsuarioRepository')
    protected bitacoraUsuarioRepositoryGetter: Getter<BitacoraUsuarioRepository>,
  ) {
    super(Usuario, dataSource);
    this.bitacoraUsuario = this.createHasManyRepositoryFactoryFor('bitacoraUsuario', bitacoraUsuarioRepositoryGetter,);
    this.registerInclusionResolver('bitacoraUsuario', this.bitacoraUsuario.inclusionResolver);

    this.beneficiariosDadosDeAlta = this.createHasManyRepositoryFactoryFor(
      'beneficiariosDadosDeAlta',
      beneficiarioRepositoryGetter,
    );
    this.apoyosEntregados = this.createHasOneRepositoryFactoryFor(
      'apoyosEntregados',
      solicitudRepositoryGetter,
    );
    this.registerInclusionResolver(
      'apoyosEntregados',
      this.apoyosEntregados.inclusionResolver,
    );

    this.solicitudesAutorizadas = this.createHasManyRepositoryFactoryFor(
      'solicitudesAutorizadas',
      solicitudRepositoryGetter,
    );

    this.solicitudesCapturadas = this.createHasManyThroughRepositoryFactoryFor(
      'solicitudesCapturadas',
      solicitudRepositoryGetter,
      capturaRepositoryGetter,
    );
    this.registerInclusionResolver(
      'solicitudesCapturadas',
      this.solicitudesCapturadas.inclusionResolver,
    );

    this.programasCapturados = this.createHasManyRepositoryFactoryFor(
      'programasCapturados',
      programaRepositoryGetter,
    );
  }
}
