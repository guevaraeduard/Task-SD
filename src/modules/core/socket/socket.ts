import { io } from "socket.io-client";

const url = import.meta.env.VITE_SOCKET_URL;

export const socket = io(url);

socket.on("connect", () => {
    console.log(`Connected to socket on ${url}`);
});

socket.on("disconnect", () => {
    console.log("Socket disconnected");
});
