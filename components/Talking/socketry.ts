import * as SocketIO from 'socket.io-client';
import { backendAddress } from "@Customs/constants"

const createSocketConn = (roomID: string) => {
    const mySocket = SocketIO.io(backendAddress);

    // mySocket.emit('join-room', roomID);

    return mySocket;
    
}


export {
    createSocketConn
}