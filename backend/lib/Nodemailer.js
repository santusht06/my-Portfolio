const nodemailer = require("nodemailer");
const { clientHTML } = require("../utils/ClientHTML");
const { MyHTMLTemplate } = require("../utils/ClientHTML");
const { config } = require("dotenv");
config();

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.OWNER,
    pass: process.env.PASS,
  },
});

const RecieveMailToME = async ({
  name: clientname,
  email: clientemail,
  message: clientMessage,
  phone: clientphone,
}) => {
  try {
    const filled = MyHTMLTemplate.replace(/{{clientName}}/g, clientname)
      .replace(/{{clientEmail}}/g, clientemail)
      .replace(/{{clientPhone}}/g, clientphone)
      .replace(/{{clientMessage}}/g, clientMessage);

    await transport.sendMail({
      from: clientemail,
      to: process.env.OWNER,
      subject: `${clientname} contacted you via your portfolio`,
      html: filled,
    });
  } catch (error) {
    console.log("error in sending mail = ", error);
  }
};

const sendMailToThem = async ({ name: clientname, email: clientemail }) => {
  try {
    const html = clientHTML.replace(/{{clientName}}/g, clientname);

    await transport.sendMail({
      from: process.env.OWNER,
      to: clientemail,
      subject: `Thank You ${clientname}, for Reaching Out – I’ve Received Your Message`,
      html: html,
    });
  } catch (error) {
    console.log("error in sending mail = ", error);
  }
};

module.exports = {
  RecieveMailToME,
  sendMailToThem,
};
