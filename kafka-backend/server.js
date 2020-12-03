var connection = new require('./kafka/connection');
const connectDB = require('./config/db');

const auth = require('./services/auth/auth');

var Reviews = require('./services/reviews');
var AdminAnalytics = require('./services/admin/analytics');
var AdminCompany = require('./services/admin/company');
// var AdminLogin = require('./services/admin/login');
// var AdminSignup = require('./services/admin/signup');
var AdminPhotos = require('./services/admin/photos');
var AdminReviews = require('./services/admin/reviews');

// Student files import
const studentProfile = require('./services/student/profile');

// Company files import 

const jobApplicant = require('./services/company/applicant');

const { mongoURI } = require('./config/configuration');
const mongoose = require('mongoose');
// const fs = require('fs');

// var options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   reconnectTries: Number.MAX_VALUE,
//   reconnectInterval: 500, // Reconnect every 500ms
//   poolSize: 500,
//   bufferMaxEntries: 0,
// };

// mongoose.connect(mongoURI, options, (err, res) => {
//   if (err) {
//     console.log(`MongoDB Connection Failed`);
//   } else {
//     console.log(`MongoDB Connected`);
//   }
// });

// connect databse
connectDB();

function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('Kafka Server is running ');
    consumer.on('message', function(message) {
        console.log('Message received for ' + topic_name);
        var data = JSON.parse(message.value);

        fname.handle_request(data.data, function(err, res) {
            var payloads = [{
                topic: data.replyTo,
                messages: JSON.stringify({
                    correlationId: data.correlationId,
                    data: res,
                }),
                partition: 0,
            }, ];
            producer.send(payloads, function(err, data) {
                console.log('DATA', data);
            });
            return;
        });
    });
}

// Authorization
handleTopicRequest('authorization', auth);

//Admin topics Start
handleTopicRequest('adminAnalytics', AdminAnalytics);
handleTopicRequest('adminCompany', AdminCompany);
handleTopicRequest('adminPhotos', AdminPhotos);
handleTopicRequest('adminReviews', AdminReviews);
//Admin topics end

//Company topics Start
handleTopicRequest('jobapplicant', jobApplicant);
//Company topics End
//Student topics Start
handleTopicRequest('studentProfile', studentProfile);
//Student topics end


/*
Kafka Commands: Please dont delete

bin/zookeeper-server-start.sh config/zookeeper.properties

bin/kafka-server-start.sh config/server.properties

// to see topics
bin/kafka-topics.sh --list --zookeeper localhost:2181

// To add topics
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic authorization
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic adminAnalytics
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic adminCompany
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic adminPhotos
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic adminReviews
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic studentProfile
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic response_topic
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic jobapplicant

// To delete topics
bin/kafka-topics.sh --zookeeper localhost:2181 --delete --topic reviews

*/