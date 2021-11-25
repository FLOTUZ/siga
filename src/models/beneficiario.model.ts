import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Beneficiario>) {
    super(data);
  }
}

export interface BeneficiarioRelations {
  // describe navigational properties here
}

export type BeneficiarioWithRelations = Beneficiario & BeneficiarioRelations;
