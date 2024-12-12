
import nodemailer from "nodemailer";

export const sendEmail = async (option) => {
  try {
    let transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "97438f34f37a09",
        pass: "24d3336b46bf16",
      },
    });

    const mailOptions = {
      from: "mrhzs1997@gmail.com",
      to: option.userEmail,
      subject: option.subject,
      html: option.html
    };

    transport.sendMail(mailOptions);
  } catch (error) {
    console.log("error send mail =>", error);
  }
};
