const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendDateAcceptedEmail = async (
  askerEmail,
  askerName,
  receiverName,
  chosenDate,
  foodVibe
) => {
  try {
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);
    console.log("Sending email to:", askerEmail);

    await transporter.verify();
    console.log("SMTP VERIFIED");

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: askerEmail,
      subject: "Your date request was accepted! 💕",
      html: `
        <h2>Good news, ${askerName}! 💌</h2>
        <p><strong>${receiverName}</strong> accepted your date invitation!</p>

        <p>
          <strong>Date:</strong> ${chosenDate}<br/>
          <strong>Food Vibe:</strong> ${foodVibe}
        </p>

        <p>Have fun! 🌹</p>
      `,
    });

    console.log("EMAIL SENT:", info.messageId);

  } catch (error) {
    console.error("EMAIL ERROR:", error);
    throw error;
  }
};

module.exports = sendDateAcceptedEmail;