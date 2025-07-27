async function addownerCommand(sock, chatId, message) {
  // Check if the command sender is authorized
  if (!await isAuthorized(sock.user.id)) {
    await sock.sendMessage(chatId, { text: 'Only authorized users can use this command!' });
    return;
  }

  // Get the user ID or mention from the command arguments
  const userId = message.message.conversation.split(' ')[1];
  const userToAdd = userId.startsWith('@') ? userId.slice(1) : userId;

  // Add the new owner to the database or storage
  await addOwnerToDatabase(userToAdd);

  await sock.sendMessage(chatId, { text: `Added @${userToAdd} as a new owner!` });
}

module.exports = { addownerCommand };
