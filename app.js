require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const connectDB = require('./server/config/db');
const { isActiveRoute } = require('./server/helpers/routeHelpers');

const app = express();
const PORT = process.env.PORT || 3000;
  
// Connect to DB
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
const store = MongoStore.create({
  mongoUrl: process.env.MONGODB_URI
})
const { MongoClient } = require('mongodb');

// MongoDB connection URL
const mongoUrl = 'mongodb://localhost:27017/mydatabase';

// Create a MongoDB client
const clientPromise = MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Example using the client promise
clientPromise
  .then((client) => {
    // Do something with the MongoDB client, such as performing database operations
    const db = client.db('mydatabase');
    const collection = db.collection('mycollection');

    // Example: Insert a document
    return collection.insertOne({ key: 'value' });
  })
  .then((result) => {
    console.log('Document inserted:', result);
  })
  .catch((error) => {
    console.error('Error:', error);
  })
  .finally(() => {
    // Close the MongoDB client when done
    clientPromise.then((client) => client.close());
  });

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),

}));

app.use(express.static('public'));

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


app.locals.isActiveRoute = isActiveRoute; 


app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));

app.listen(PORT, ()=> {
  console.log(`App listening on port ${PORT}`);
});

// app.use('/.netlify/app',router);
// module.exports.handler=serverless(app);