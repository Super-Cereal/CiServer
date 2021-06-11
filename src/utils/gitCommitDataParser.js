const branchDataParser = (str) => {
  const branchName = str.split('\n')[0].split(' ')[1];
  return {branchName};
};

const mainDataParser = (str) => {
  const [, , authorName, , , commitMessage] = str.split('\n');
  return {authorName, commitMessage};
};

module.exports = {
  branchDataParser,
  mainDataParser,
};
