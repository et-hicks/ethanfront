import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

import { backendAddress } from '../../Customs/constants';

import SudokuStyles from "../../styles/Sudoku/Sudoku.module.scss"


import GenerateGame from "../../components/Sudoku/GenerateGame";

export default function SudokuView(props: any) {
    const [puzzle, setPuzzle] = useState("loading...");
    // const [sol, setSol] = useState("loading...")
    const [dummy, setDummy] = useState(4)

    useEffect(() => {
        fetch(`${backendAddress}/sudoku-puzzle`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": 'application/json'
            }
        }).then(response => {
            return response.json()
        }).then(data => {
            setPuzzle(data.quiz);
            // setSol(data.solution);
            // console.log(data);
        })
    }, [dummy])
    
    return (<div className={classNames(SudokuStyles.main, SudokuStyles.mainRaised)}>
        <div className={SudokuStyles.container}>
            <br />
            <br />
            <h1 className={SudokuStyles.title}>Time for some Sudoku</h1>
            <h3 className={SudokuStyles.subtitle}>
                Classic Japanese paper game, Sudoku presents an interesting challenge from any angle
                you might look at it
            </h3>
            <GenerateGame puzzle={puzzle} generatePuzzle={setDummy} puzzleState={dummy}/>
            <p className={SudokuStyles.paragraphs}>
                Sudoku challenges come from every angle that you look at the game. Whether that is to
                play the game in the traditional sense, mathematically prove the minimum clues needed to 
                solve it, or to program a computer to solve it. Every angle is an interesting one, and
                every angle can teach something!
            </p>
            <p className={SudokuStyles.paragraphs}>
                I went about solving this via 
                <a href="https://en.wikipedia.org/wiki/Backtracking" className={SudokuStyles.links}> backtracking, of which Wikipedia</a> 
                has all the psuedocode one might need. Now, all thats needed is to formulate the problem into
                formal rules. A sudoku is solved when each row, column, and 3x3 grouping
                contains a unique number 1-9. This gives rise to the "accept" requirement of a backtracking system. To find the 
                next guess is simple: take the difference of the array 1-9 from the current row, column, and local grid.
                From here, simply iterate through the guess, recursing into the puzzle whenever we have an 'accepted'
                guess. Once all the zeroes are gone, to confirm the puzzle we check for uniqueness amonng the rows
                columns, and local grids.
            </p>
            <br />

        </div>
    </div>)
}