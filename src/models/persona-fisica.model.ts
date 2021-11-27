import {Entity, model, property} from '@loopback/repository';

@model()
export class PersonaFisica extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idPersonaFisica?: number;

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
  estadoSocioEconomico: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaNacimiento: string;

  @property({
    type: 'date',
    required: true,
  })
  curp: string;

  @property({
    type: 'number',
  })
  beneficiarioId?: number;

  constructor(data?: Partial<PersonaFisica>) {
    super(data);
  }
}

export interface PersonaFisicaRelations {
  // describe navigational properties here
}

export type PersonaFisicaWithRelations = PersonaFisica & PersonaFisicaRelations;
