var connection = new require('./kafka/connection');
const connectDB = require('./config/db');
const auth = require('./services/auth/auth');

var Reviews = require('./services/reviews');
var AdminAnalytics = require('./services/admin/analytics');
var AdminCompany = require('./services/admin/company');
var AdminPhotos = require('./services/admin/photos');
var AdminReviews = require('./services/admin/reviews');
// Student files import
const studentProfile = require('./services/student/profile');
const studentJobApplications = require('./services/student/studentJobApplications');
const studentJobs = require('./services/student/studentJobs');
const studentResume = require('./services/student/resume');
// Company files import
const jobApplicant = require('./services/company/applicant');
const jobs = require('./services/company/jobPosting');
const interviews = require('./services/company/interview');
const salary = require('./services/company/salary');
const overview = require('./services/company/overview');
const companyprofile = require('./services/company/profile');
const companyreviews = require('./services/company/reviews');

// connect databse
connectDB();

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
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, function (err, data) {
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

//Company topics Start
handleTopicRequest('jobapplicant', jobApplicant);
handleTopicRequest('companyJobPosting', jobs);
handleTopicRequest('interviewStudent', interviews);
handleTopicRequest('salaryStudent', salary);
handleTopicRequest('overviewCompanyStudent', overview);
handleTopicRequest('companyProfile', companyprofile);
handleTopicRequest('companyReviews', companyreviews);

//Student topics Start
handleTopicRequest('studentProfile', studentProfile);
handleTopicRequest('studentJobApplications', studentJobApplications);
handleTopicRequest('studentJobs', studentJobs);
handleTopicRequest('studentResume', studentResume);

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
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic companyJobPosting
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic studentJobApplications
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic companyJobPosting

// To delete topics
bin/kafka-topics.sh --zookeeper localhost:2181 --delete --topic reviews

*/
