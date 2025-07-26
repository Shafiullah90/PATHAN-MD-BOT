const sudoUsers = [];

function addSudoUser(user) {
  if (!sudoUsers.includes(user)) {
    sudoUsers.push(user);
  }
}

function isSudoUser(user) {
  return sudoUsers.includes(user);
}

module.exports = { addSudoUser, isSudoUser };
