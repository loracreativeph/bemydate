const connectDB = require('./lib/connectDB');
const DateRequest = require('./lib/DateRequest');
const { sendAskerEmail, sendReceiverEmail } = require('./lib/mailer');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'PUT') {
    return { statusCode: 405, headers, body: JSON.stringify({ message: 'Method not allowed' }) };
  }

  // Extract linkId from path: /api/date-request-respond/LINKID
  const linkId = event.path.split('/').pop();

  try {
    await connectDB();
    const { chosenDate, foodVibe } = JSON.parse(event.body);

    if (!chosenDate || !foodVibe) {
      return { statusCode: 400, headers, body: JSON.stringify({ message: 'Date and food vibe are required.' }) };
    }

    const dateRequest = await DateRequest.findOneAndUpdate(
      { linkId },
      { chosenDate, foodVibe, status: 'accepted' },
      { new: true }
    );

    if (!dateRequest) {
      return { statusCode: 404, headers, body: JSON.stringify({ message: 'Request not found.' }) };
    }

    await sendAskerEmail({
      askerName: dateRequest.askerName,
      askerEmail: dateRequest.askerEmail,
      receiverName: dateRequest.receiverName,
      chosenDate,
      foodVibe,
    });

    await sendReceiverEmail({
      askerName: dateRequest.askerName,
      receiverName: dateRequest.receiverName,
      receiverEmail: dateRequest.receiverEmail,
      chosenDate,
      foodVibe,
    });

    return { statusCode: 200, headers, body: JSON.stringify({ message: 'Response saved and emails sent!' }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, headers, body: JSON.stringify({ message: 'Server error.' }) };
  }
};
