export interface IUser {
  userID: number;
  nickname: string;
  avatar: string;
  firstName: string;
  lastName: string;
  permissions: IPermission[];
}

export interface IPermission {
  permissionID: number;
  name: string;
}

enum UserRoles {
  admin = "creatorAdmin",
  superUser = "SuperUser", // Here since ystv uses this as a universal role
  moderator = "creatorModerator",
  member = "member",
}

// Some views will be for certain groups and
// some will be available for all
const userRoles = {
  admin: [String(UserRoles.admin), String(UserRoles.superUser)],
  moderator: [
    String(UserRoles.moderator),
    String(UserRoles.admin),
    String(UserRoles.superUser),
  ],
  all: [
    String(UserRoles.admin),
    String(UserRoles.superUser),
    String(UserRoles.moderator),
    String(UserRoles.member),
  ],
};

export default userRoles;
