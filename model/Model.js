const mongoose = require('mongoose');




const companySchema = new mongoose.Schema({
  name: String,
  location: String,
  revenue: Number,
});


module.exports.Company = mongoose.model('Company', companySchema);