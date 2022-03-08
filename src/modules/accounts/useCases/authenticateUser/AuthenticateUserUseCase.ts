import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { compare } from 'bcrypt'
import {sign} from 'jsonwebtoken'

interface IRequest {
  email: string 
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  },
  token: string

}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({email, password}: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if(!user) {
      throw new Error('Email or password incorrect')
    }

    const correctlyPassword = await compare(password.toString(), user.password)

    if(!correctlyPassword) {
      throw new Error('Email or password incorrect')
    }

    const token = sign({}, 'liherge4rt9834tijsdf9898u34r5ij234r908', {
      subject: user.id,
      expiresIn: '1d'
    })

    const response: IResponse = { 
      user: {
        name: user.name, 
        email: user.email
      }, 
      token
  }

    return response
  }
}

export {AuthenticateUserUseCase}