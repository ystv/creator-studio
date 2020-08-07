export interface User {
  userID: number;
  nickname: string;
  avatar: string;
  firstName: string;
  lastName: string;
  permissions: Permission[];
}

export interface Permission {
  permissionID: number;
  name: string;
}

enum UserRoles {
  admin = "creatorAdmin",
  superUser = "SuperUser", //Here since ystv uses this as a universal role
  moderator = "creatorModerator",
  member = "member",
}

// Some views will be for certain groups and
// some will be available for all
const userRoles = {
  admin: [UserRoles.admin, UserRoles.superUser],
  moderator: [UserRoles.moderator, UserRoles.admin, UserRoles.superUser],
  all: [
    String(UserRoles.admin),
    String(UserRoles.superUser),
    String(UserRoles.moderator),
    String(UserRoles.member),
  ],
};

export default userRoles;
