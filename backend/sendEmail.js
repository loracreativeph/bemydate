const brevo = require("@getbrevo/brevo");

console.log("BREVO FULL:", brevo);
console.log("Brevo:", brevo.Brevo);
console.log("BrevoClient:", brevo.BrevoClient);

module.exports = async () => {
  console.log("debug");
};