import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {BitacoraBeneficiario} from './bitacora-beneficiario.model';
import {Comunidad} from './comunidad.model';
import {Solicitud} from './solicitud.model';

@model()
export class Beneficiario extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idBeneficiario?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  rfc: string;

  @property({
    type: 'string',
  })
  telefonoLocal?: string;

  @property({
    type: 'string',
  })
  telefonoCelular?: string;

  @property({
    type: 'string',
  })
  correo?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaRegistro: string;

  @property({
    type: 'date',
  })
  fechaBaja?: string;

  @property({
    type: 'number',
  })
  usuarioCargaId?: number;

  @hasMany(() => BitacoraBeneficiario)
  bitacoraBeneficiario: BitacoraBeneficiario[];

  @hasMany(() => Solicitud)
  solicitudes: Solicitud[];

  @hasOne(() => Comunidad)
  comunidad: Comunidad;

  constructor(data?: Partial<Beneficiario>) {
    super(data);
  }
}

export interface BeneficiarioRelations {
  // describe navigational properties here
}

export type BeneficiarioWithRelations = Beneficiario & BeneficiarioRelations;
