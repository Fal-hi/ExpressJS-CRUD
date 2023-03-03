import 'dotenv/config'
import express from 'express'
import router from './routes/router'

const port = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads'))
app.use(router)

app.listen(port, function () {
  console.log(`Your port is runing on port ${port}`)
})
