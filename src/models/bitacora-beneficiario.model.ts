import {Entity, model, property} from '@loopback/repository';

@model()
export class BitacoraBeneficiario extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idBitacoraBeneficiario?: number;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;


  constructor(data?: Partial<BitacoraBeneficiario>) {
    super(data);
  }
}

export interface BitacoraBeneficiarioRelations {
  // describe navigational properties here
}

export type BitacoraBeneficiarioWithRelations = BitacoraBeneficiario & BitacoraBeneficiarioRelations;
