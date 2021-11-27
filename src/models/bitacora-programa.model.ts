import {Entity, model, property} from '@loopback/repository';

@model()
export class BitacoraPrograma extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idBitacoraPrograma?: number;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
  })
  programaId?: number;

  constructor(data?: Partial<BitacoraPrograma>) {
    super(data);
  }
}

export interface BitacoraProgramaRelations {
  // describe navigational properties here
}

export type BitacoraProgramaWithRelations = BitacoraPrograma & BitacoraProgramaRelations;
