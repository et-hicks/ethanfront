import React, {useState, useEffect} from 'react';
// import classNames from 'classnames'

import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import { Tooltip } from '@material-ui/core';
import { Button } from "@material-ui/core";

import SudokuStyles from "../../styles/Sudoku/Sudoku.module.scss"

import { gameTable, processPointID, replaceCharacter, startSolver } from './utils';

type GenerateProps = {
    puzzle: string,
    generatePuzzle: Function,
    puzzleState: number,
}

export default function GenerateGame(props: GenerateProps) {
    const { puzzle, generatePuzzle, puzzleState } = props;

    const [puzz, setPuzz] = useState("");
    const [originalPuzzle, setOriginalPuzzle] = useState("")
    const [game, setGame] = useState(null);
    const [modifyVal, setModifyVal] = useState<number[]>([0, 0]);
    const [numChange, setNumChange] = useState("");

    useEffect(() => {
        setPuzz(puzzle);
        setOriginalPuzzle(puzzle);
    }, [puzzle])

    useEffect(() => {
        if (puzz !== "loading..." && puzz !== "") {
            const gameTemp = gameTable(puzz);
            setGame(gameTemp);
            // console.log(gameTemp);
        }
    }, [puzz])

    const handleTableClick = (e) => {
        const prevID = `point ${modifyVal[0]}-${modifyVal[1]}`
        const prev = document.getElementById(prevID);
        if (prev === null) {
            const prev1 = document.getElementById("SudokuTable");
            prev1.style.background = "white";
            
        }
        prev !== null && (prev.style.background = "white");
        
        const id = e.target.id;
        
        const elem = document.getElementById(id);
        elem !== null && (elem.style.background = "lightgreen");

        if (!id) {
            return;
        }
        const point = processPointID(id);
        setModifyVal(point);
        // console.log(locToLocalGrid(point[0], point[1], puzz));
        // console.log("solved as: ", startSolver(puzzle));
    };

    const onlyAllowNumber = (e) => {
        if (!/^\d+$/.test(e.target.value) && e.target.value !== " ") {
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
        console.log(location, puzz.charAt(location), originalPuzzle.charAt(location));
        if (originalPuzzle.charAt(location) !== "0") {
            // Dont want people to modify the original game state
            return;
        }
        setPuzz(replaceCharacter(puzz, location, numChange));
        // e.target.value = ""
    }

    const handleResetPuzzle = () => {
        setPuzz(originalPuzzle);
    }

    const handleClearSquare = (e) => {
        const location = modifyVal[0] * 9 + modifyVal[1]
        if (originalPuzzle.charAt(location) !== "0") {
            // Dont want people to modify the original game state
            return;
        }
        setPuzz(replaceCharacter(puzz, location, " "));
    }

    const handlePuzzleSolver = () => {
        const solved = startSolver(puzzle);
        setPuzz(solved);
    }

    const handleNewPuzzle = () => {
        generatePuzzle(puzzleState + 1)
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
           <Tooltip placement="bottom" title={"Clicking this will clear all your progress on the puzzle"} enterDelay={2500}>
            <span>
                <Button onClick={handleResetPuzzle}>
                        Reset Puzzle back to original form
                </Button>
            </span>
        </Tooltip>
        </GridItem>)

    const clearSquare = (
    // @ts-ignore
       <GridItem xs={12} sm={4} md={4} lg={3}>
           <Tooltip placement="bottom" title={"You can also input a blank space to clear a certain spot"} enterDelay={500}>
            <span>
                <Button onClick={handleClearSquare}>
                        Clear {`${modifyVal[0]+1}-${modifyVal[1]+1}`} back to blank
                </Button>
            </span>
        </Tooltip>
        </GridItem>)

    const solvePuzzle = (
    // @ts-ignore
       <GridItem xs={12} sm={4} md={4} lg={3}>
           <Tooltip placement="bottom" title={"Solve!!!"} enterDelay={500}>
            <span>
                <Button onClick={handlePuzzleSolver}>
                        Solve the puzzle with Backtracking
                </Button>
            </span>
        </Tooltip>
        </GridItem>)

    const newPuzzle = (
    // @ts-ignore
       <GridItem xs={12} sm={4} md={4} lg={3}>
           <Tooltip placement="bottom" title={"Another Sudoku?"} enterDelay={500}>
            <span>
                <Button onClick={handleNewPuzzle}>
                        Generate a new puzzle
                </Button>
            </span>
        </Tooltip>
        </GridItem>)
    

    return (
        <div>
                <br />
                <GridContainer>
                    {tableInput}
                    {setDataInput}
                    {solvePuzzle}
                    {clearSquare}
                    {resetPuzzle}
                    {newPuzzle}
                </GridContainer>
                <div onClick={handleTableClick} className={SudokuStyles.mainPuzzle}>
                    {game !== null && game}
                </div>
        </div>
    );
}