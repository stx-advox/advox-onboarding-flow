const handleGiveTempRole = async (temp1, temp2) => {
  console.log(temp1);
  /**
   * @type {MessageReaction}
   */
  let reaction = await temp1.fetch();
  /**
   * @type {User}
   */
  let user = temp2;

  const reviewer = await stacks.members.fetch(user.id);

  const isWelcomer = reviewer.roles.cache.has(WELCOME_TEAM_ROLE_ID);
  const isAdvocate = reviewer.roles.cache.has(ADVOCATE_ROLE);

  const message = await reaction.message.fetch();
  const interviewee = await stacks.members.fetch(message.author.id);
  const isInterviewDone = reaction._emoji.name === "✅";

  if (isWelcomer && isAdvocate && isInterviewDone) {
    const role = await stacks.roles.fetch(TEMP_ADVOCATE_ROLE);
    await interviewee.roles.add(role);
  }
};

module.exports = { handleGiveTempRole };
