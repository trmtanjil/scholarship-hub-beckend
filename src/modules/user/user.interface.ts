export type TUpdateUser = {
  name?: string;
  image?: string;
};

export type TChangeUserRole = {
  role: 'Admin' | 'Moderator' | 'User';
};
