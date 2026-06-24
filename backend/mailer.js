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
  await transporter.sendMail({
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
};

module.exports = sendDateAcceptedEmail;