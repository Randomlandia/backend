require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT
const db = require('./src/db/mongo')
const sandia = require('./src/routes/sandia')

app.use(express.json())
app.use(cors())

app.use("/wm", sandia)

app.get("/", (req, res) => {
  res.status(200).send({ message: 'Randomizing your experience from here!' })
})

db.connect
  .then((message) => {
    console.log(message)
    app.listen(port, () => {
      console.log(`Server listening on ${port} port.`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
