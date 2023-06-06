import config from '../../../config';
import ApiError from '../../../errors/ApiErrors';
import { IUser } from './users.interface';
import { User } from './users.model';
import { generateUserId } from './users.utils';

const createUserToDB = async (user: IUser): Promise<IUser | null> => {
  // need auto generated incremental Id
  const id = await generateUserId();
  user.id = id;
  // default password
  if (!user.password) {
    user.password = config.default_user_password as string;
  }

  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new ApiError(400, `Failed to create new user.`);
  }

  return createdUser;
};

export default {
  createUserToDB,
};
