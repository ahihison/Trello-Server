const express =require('express');

const app = express();
const port = 8017;
const hostname = 'localhost';
app.get("/", (req, res) => {
  res.send('<h1>Hello World!</h1>');
});
app.listen(port, hostname, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});