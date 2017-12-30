const generateMessage = (from, text) => {
  const createdAt = new Date().getTime();
  return { from, text, createdAt };
};

const generateLocationMessage = (from, lat, lng) => {
  const createdAt = new Date().getTime();
  const url = `https://www.google.com/maps?q=${lat},${lng}`
  return { from, url, createdAt };
};

module.exports = { generateMessage, generateLocationMessage };

