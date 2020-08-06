require('./models/User');
require('./models/Feedback');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();
const PORT = process.env.PORT || 3000
app.use(bodyParser.json());
app.use(authRoutes);
app.use(feedbackRoutes);

const mongoUri = 'mongodb+srv://admin:fhdyt@cluster0.kgu0n.gcp.mongodb.net/testDB?retryWrites=true&w=majority';
if (!mongoUri) {
  throw new Error(
    `MongoURI was not supplied.  Make sure you watch the video on setting up Mongo DB!`
  );
}
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true  
});
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});
mongoose.connection.on('error', err => {
  console.error('Error connecting to mongo', err);
});

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
