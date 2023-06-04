import { IUser } from './users.interface'
import { User } from './users.model'
import config from '../../../config/index'
import { generatedUserId } from '../../users.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  try {
    const id = await generatedUserId()
    console.log('before', user)
    user.id = id
    console.log('after', user)

    if (!user.password) {
      user.password = config.default_user_pass as string
    }

    const createdUser = await User.create(user)

    if (!createdUser) {
      throw new Error('Failed to create user')
    }

    return createdUser
  } catch (error) {
    console.error('Failed to create user:', error)
    throw error
  }
}

export default {
  createUser,
}
