const mongoose = require('mongoose');  
const ProductSchema = new mongoose.Schema({  
  image: {type: String, default: 'default.jpg'},
  name: {type: String},
  data: {type: String},
  price: {type: Number}
});
mongoose.model('EduProduct', ProductSchema);

module.exports = mongoose.model('EduProduct');