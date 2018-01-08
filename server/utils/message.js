const moment = require('moment');

const generateMessage = (from, text) => {
  // const createdAt = new Date().getTime();
  const createdAt = moment().valueOf();
  return { from, text, createdAt };
};

const generateLocationMessage = (from, lat, lng) => {
  const createdAt = moment().valueOf();
  const url = `https://www.google.com/maps?q=${lat},${lng}`
  return { from, url, createdAt };
};

module.exports = { generateMessage, generateLocationMessage };

