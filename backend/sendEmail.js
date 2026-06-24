const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
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

    console.log("Email sent successfully:", info.messageId);

  } catch (error) {
    console.error("EMAIL ERROR:", error);
  }
};

module.exports = sendDateAcceptedEmail;