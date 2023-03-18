const express = require('express');
const app = express();
const morgan = require('morgan');
const Queue = require("bull");

const emailQueue = new Queue("email", {
  redis: {
    host: "redis",
    port: 6379,
  },
});

emailQueue.process(async (job) => {
  console.log("Sending email to: ", job.data);
});



app.use(morgan(':method :url :status - :response-time ms - :res[content-length]')) // Apilogger
app.get('/', (req, res) => {
  res.send('Hello World!!!!');
});
app.get('/se', (req, res) => {
  emailQueue.add({ email: "hello@test.com" });
  res.send('Hello World!!!!');
});

app.listen(5000, () => {
  console.log(`Example app listening on port ${5000}!`);
});
