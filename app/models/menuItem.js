var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var menuItemModel = new Schema({
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    vegetarian: { type: Boolean, default: false }
});

module.exports = mongoose.model('MenuItem', menuItemModel);