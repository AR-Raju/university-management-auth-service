import { IUser } from './user.interface';
import { User } from './user.model';
import config from '../../../config/index';
import { generatedUserId } from './user.utils';
import ApiError from '../../../errors/ApiError';

const createUser = async (user: IUser): Promise<IUser | null> => {
  try {
    const id = await generatedUserId();
    user.id = id;

    if (!user.password) {
      user.password = config.default_user_pass as string;
    }

    const createdUser = await User.create(user);

    if (!createdUser) {
      throw new ApiError(400, 'Failed to create user');
    }

    return createdUser;
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
};

export const UserService = {
  createUser,
};
