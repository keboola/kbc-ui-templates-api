var request = require('request');
var promises = require('promises');

exports.handler = function(event, context) {
    var component = (event.component === undefined ? 'default' : event.component);
    var requestPromise = promises.wrap(request);
    requestPromise(
        {
            method: 'GET',
            uri: 'https://kbc-uis.s3.amazonaws.com/kbc.templates/assets.json',
            gzip: true
        }
    ).then(function(data)
        {
            var response = JSON.parse(data.body);
            var url = response.default;
            if (response[component]) {
                url = response[component]
            }
            return requestPromise(
                {
                    method: 'GET',
                    uri: url,
                    gzip: true
                }
            );
        }
    ).then(function(data)
        {
            var response = JSON.parse(data.body);
            context.succeed(response);
        }
    );
};


