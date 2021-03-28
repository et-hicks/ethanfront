import React, {useEffect, useState} from 'react'
import dynamic from 'next/dynamic'
import * as SocketIO from 'socket.io-client';

// import Talking from "@components/Talking/Talking";
import { createSocketConn } from "@components/Talking/socketry";
// import { initPeer } from "@components/Talking/peer";

import { useRouter } from 'next/router';

const Talking = dynamic(() => import("../../components/Talking/Talking"), { ssr: false });


export default function Talk() {

    const router = useRouter();

    const { id } = router.query; // router.query can return a string array. We just want the first value

    const [peer, setPeer] = useState<any>();
    const [sokky, setSokky] = useState<SocketIO.Socket>()
    console.log(id);

    
    

    useEffect(() => {
        import("@components/Talking/peer").then(({default: initPeer}) => {
            const myPeer = initPeer(id as string)
            const mySocket = createSocketConn(id as string);
            setPeer(myPeer);
            setSokky(mySocket);
        });
      }, [])


    return (<div>
        Welcome to {id}
        <Talking socket={sokky} roomID={id as string} peer={peer}/>
    </div>)
}