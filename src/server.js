import express from "express";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import postsRouter from "./services/posts/routes.js";
import { badRequest, notFound, serverError } from "./errorHandlers.js";


const server = express()

const port = process.env.PORT || 3001


server.use(cors())
server.use(express.json())
server.use("/blogPosts", postsRouter)


server.use(badRequest)
server.use(notFound)
server.use(serverError)

mongoose.connect(process.env.MONGO_CONNECTION)

mongoose.connection.on("connected", () => {
  console.log("🔗 Mongo connected")
  server.listen(port, () => {
    // console.table(listEndpoints(server))
    console.log(`👂👂 Server listening on port ${port}`)
  })
})

mongoose.connection.on("error", err => {
  console.log("⛔ Server stopped", err)
})