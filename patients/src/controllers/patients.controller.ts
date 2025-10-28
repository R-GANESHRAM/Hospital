import {
  repository,
  Filter,
  FilterExcludingWhere,
} from '@loopback/repository';
import {
  post,
  get,
  param,
  patch,
  del,
  requestBody,
  response,
  getModelSchemaRef,
  HttpErrors,
} from '@loopback/rest';
import {Patients} from '../models';
import {PatientsRepository} from '../repositories';

export class PatientsController {
  constructor(
    @repository(PatientsRepository)
    public patientsRepository: PatientsRepository,
  ) {}

  // CREATE a new patient
  @post('/patients')
  @response(200, {
    description: 'Patient created',
    content: {'application/json': {schema: getModelSchemaRef(Patients)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Patients, {
            exclude: ['patient_id'],
          }),
        },
      },
    })
    patients: Omit<Patients, 'patient_id'>,
  ): Promise<Patients> {
    return this.patientsRepository.create(patients);
  }

  // GET all patients
  @get('/patients')
  @response(200, {
    description: 'Array of Patients model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Patients, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Patients) filter?: Filter<Patients>,
  ): Promise<Patients[]> {
    return this.patientsRepository.find(filter);
  }

  // GET patient by ID
  @get('/patients/{id}')
  @response(200, {
    description: 'Patients model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Patients, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Patients, {exclude: 'where'}) filter?: FilterExcludingWhere<Patients>
  ): Promise<Patients> {
    return this.patientsRepository.findById(id, filter);
  }

  // UPDATE patient by ID (patch)
  @patch('/patients/{id}')
  @response(204, {
    description: 'Patients PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Patients, {partial: true}),
        },
      },
    })
    patients: Partial<Patients>,
  ): Promise<void> {
    await this.patientsRepository.updateById(id, patients);
  }

  // DELETE patient by ID
  @del('/patients/{id}')
  @response(204, {
    description: 'Patients DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.patientsRepository.deleteById(id);
  }
}
