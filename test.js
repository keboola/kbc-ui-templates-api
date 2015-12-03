run = require('./get.js');

// This object is boilerplate for the context passed to an Amazon Lambda
// function. Calling done() exits the process Lambda creates.
var context = {
    done: function(error, message) {
        console.log('done!');
        console.log(error, message);
        process.exit(1);
    }
};

run.handler({component: 'default'}, context);
