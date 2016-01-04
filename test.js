run = require('./index.js');

// This object is boilerplate for the context passed to an Amazon Lambda
// function. Calling done() exits the process Lambda creates.
var context = {
    succeed: function(message) {
        console.log(message);
        process.exit(0);
    },
    fail: function(error) {
        console.log(error);
        process.exit(1);
    }
};

run.handler({component: 'default'}, context);
