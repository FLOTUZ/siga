import {Entity, model, property} from '@loopback/repository';

@model()
export class Log extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idLog?: number;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;


  constructor(data?: Partial<Log>) {
    super(data);
  }
}

export interface LogRelations {
  // describe navigational properties here
}

export type LogWithRelations = Log & LogRelations;
