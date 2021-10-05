import express from "express"
import mongoose from "mongoose"
import listEndpoints from "express-list-endpoints"
import cors from "cors"


const server = express()

const port = process.env.PORT || 3001


server.use(cors())
server.use(express.json())




mongoose.connect(process.env.MONGO_CONNECTION)

mongoose.connection.on("connected", () => {
  console.log("🔗 Mongo connected")
  server.listen(port, () => {
    // console.table(listEndpoints(server))
    console.log(`👂👂 Server listening on port ${port}`)
  })
})

mongoose.connection.on("error", err => {
  console.log(err)
})