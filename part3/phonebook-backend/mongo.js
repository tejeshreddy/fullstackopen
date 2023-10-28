const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.error('Not enough arguments. Please provide at least two arguments.');
  process.exit(1);
}

const password = process.argv[2];

const mongo_url = `mongodb+srv://tejeshreddy111:tejeshreddy111@cluster0.y8ge51l.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`;

const insertNoteToDB = (name, phoneNumber) => {
  mongoose.set('strictQuery', false);

  mongoose.connect(mongo_url, { serverSelectionTimeoutMS: 30000 });

  const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
  });

  const Contact = mongoose.model('phonebook', contactSchema);

  const contact = new Contact({ name: name, number: phoneNumber });

  contact.save().then((result) => {
    console.log(result);
    mongoose.connection.close();
    console.log('Added', name, 'number', phoneNumber, 'to the phonebook');
  });
};

const getNotesFromDB = () => {
  mongoose.set('strictQuery', false);
  mongoose.connect(mongo_url, { serverSelectionTimeoutMS: 30000 });

  // const PhoneBook = mongoose.model(
  //   'phonebook_model',
  //   new mongoose.Schema({}),
  //   'phonebooks'
  // );
  const contactSchema = new mongoose.Schema({
    phone: String,
    name: String,
  });
  const PhoneBook = mongoose.model('phonebook', contactSchema);

  PhoneBook.find().then((result) => {
    result.forEach((contact) => {
      console.log(contact);
    });
    mongoose.connection.close();
  });
};

if (process.argv.length == 3) {
  getNotesFromDB();
} else if (process.argv.length == 5) {
  const name = process.argv[3];
  const phoneNumber = process.argv[4];
  insertNoteToDB(name, phoneNumber);
} else {
  console.log('Please enter the correct number of parameters');
  process.exit(1);
}

// const password = process.argv[2];

// mongoose.set('strictQuery', false);
// mongoose.connect(mongo_url, { serverSelectionTimeoutMS: 30000 });

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// });

// const Note = mongoose.model('Note', noteSchema);

// Note.find({ important: true }).then((result) => {
//   result.forEach((note) => {
//     console.log(note);
//   });
//   mongoose.connection.close();
// });

// // const note = new Note({
// //   content: 'HTML is Crazy',
// //   important: false,
// // });

// // note.save().then((result) => {
// //   console.log('note saved!');
// //   mongoose.connection.close();
// // });
