import React, { useState, useEffect } from 'react';
import * as SocketIO from "socket.io-client";
import Peer from 'peerjs';
import classNames from 'classnames';


import TalkingStyles from "@styles/Talking/Talking.module.scss";

type TalkingProps = {
    socket: SocketIO.Socket;
    roomID: string;
    peer: Peer;
}



const peers = {};

const addVideoStream = (video, stream: MediaStream) => {

    const videoGrid = document.getElementById("video-grid");
    video.srcObject = stream;

    console.log("%cInside add video stream", "color: red; font-size: 30px;");

    video.addEventListener('loadedmetadata', () => {
        video.play();
    });

    videoGrid.appendChild(video);
}

const connectToNewUser = (userId: string, stream: MediaStream, myPeer) => {
    const call = myPeer.call(userId, stream);
    const video = document.createElement('video');

    call.on('stream', (userVideoStream: MediaStream) => {
      addVideoStream(video, userVideoStream);
    });

    call.on('close', () => {
      video.remove();
    });
  
    peers[userId] = call;
}

export default function Talking(props: TalkingProps) {
    const { socket, roomID, peer } = props;

    const [useStream, setUserStream] = useState<MediaStream>();

    useEffect(() => {
        
        const myVideo = document.createElement('video');
        myVideo.muted = true;
        
        if (typeof navigator === 'undefined') {
            var navigator = {};
        }

        // @ts-ignore
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
            }).then((stream: MediaStream) => {
            addVideoStream(myVideo, stream)
            
            setUserStream(stream);

            peer.on('open', (id: string) => {
                socket.emit('join-room', roomID, id);
            })

            peer.on('call', call => {
                call.answer(stream)
                const video = document.createElement('video')

                call.on('stream', (userVideoStream: MediaStream) => {
                addVideoStream(video, userVideoStream)
                });

            });
            
            socket.on('user-disconnected', (theirPeerID: string) => {
                if (peers[theirPeerID]) peers[theirPeerID].close();
            });

            socket.on('user-connected', (theirPeerID: string) => {
              connectToNewUser(theirPeerID, stream, peer);
            });
            
        });

        return () => {
            socket.off();
            socket.disconnect();
            peer.destroy();
        }
    }, [])



    return (<div className={classNames(TalkingStyles.main, TalkingStyles.mainRaised)}>
        <div className={TalkingStyles.container}>
            <br />
            <br />
            <h1 className={TalkingStyles.title}>Google Meets Clone</h1>
            <h3 className={TalkingStyles.subtitle}>
                I always admired Google Meets for their long meetings without failure, 
                and their super easy to input URLs. I was so inspired that I decided to
                create one of my own
            </h3>
        </div>
    </div>);    
}
