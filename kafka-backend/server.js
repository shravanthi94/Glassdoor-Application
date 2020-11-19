var connection = new require('./kafka/connection');

// var Passport = require('./services/passport');


const { mongoURI } = require('./config/configuration');
const mongoose = require('mongoose');
// const fs = require('fs');

var getReview = require('./services/company/reviews');


var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 500,
    bufferMaxEntries: 0
  };

mongoose.connect(mongoURI, options, (err, res) => {
    if (err) {
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});


function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('\n\n message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}

handleTopicRequest("company_reviews", getReview);