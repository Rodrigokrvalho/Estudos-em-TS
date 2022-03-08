import { inject, injectable } from "tsyringe";
import {hash} from 'bcrypt'

import { ICreateUserDTO } from "../../dtos/ICreateUsersDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ){}
  
  async execute({name, email, driver_license, password}: ICreateUserDTO): Promise<void> {

    const emailAlreadyExists = await this.usersRepository.findByEmail(email)

    if(emailAlreadyExists) {
      throw new Error('User already exists')
    }

    const passwordHash = await hash(String(password), 8)

    await this.usersRepository.create({
      name, email, driver_license, password: passwordHash
    })
  }
}

export {CreateUserUseCase}