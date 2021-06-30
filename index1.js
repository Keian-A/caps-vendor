'use strict';

require('dotenv').config();
const io = require('socket.io-client');
const BASE_URL = process.env.BASE_URL;
const EXTENSION = process.env.EXTENSION1;
const client = io.connect(`${BASE_URL}/${EXTENSION}`);

client.on('success', () => {
  console.log('Connected!');

  // Interval to send new payload every .5 seconds
  setInterval(() => {

    // Generation of dateTime variable used in payload
    let today = new Date();
    let date = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate()}`;
    let time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    let dateTime = `${date} ${time}`;

    // Generation of payload
    let parcelInfo = {
      event: 'pickup',
      time: dateTime,
      payload: {
        store: 'Store2',
        storeId: 'Store2Id',
        orderID: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
        customer: 'John Doe',
        address: 'Schmittfort, LA'
      }
    }
    client.emit('pickup', { payload: parcelInfo });
  }, 5000);

  client.on('delivered', ({ payload }) => {
    console.log(`Successful delivery for ${payload.payload.orderID}`);
  });
});
