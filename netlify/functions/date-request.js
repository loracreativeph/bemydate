const { nanoid } = require('nanoid');
const connectDB = require('./lib/connectDB');
const DateRequest = require('./lib/DateRequest');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ message: 'Method not allowed' }) };
  }

  try {
    await connectDB();
    const { askerName, askerEmail, receiverName, receiverEmail, theme } = JSON.parse(event.body);

    if (!askerName || !askerEmail || !receiverName || !receiverEmail || !theme) {
      return { statusCode: 400, headers, body: JSON.stringify({ message: 'All fields are required.' }) };
    }

    const linkId = nanoid(10);
    await DateRequest.create({ linkId, askerName, askerEmail, receiverName, receiverEmail, theme });

    const link = `${process.env.FRONTEND_URL}/card/${linkId}`;
    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ linkId, link, message: 'Date request created!' }),
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, headers, body: JSON.stringify({ message: 'Server error.' }) };
  }
};
