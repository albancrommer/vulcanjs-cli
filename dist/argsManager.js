const minimist = require('minimist');

const recognizedActions = {
  generate: 'generate',
  g: 'generate',
  create: 'create',
  c: 'create',
  remove: 'remove',
  r: 'remove',
  list: 'list',
  l: 'list'
};

const genericProcessor = args => {
  const argsToProcess = args.slice(1);
  const action = {
    type: recognizedActions[args[0]],
    args: []
  };
  if (argsToProcess.length > 0) {
    action.component = argsToProcess[0];
  }
  argsToProcess.shift();
  if (argsToProcess.length > 0) {
    action.args = argsToProcess;
  }
  return action;
};

const createProcessor = args => ({
  type: 'create',
  args: args.slice(1)
});

const argsProcessors = {
  generate: genericProcessor,
  remove: genericProcessor,
  list: genericProcessor,
  create: createProcessor
};

const errors = {
  unrecognizedCommand: 'Command not recognized. Try: create, generate and remove'
};

function getAction() {
  const args = minimist(process.argv.slice(2))._;

  if (!recognizedActions[args[0]]) {
    throw new Error(errors.unrecognizedCommand);
  }
  const actionName = recognizedActions[args[0]];
  const actionObj = argsProcessors[actionName](args);
  return actionObj;
}

module.exports = {
  getAction: getAction
};
