'use strict';

require('dotenv').config();
const io = require('socket.io-client');
const PORT = process.env.PORT;
const client = io.connect(PORT);

client.emit('connection');
client.on('success', (socket) => {
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
        store: '1-206-flowers',
        storeId: process.env.STORE_ID,
        orderID: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
        customer: 'Jane Doe',
        address: 'Schmittfort, LA'
      }
    }
    client.emit('pickup', { payload: parcelInfo });
  }, 500);

  client.on('delivered', ({ payload }) => {
    console.log(`Successful delivery for ${payload.payload.orderID}`);
  });
});
