import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

let myUsername = process.env.helloname;
console.log(myUsername);

console.log("Start of backend project");
console.log("Checking if the server restart after saving this");
