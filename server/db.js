const mongoose = require('mongoose');

// assign mongoose promise library and connect to database 
mongoose.Promise = global.Promise;

// Configure Mongoose to Connect to MongoDB
mongoose.connect("mongodb://localhost/mern-crud", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(response => console.log(`MERN CRUD APP: mongodb://localhost/mern-crud`))
  .catch(err => console.log(`Mern Crud app: DATABASE ERROR: `));