'use strict'

const jimp = require("jimp");
const { readFile } = require("fs").promises;

const NODE_ENV = process.env.NODE_ENV;

module.exports = async (event, context) => {

  let VALID_SECRET;
  if (NODE_ENV === "production") {
    VALID_SECRET = await readFile("/var/openfaas/secrets/greyscalesecret");
  }
  else { // ik veronderstel "test" als enige alternatief voor "production"
    VALID_SECRET = "keepitsecret";
  }

  const auth_header = event.headers.authorization;
  console.log("DIT IS DE AUTH HEADER:");
  console.debug(auth_header);
  if (auth_header && auth_header.startsWith("Bearer ")) {
    const token = auth_header.substring(7);
    if (token.trim() === VALID_SECRET) {
      const base64Value = event.body;
      const inputValueBuffer = Buffer.from(base64Value, 'base64');
      const jimpValue = await jimp.read(inputValueBuffer);
      const greyscaled = jimpValue.greyscale();
      const writable = await greyscaled.getBufferAsync(jimp.MIME_PNG);
      const reconverted = writable.toString('base64');
      return context
        .status(200)
        .succeed(reconverted);
    }
  }
}
