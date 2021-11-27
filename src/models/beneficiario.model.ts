import {Entity, hasMany, model, property} from '@loopback/repository';
import {Solicitud} from './solicitud.model';
import {BitacoraBeneficiario} from './bitacora-beneficiario.model';

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

  @hasMany(() => Solicitud)
  solicitudes: Solicitud[];

  @property({
    type: 'number',
  })
  comunidadId?: number;

  @hasMany(() => BitacoraBeneficiario)
  logBeneficiarios: BitacoraBeneficiario[];

  constructor(data?: Partial<Beneficiario>) {
    super(data);
  }
}

export interface BeneficiarioRelations {
  // describe navigational properties here
}

export type BeneficiarioWithRelations = Beneficiario & BeneficiarioRelations;
