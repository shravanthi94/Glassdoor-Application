var connection = new require('./kafka/connection');

// var Passport = require('./services/passport');
var Reviews = require('./services/reviews');
var AdminAnalytics = require('./services/admin/analytics');
var AdminCompany = require('./services/admin/company');
var AdminLogin = require('./services/admin/login');
var AdminSignup = require('./services/admin/signup');
var AdminPhotos = require('./services/admin/photos');
var AdminReviews = require('./services/admin/reviews');

const { mongoURI } = require('./config/configuration');
const mongoose = require('mongoose');
// const fs = require('fs');

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

function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('Kafka Server is running ');
    consumer.on('message', function (message) {
        console.log('Message received for ' + topic_name);
        var data = JSON.parse(message.value);

        fname.handle_request(data.data, function (err, res) {
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log('DATA', data);
            });
            return;
        });

    });
}

// handleTopicRequest("authentication", Passport);
handleTopicRequest("reviews", Reviews);

//Admin topics Start
handleTopicRequest("adminAnalytics", AdminAnalytics);
handleTopicRequest("adminCompany", AdminCompany);
handleTopicRequest("adminPhotos", AdminPhotos);
handleTopicRequest("adminReviews", AdminReviews);
//Admin topics end
