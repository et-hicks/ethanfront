import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'; 

import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import { Tooltip } from '@material-ui/core';
import { Button } from "@material-ui/core";

import { customAlphabet } from 'nanoid';

const alphabet: string = 'abcdefghijklmnopqrstuvwxyz'

const addDash = (str: string): string => {
    return str.substring(0, 3) + '-' + str.substring(3, 6) + '-' + str.substring(6, str.length)
}


export default function TalkingView(props) {
    
    const [input, setInput] = useState("");

    const router = useRouter();

    useEffect(() => {
        console.log("the input here is: ", input);
    }, [input])

    

    const nanoid = customAlphabet(alphabet, 9);


    const handleStreamJoin = (e) => {
        router.push(`/t/${input}`);
    };

    const handleJoinInput = (e) => {
        setInput(e.target.value);
    }
    
    const handleStreamCreation = (e) => {
        const streamID: string = addDash(nanoid());
        router.push(`/t/${streamID}`);
    };

    const streamInput = (
    // @ts-ignore
        <GridItem sm={8} md={12} lg={12}>
            <CustomInput
                labelText="Join a Stream (***-***-***)"
                id="float"
                formControlProps={{
                fullWidth: true,
                onChange: handleJoinInput,
                }}
            />
        </GridItem>);
    
    const streamJoin = (
    // @ts-ignore
        <GridItem  sm={8} md={12} lg={12}>
            <Tooltip placement="bottom" title={"Join a custom talk"} enterDelay={1500}>
            <span>
                <Button onClick={handleStreamJoin} disabled={input.length < 11}>
                        Join
                </Button>
            </span>
        </Tooltip>
        </GridItem>)

    const streamCreate = (
    // @ts-ignore
        <GridItem sm={12} md={12} lg={12}>
            <Tooltip placement="bottom" title={"create your own talk"} enterDelay={1500}>
            <span>
                <Button onClick={handleStreamCreation}>
                        Create your own stream
                </Button>
            </span>
        </Tooltip>
        </GridItem>)
    
    return (<div>
        Talking View
        <br />
        Join or create your own stream
        <GridContainer>
            {streamInput}
            {streamJoin}
        </GridContainer>
        <br />
        <br />
        <GridContainer>
            {streamCreate}
        </GridContainer>
    </div>)
}