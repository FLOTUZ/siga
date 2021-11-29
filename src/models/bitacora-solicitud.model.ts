import {Entity, model, property} from '@loopback/repository';

@model()
export class BitacoraSolicitud extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    unique: true,
  })
  idBitacoraSolicitud?: number;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
  })
  solicitudId?: number;

  constructor(data?: Partial<BitacoraSolicitud>) {
    super(data);
  }
}

export interface BitacoraSolicitudRelations {
  // describe navigational properties here
}

export type BitacoraSolicitudWithRelations = BitacoraSolicitud &
  BitacoraSolicitudRelations;
