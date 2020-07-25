enum UserRoles {
  compTeam = "Computing Team",
  hop = "Head of Presentation",
  archiveTeam = "Archive Team",
  member = "Member",
}

// Some views will be for certain groups and
// some will be available for all
const userRoles = {
  compTeam: [String(UserRoles.compTeam)],
  hop: [String(UserRoles.hop), String(UserRoles.compTeam)],
  all: [
    String(UserRoles.compTeam),
    String(UserRoles.hop),
    String(UserRoles.archiveTeam),
    String(UserRoles.member),
  ],
};

export default userRoles;
