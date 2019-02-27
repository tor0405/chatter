import io from "socket.io-client";

export default io('ws://localhost:80', {
        path: '/socket/socket.io', transports: ['websocket'],
    },
);
