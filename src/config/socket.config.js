import { Server } from "socket.io";
const messages = [];

const config = (serverHTTP) => {
    const serverSocket = new Server(serverHTTP);

    serverSocket.on("connection", (socket) => {
        console.log("Cliente conectado");

        socket.on("message", (data) => {
            const { user, message } = data;
            messages.push({ user, message });

            serverSocket.emit("message-logs", { messages });
        });

        socket.on("authenticated", (data) => {
            socket.broadcast.emit("new-user", data);
        });
    });
};

export default {
    config,
};