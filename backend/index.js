/* eslint-disable no-console */
const app = require('./app');
//  Connect database
const connectDB = require('./config/db');

connectDB();

app.get('/', (req, res) => {
    res.send('hello');
});

//  Connection to a port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Application started listening to port ${PORT} successfully.`);
});