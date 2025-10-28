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
} from '@loopback/rest';
import {Doctors} from '../models';
import {DoctorsRepository} from '../repositories';

export class DoctorsController {
  constructor(
    @repository(DoctorsRepository)
    public doctorsRepository: DoctorsRepository,
  ) {}

  // CREATE - Add a new doctor
  @post('/doctors')
  @response(200, {
    description: 'Doctor created',
    content: {'application/json': {schema: getModelSchemaRef(Doctors)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Doctors, {
            exclude: ['doctor_id'],
          }),
        },
      },
    })
    doctor: Omit<Doctors, 'doctor_id'>,
  ): Promise<Doctors> {
    return this.doctorsRepository.create(doctor);
  }

  // GET ALL - List all doctors
  @get('/doctors')
  @response(200, {
    description: 'Array of Doctors model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Doctors, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Doctors) filter?: Filter<Doctors>,
  ): Promise<Doctors[]> {
    return this.doctorsRepository.find(filter);
  }

  // GET by ID - Find one doctor by ID
  @get('/doctors/{id}')
  @response(200, {
    description: 'Doctors model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Doctors, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Doctors, {exclude: 'where'}) filter?: FilterExcludingWhere<Doctors>
  ): Promise<Doctors> {
    return this.doctorsRepository.findById(id, filter);
  }

  // PATCH by ID - Update doctor details
  @patch('/doctors/{id}')
  @response(204, {
    description: 'Doctors PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Doctors, {partial: true}),
        },
      },
    })
    doctor: Partial<Doctors>,
  ): Promise<void> {
    await this.doctorsRepository.updateById(id, doctor);
  }

  // DELETE by ID - Remove doctor from system
  @del('/doctors/{id}')
  @response(204, {
    description: 'Doctors DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.doctorsRepository.deleteById(id);
  }
}
