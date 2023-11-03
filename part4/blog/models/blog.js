const mongoose = require("mongoose");
const config = require("../utils/config");
const logger = require("../utils/logger");
mongoose.set("strictQuery", false);

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

mongoose
  .connect(config.MONGODB_URI)
  .then((result) => logger.info("Connection successful"))
  .catch((error) => logger.error("Error with Mongo connection"));

module.exports = mongoose.model("Blog", blogSchema);
