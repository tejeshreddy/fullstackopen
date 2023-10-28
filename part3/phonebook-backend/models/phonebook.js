const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongo_url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

mongoose
  .connect(mongo_url)
  .then((result) => {
    console.log('Connection successful');
  })
  .catch((error) => {
    console.log('Connection failed');
  });

const contactSchema = new mongoose.Schema({
  phone: String,
  name: String,
});

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('phonebook', contactSchema);
