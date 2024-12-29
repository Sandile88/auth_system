import dotenv from "dotenv";
import { MailtrapClient } from "mailtrap";
import nodemailer from "nodemailer";


dotenv.config();


  console.log("token", process.env.MAILTRAP_TOKEN);
  console.log("endpoint", process.env.MAILTRAP_ENDPOINT);



// var transport = nodemailer.createTransport({
//     host: process.env.MAILTRAP_ENDPOINT,
//     port: 587,
//     auth: {
//       user: "api",  
//       pass: process.env.MAILTRAP_TOKEN
//     }  
//   });    

const client = new MailtrapClient({
    token: process.env.MAILTRAP_TOKEN,
    endpoint: process.env.MAILTRAP_ENDPOINT
});

// console.log("client", client)

const sender = {
    email: "testing@gmail.com",
    name: "Test"
};

const recipient = [{
    email: "sandilep.mremi@gmail.com"
}];

client.send({
    from: sender,
    to: recipient,
    subject: "Wow!",
    text: "Email sent successful!",
    category: "Integration Test"
}).then(console.log, console.error);
