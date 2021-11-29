import {Entity, model, property} from '@loopback/repository';

@model()
export class BitacoraUsuario extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    unique: true,
  })
  idBitacoraUsuario?: number;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
  })
  usuarioId?: number;

  constructor(data?: Partial<BitacoraUsuario>) {
    super(data);
  }
}

export interface BitacoraUsuarioRelations {
  // describe navigational properties here
}

export type BitacoraUsuarioWithRelations = BitacoraUsuario &
  BitacoraUsuarioRelations;
