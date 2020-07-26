export enum UserRoles {
  admin = "creatorAdmin",
  moderator = "creatorModerator",
  member = "member",
}

// Some views will be for certain groups and
// some will be available for all
const userRoles = {
  admin: [String(UserRoles.admin)],
  moderator: [String(UserRoles.moderator), String(UserRoles.admin)],
  all: [
    String(UserRoles.admin),
    String(UserRoles.moderator),
    String(UserRoles.member),
  ],
};

export default userRoles;
