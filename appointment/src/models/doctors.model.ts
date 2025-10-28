import {Entity, model, property} from '@loopback/repository';

@model()
export class Doctors extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  doctor_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  doctor_name: string;

  @property({
    type: 'string',
    required: true,
  })
  specialization: string;

  @property({
    type: 'number',
    required: true,
  })
  contact_number: number;

  @property({
    type: 'number',
    required: true,
  })
  experience_years: number;

  @property({
    type: 'boolean',
    required: true,
  })
  is_active: boolean;

  @property({
    type: 'string',
    required: true,
  })
  available_days: string;

  @property({
    type: 'boolean',
    required: true,
  })
  is_available: boolean;

  @property({
    type: 'string',
    required: true,
  })
  reason_unavailable: string;

  @property({
    type: 'string',
    required: true,
  })
  start_time: string;

  @property({
    type: 'string',
    required: true,
  })
  end_time: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Doctors>) {
    super(data);
  }
}

export interface DoctorsRelations {
  // describe navigational properties here
}

export type DoctorsWithRelations = Doctors & DoctorsRelations;


