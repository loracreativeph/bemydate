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

  // Extract the id from the path: /api/date-request-get/LINKID
  const linkId = event.path.split('/').pop();

  try {
    await connectDB();
    const dateRequest = await DateRequest.findOne({ linkId });

    if (!dateRequest) {
      return { statusCode: 404, headers, body: JSON.stringify({ message: 'Request not found.' }) };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        askerName: dateRequest.askerName,
        receiverName: dateRequest.receiverName,
        theme: dateRequest.theme,
        status: dateRequest.status,
      }),
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, headers, body: JSON.stringify({ message: 'Server error.' }) };
  }
};
