const axios = require("axios");

const sendDateAcceptedEmail = async (
  askerEmail,
  askerName,
  receiverName,
  chosenDate,
  foodVibe
) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "BeMyDate",
          email: "bellacruz.ph@gmail.com",
        },
        to: [
          {
            email: askerEmail,
            name: askerName,
          },
        ],
        subject: "Your date request was accepted! 💕",
        htmlContent: `
          <h2>Good news, ${askerName}! 💌</h2>

          <p>
            <strong>${receiverName}</strong> accepted your invitation!
          </p>

          <p>
            <strong>Date:</strong> ${chosenDate}<br>
            <strong>Food Vibe:</strong> ${foodVibe}
          </p>

          <p>Have fun! 🌹</p>
        `,
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
      }
    );

    console.log("EMAIL SENT");
    console.log(response.data);
  } catch (error) {
    console.error("EMAIL ERROR:");
    console.error(
      error.response?.data || error.message || error
    );
  }
};

module.exports = sendDateAcceptedEmail;