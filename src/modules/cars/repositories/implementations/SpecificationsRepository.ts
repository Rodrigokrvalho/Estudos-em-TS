import { getRepository, Repository } from 'typeorm';
import { Specification } from '../../entities/Specification';
import { ISpecificationsDTO, ISpecificationsRepository } from '../ISpecificationRepository';


class SpecificationsRepository implements ISpecificationsRepository{
  private respository: Repository<Specification>

  constructor() {
    this.respository = getRepository(Specification)
  }
  
  async create({description, name}: ISpecificationsDTO): Promise<void> {
    const specification = this.respository.create({
      description,
      name
    })
  
    await this.respository.save(specification)
  } 
  
  async findByName(name: string): Promise<Specification> {
    const specification = await this.respository.findOne({name})

    return specification
  }
}

export { SpecificationsRepository }