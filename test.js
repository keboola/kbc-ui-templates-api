run = require('./index.js');

// This object is boilerplate for the context passed to an Amazon Lambda
// function. Calling done() exits the process Lambda creates.
var context = {
    succeed: function(message) {
        process.exit(0);
    }
};

run.handler({component: 'default'}, context);
