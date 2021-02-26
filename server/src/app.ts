const exress = require('express');
const app = exress();
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} now!`);
})