import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

//                      Object has to passed in it
const userSchema = new Schema(
  // First object is all the fields and 2nd object is having things like timeseries and timestamps etc.
  {
    // Each of the field requires type to be given
    // We don't store the images in the db rather than the server itself disk or aws so we will pass the url of the db (string)
    avatar: {
      type: {
        url: String, //url will be stored in db
        localPath: String, //where we are keeping this file in our local storage
      },
      default: {
        url: `https://placehold.co/200x200`,
        localPath: "",
      },
    },
    username: {
      type: String,
      //   This is enough for username but mongoose say writing MongoDB validation, casting and business logic boilerplate is a drag.
      //   Let's use them
      required: true,
      //   Hence mongodb will automatically will make it required don't need to write extra logic
      unique: true,
      //   This will force to be unique in the entire db ow we have to query the whole db and check
      lowercase: true,
      //   to store them in lowercase
      trim: true,
      //   So that pre and post spaces got
      index: true,
      // Automatically creates a db index on that specific field to drastically speed up read queries
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      // We can pass custom error in it
      required: [true, "Password is required..."],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    // We'll also use token systems JWT so we need to keep 1 token in db
    refereshToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    // Above token we can't keep for forever in db there need to be expiry some
    forgotPasswordExpiry: {
      type: Date,
    },
    // SO that user needs to done in specific time period not like in 10 days
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
    // Similar mechanism for email verification
  },
  // 2nd object
  {
    timestamps: true,
    // After creating timestamps 2 more field is avaialble to us
    // 1) createdapp and 2)updatedapp
  },
);

// We will use becrypt in pre stage to hash the password, we will pre (hook) to userSchema and i wanted to attach whenever the save operation is performed adn wht to do and perform function not arrow function here because we will need the context of it
//  Ans we will be suing async function
// passed next to tell my work is done go ahead and perform the next work
userSchema.pre("save", async function (next) {
  // BY this safeguard this below mechanism will only work if we are ,modifying the password field or the first time and when we are changing the password
  // This helps us from the case when we are not changing the password
  // If we are changing the password we want to hash it and if we are saving the password we want to hash it
  if (!this.isModified("password")) return next();
  // i just want to access 1 field and encrypt it
  // await is because it would take time
  // we will be using hash from many methods and
  // we have to tell 2 things how many what does the data we want to hash and how many round we want to apply
  this.password = await bcrypt.hash(this.password, 10);
  // We are overwriting the password
  next();
});

// See carefull it's methods not method which is a property
// isPasswordCorrect name by us and use function not arrow function
userSchema.methods.isPasswordCorrect = async function (password) {
  //  I just have to ask bcrypt to compare the hash of the argument to the database password which can be accessed via this.password
  // and it takes time
  // True or false
  return await bcrypt.compare(password, this.password);
};

//  This User will be converted to lower case user
export const User = mongoose.model("User", userSchema);
