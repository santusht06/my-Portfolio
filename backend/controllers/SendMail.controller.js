const { sendMailToThem, RecieveMailToME } = require("../lib/Nodemailer");

module.exports.SendMailToBoth = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || name.length === 0) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    if (!email || email.length === 0) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const sendmail = await Promise.all([
      RecieveMailToME({ name, email, phone, message }),
      sendMailToThem({ name, email }),
    ]);

    if (!sendmail) {
      return res.status(400).json({
        message: "Error in sending email",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.log("error in sending email");
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR",
    });
  }
};
