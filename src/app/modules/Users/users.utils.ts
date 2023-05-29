import { User } from './users.model';

const findLastUserId = async (): Promise<string | undefined> => {
  const lasUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lasUser?.id;
};

export const generateUserId = async (): Promise<string> => {
  const currentUserId =
    (await findLastUserId()) || (0).toString().padStart(5, '0');
  return currentUserId;
};
