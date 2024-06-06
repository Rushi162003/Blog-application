const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors');

connectToMongo();
const app = express()
const port = 5000
app.use(cors());

// available Rouets
app.use(express.json());
app.use('/api/auth', require('./routes/auth'))
app.use('/api/blog', require('./routes/bolg'))

app.listen(port, () => {
  console.log(`Blog Website backend app listening at http://localhost:${port}`)
})