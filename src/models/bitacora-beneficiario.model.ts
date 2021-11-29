import {Entity, model, property} from '@loopback/repository';

@model()
export class BitacoraBeneficiario extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    unique: true,
  })
  idBitacoraBeneficiario?: number;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
  })
  beneficiarioId?: number;

  constructor(data?: Partial<BitacoraBeneficiario>) {
    super(data);
  }
}

export interface BitacoraBeneficiarioRelations {
  // describe navigational properties here
}

export type BitacoraBeneficiarioWithRelations = BitacoraBeneficiario &
  BitacoraBeneficiarioRelations;
