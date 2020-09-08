const mongoose = require("mongoose");
/**
 * use the schema property of moogoose
 */
const Schema = mongoose.Schema;
/**
 * Define the Schmma and its Type with default value if we have
 */
let userSchema = new Schema({
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  email: { type: String, index: true },
  profileImagePath: { type: String, default: null },
  address: { type: String, default: null },
  dob: { type: Date },
  createdOn: { type: Date, default: new Date() },
  updatedOn: { type: Date, default: new Date() }
});

/**
 * Return the Schema with connection on requested Database  ## Model : `User`
 */
module.exports = mongoose.model("User", userSchema)