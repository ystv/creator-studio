export interface User {
  userID: number;
  username: string;
  nickname: string;
  avatar: string;
  roles: string[];
}

enum UserRoles {
  admin = "creatorAdmin",
  moderator = "creatorModerator",
  member = "member",
}

// Some views will be for certain groups and
// some will be available for all
const userRoles = {
  admin: [UserRoles.admin],
  moderator: [UserRoles.moderator, UserRoles.admin],
  all: [
    String(UserRoles.admin),
    String(UserRoles.moderator),
    String(UserRoles.member),
  ],
};

export default userRoles;
