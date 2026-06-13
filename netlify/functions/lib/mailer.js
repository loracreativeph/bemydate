const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendAskerEmail = async ({ askerName, askerEmail, receiverName, chosenDate, foodVibe }) => {
  const html = `
    <div style="font-family: Georgia, serif; max-width: 520px; margin: auto; padding: 32px; background: #fff8f8; border-radius: 16px; border: 1px solid #f2c4ce;">
      <h1 style="color: #c0516b; font-size: 28px; margin-bottom: 8px;">🎉 They said YES!</h1>
      <p style="font-size: 16px; color: #555;">Hey <strong>${askerName}</strong>, great news — <strong>${receiverName}</strong> accepted your date request!</p>
      <hr style="border: none; border-top: 1px solid #f2c4ce; margin: 24px 0;" />
      <p style="font-size: 15px; color: #333;"><strong>📅 Chosen Date:</strong> ${chosenDate}</p>
      <p style="font-size: 15px; color: #333;"><strong>🍽️ Food Vibe:</strong> ${foodVibe}</p>
      <hr style="border: none; border-top: 1px solid #f2c4ce; margin: 24px 0;" />
      <p style="font-size: 14px; color: #888;">Now go plan something amazing! 💌</p>
    </div>
  `;
  await transporter.sendMail({
    from: `"Ask a Date 💌" <${process.env.EMAIL_USER}>`,
    to: askerEmail,
    subject: `🎉 ${receiverName} said YES to your date!`,
    html,
  });
};

const sendReceiverEmail = async ({ askerName, receiverName, receiverEmail, chosenDate, foodVibe }) => {
  const html = `
    <div style="font-family: Georgia, serif; max-width: 520px; margin: auto; padding: 32px; background: #fff8f8; border-radius: 16px; border: 1px solid #f2c4ce;">
      <h1 style="color: #c0516b; font-size: 28px; margin-bottom: 8px;">💌 It's a Date!</h1>
      <p style="font-size: 16px; color: #555;">Hey <strong>${receiverName}</strong>, just a reminder — you said YES to <strong>${askerName}</strong>!</p>
      <hr style="border: none; border-top: 1px solid #f2c4ce; margin: 24px 0;" />
      <p style="font-size: 15px; color: #333;"><strong>📅 Your Date:</strong> ${chosenDate}</p>
      <p style="font-size: 15px; color: #333;"><strong>🍽️ Food Vibe:</strong> ${foodVibe}</p>
      <hr style="border: none; border-top: 1px solid #f2c4ce; margin: 24px 0;" />
      <p style="font-size: 14px; color: #888;">Get excited — something special is coming your way! 🌹</p>
    </div>
  `;
  await transporter.sendMail({
    from: `"Ask a Date 💌" <${process.env.EMAIL_USER}>`,
    to: receiverEmail,
    subject: `💌 It's a date with ${askerName}!`,
    html,
  });
};

module.exports = { sendAskerEmail, sendReceiverEmail };
