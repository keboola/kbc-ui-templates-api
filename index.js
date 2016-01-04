var zlib = require('zlib');
var AWS = require('aws-sdk');
var bucket = 'kbc-uis';


exports.handler = function(event, context) {
    var component = (event.component === undefined ? 'default' : event.component);
    var s3 = new AWS.S3();
    var params = {
        Bucket: bucket,
        Key: 'kbc.templates/assets.json'
    };

    s3.getObject(
        params,
        function(err, data) {
            if (err) {
                context.fail(err);
            }
            zlib.gunzip(
                data.Body,
                function(err, data) {
                    if (err) {
                        context.fail(err);
                    }
                    var response = JSON.parse(data.toString());
                    var url = response.default;
                    if (response[component]) {
                        url = response[component]
                    }
                    s3.getObject(
                        {
                            Bucket: bucket,
                            Key: url.substr(url.indexOf(bucket) + bucket.length + 1)
                        },
                        function(err, data) {
                            if (err) {
                                context.fail(err);
                            }
                            zlib.gunzip(
                                data.Body,
                                function(err, data) {
                                    if (err) {
                                        context.fail(err);
                                    }
                                    var response = JSON.parse(data.toString());
                                    context.succeed(response);
                                }
                            );

                        }
                    );
                }
            );
        }
    );
};


