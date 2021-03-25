import React, {useState, useEffect} from 'react';


import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import { Tooltip } from '@material-ui/core';
import { Button } from "@material-ui/core";

import SudokuStyles from "../../styles/Sudoku/Sudoku.module.scss"

import { gameTable, processPointID, replaceCharacter } from './utils';

type GenerateProps = {
    puzzle: string,
    solution: string
}

export default function GenerateGame(props: GenerateProps) {
    const { puzzle, solution } = props;
    const [puz, setPuzz] = useState("");
    const [originalPuzzle, setOriginalPuzzle] = useState("")
    const [game, setGame] = useState(null);
    const [modifyVal, setModifyVal] = useState<number[]>([0, 0]);
    const [numChange, setNumChange] = useState("");

    useEffect(() => {
        setPuzz(puzzle);
        setOriginalPuzzle(puzzle);
    }, [puzzle])

    useEffect(() => {
        if (puz !== "loading..." && puz !== "") {
            const gameTemp = gameTable(puz);
            setGame(gameTemp);
            console.log(gameTemp);
        }
    }, [puz])

    const handleTableClick = (e) => {
        const prevID = `point ${modifyVal[0]}-${modifyVal[1]}`
        const prev = document.getElementById(prevID);
        if (prev === null) {
            const prev1 = document.getElementById("SudokuTable");
            prev1.style.background = "white";
            
        }
        prev !== null && (prev.style.background = "white");
        
        const id = e.target.id;
        
        const elem = document.getElementById(id)
        elem !== null && (elem.style.background = "lightgreen");

        if (!id) {
            return;
        }
        const point = processPointID(id);
        setModifyVal(point);
    };

    const onlyAllowNumber = (e) => {
        if (!/^\d+$/.test(e.target.value)) {
            e.target.value = e.target.value.slice(0, -1)
        } else if (e.target.value.length > 1) {
            e.target.value = e.target.value.slice(0, -1)
        } else if (e.target.value === "0") {
            e.target.value = e.target.value.slice(0, -1)
        } else {
            setNumChange(e.target.value);
        }
    }

    const handleButtonClick = (e) => {
        e.preventDefault();

        const location = modifyVal[0] * 9 + modifyVal[1]
        console.log(location, puz.charAt(location), originalPuzzle.charAt(location));
        if (originalPuzzle.charAt(location) !== "0") {
            // Dont want people to modify the original game state
            return;
        }
        setPuzz(replaceCharacter(puz, location, numChange))
        // e.target.value = ""
    }

    const handleResetPuzzle = () => {
        setPuzz(originalPuzzle);
    }

    const tableInput = (
    // @ts-ignore
        <GridItem xs={12} sm={4} md={4} lg={3}>
            <CustomInput
                labelText="Data to Change"
                id="float"
                formControlProps={{
                fullWidth: true,
                onChange: onlyAllowNumber,
                }}
            />
        </GridItem>);


    const setDataInput = (
    // @ts-ignore
       <GridItem xs={12} sm={4} md={4} lg={3}>
           <Tooltip placement="bottom" title={"Input your guess into the table"} enterDelay={1500}>
            <span>
                <Button onClick={handleButtonClick}>
                        Set Value at {`${modifyVal[0]+1}-${modifyVal[1]+1}`}
                </Button>
            </span>
        </Tooltip>
        </GridItem>)

    const resetPuzzle = (
    // @ts-ignore
       <GridItem xs={12} sm={4} md={4} lg={3}>
           <Tooltip placement="bottom" title={"Input your guess into the table"} enterDelay={1500}>
            <span>
                <Button onClick={handleResetPuzzle}>
                        Reset Puzzle back to original form
                </Button>
            </span>
        </Tooltip>
        </GridItem>)

    return (
        <div>
            {puzzle}
            <br />
            {solution}
            <GridContainer>
                {tableInput}
                {setDataInput}
                {resetPuzzle}
            </GridContainer>
            <div onClick={handleTableClick} >
                {game !== null && game}
            </div>
        </div>
    );
}