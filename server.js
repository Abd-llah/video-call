const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.set("view engine", "ejs")
app.use(express.static("public"))


app.get('/', (req, res) => {
    res.send("hello ")
})



app.get("/:room", (req, res) => {
    res.render("room", { roomId: req.params.room })
})


io.on("connection", socket => {
    socket.on("join-room", (roomId, userId) => {
        socket.join(roomId)
        socket.broadcast.to(roomId).emit("user-connected", userId);      


        socket.on('disconnect', () => {
            console.log("close")
            socket.broadcast.to(roomId).emit("user-disconnected", userId);      
        })
    })
})

  

server.listen( process.env.PORT || 3000)