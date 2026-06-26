import mongoose, { Schema } from "mongoose";

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

//  This User will be converted to lower case user
export const User = mongoose.model("User", userSchema);
