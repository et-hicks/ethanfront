import Peer from 'peerjs';


const initPeer = (roomID: string) => {
    const peer = new Peer({
        config: {
            'iceServers': [
                { urls: 'stun:stun.l.google.com:19302?transport=tcp' },
                { urls: 'stun:stun1.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302?transport=tcp' },
                { urls: 'stun:stun.voiparound.com?transport=tcp' },
                { urls: 'stun:stun.voiparound.com' },
                { urls: 'stun:stun2.l.google.com:19302' },
                { urls: 'stun:stun2.l.google.com:19302?transport=tcp' },
                { urls: 'stun:stun3.l.google.com:19302' },
                { urls: 'stun:stun4.l.google.com:19302?transport=tcp' },
                { urls: 'stun:stun.ekiga.net' },
                { urls: 'stun:stun.ideasip.com' },
                { urls: 'stun:stun.schlund.de' },
                { urls: 'stun:stun.xten.com' },
                { urls: 'stun:stun.ekiga.net?transport=tcp' },
                { urls: 'stun:stun.ideasip.com?transport=tcp' },
                { urls: 'stun:stun.schlund.de?transport=tcp' },
                { urls: 'stun:stun.xten.com?transport=tcp' },
                {
                    urls: 'turn:54.175.92.144:443?transport=tcp',
                    username: 'voiceuser',
                    credential: 'thereddkingreallydoesfollow88u',
                },
                {
                urls: 'turn:54.175.92.144:443',
                username: 'voiceuser',
                credential: 'thereddkingreallydoesfollow88u',
                },
            ]
        },
        debug: 3
    });

    peer.on('disconnected', () => {
        if (peer.destroyed) {
            console.log("MYFILE: ", roomID, " peer is destroyed. No reconnection possible");
            return;
        }
        console.log("MYFILE: ", roomID, " has disconnected. Attempting to reconnect");
        peer.reconnect();
    });

    // peer.on('open', (id: string) => {
    //     console.log("MYFILE. Awaiting connections to: ", id);
    // });

    peer.on('connection', (dc: Peer.DataConnection) => {
        console.log('MYFILE. Connection established to: ',  dc.peer);
    });

    peer.on('close', () => {
        console.log('MYFILE. Connection to', roomID, " is destroyed and now closed");
    });

    peer.on('error', (err) => {
        console.log(err.type, "MYFILE. The following error has occured: ", err);
    });
    

    return peer
}

export default initPeer;
