const brevo = require("@getbrevo/brevo");

const sendDateAcceptedEmail = async (
  askerEmail,
  askerName,
  receiverName,
  chosenDate,
  foodVibe
) => {
  try {
    const apiInstance = new brevo.TransactionalEmailsApi();

    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    await apiInstance.sendTransacEmail({
      sender: {
        email: "bellacruz.ph@gmail.com",
        name: "BeMyDate",
      },
      to: [
        {
          email: askerEmail,
        },
      ],
      subject: "Your date request was accepted! 💕",
      htmlContent: `
        <h2>Good news, ${askerName}! 💌</h2>
        <p><strong>${receiverName}</strong> accepted your invitation!</p>

        <p>
          <strong>Date:</strong> ${chosenDate}<br>
          <strong>Food Vibe:</strong> ${foodVibe}
        </p>
      `,
    });

    console.log("EMAIL SENT");
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendDateAcceptedEmail;