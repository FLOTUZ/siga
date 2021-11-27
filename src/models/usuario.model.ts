import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Beneficiario} from './beneficiario.model';
import {Captura} from './captura.model';
import {Programa} from './programa.model';
import {Solicitud} from './solicitud.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idUsuario?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombreUsuario: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidoPaterno: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidoMaterno: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
  })
  puesto?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  haceSolicitudes: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  altaDeApoyos: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  autorizaApoyos: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  haceReportes?: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  administraSistema?: boolean;

  @hasMany(() => Programa)
  programas: Programa[];

  @hasMany(() => Solicitud, {through: {model: () => Captura}})
  captura: Solicitud[];

  @hasMany(() => Solicitud, {keyTo: 'usuarioAutorizadorId'})
  autorizadas: Solicitud[];

  @hasOne(() => Solicitud, {keyTo: 'usuarioEntregaId'})
  entrega: Solicitud;

  @hasMany(() => Beneficiario, {keyTo: 'usuarioCargaId'})
  beneficiarios: Beneficiario[];

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
