import { IUser } from './users.interface';
import { User } from './users.model';

export const createUser = async (user: IUser): Promise<IUser | null> => {
  // need auto generated incremental Id and default password
  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new Error(`Failed to create new user.`);
  }

  return createdUser;
};
