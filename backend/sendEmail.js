const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000,
});

const sendDateAcceptedEmail = async (
  askerEmail,
  askerName,
  receiverName,
  chosenDate,
  foodVibe
) => {
  try {
    console.log("STEP 1");

    await transporter.verify();

    console.log("STEP 2");

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

    console.log("STEP 3");
    console.log("EMAIL SENT:", info.messageId);

  } catch (error) {
    console.error("EMAIL ERROR:", error);
  }
};

module.exports = sendDateAcceptedEmail;