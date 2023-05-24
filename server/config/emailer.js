import nodemailer from "nodemailer"
import { template } from "./template";
const createTransporter=()=>{

    let transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: "isauraplatarojas@gmail.com",
          pass: "aukjeukxejfneanb"
        }
      });

    return transport;

}
export const sendMail=async(user)=>{
 const transporter = createTransporter();
 const info=await transporter.sendMail({

    from:"isauraplatarojas@gmail.com",
    to:`yam778123@gmail.com`,
    subject:"hello fron nodejs",
    html:template
 });
 console.log("messague ",info.messageId)
 return 

}


