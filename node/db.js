/**
 * Created by 111 on 16/4/5.
 */
var mongoose = require('mongoose');
Schema = mongoose.Schema;

var orderSchema = new Schema ({
  /*userName : String,
  department : String,*/
  order : String
});

var Orders = mongoose.model('orders', orderSchema);

exports.connect = function (callback) {
  mongoose.connect('mongodb://localhost:27017/menuDatabase', function (err) {
    if (err) throw (err);
    else callback();
  });
};

exports.disconnection = function () {
  mongoose.disconnect();
};

exports.addOrder = function (order, callback) {
  Orders.create(order, function (err) {
    if (err) throw err;
    else {
      callback();
    }
  })
};
