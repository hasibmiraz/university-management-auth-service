import { User } from '../app/modules/User/user.model';

export const findLastUserId = async (
  userRole: string,
  cutStrFromPrevId: number
): Promise<string | undefined> => {
  const lastUser = await User.findOne({ role: userRole }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastUser?.id?.substring(cutStrFromPrevId);
};
