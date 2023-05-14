const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/Routes.js');
require ('dotenv').config()


mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB', error));
 



const app = express();
app.use(express.json());
app.use('/',router)



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
