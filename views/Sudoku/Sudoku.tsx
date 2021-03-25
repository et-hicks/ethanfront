import React, { useEffect, useState } from 'react'

import { backendAddress } from '../../Customs/constants';

import GenerateGame from "../../components/Sudoku/GenerateGame";

export default function SudokuView(props: any) {
    const [puzzle, setPuzzle] = useState("loading...");
    const [sol, setSol] = useState("loading...")

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
            setSol(data.solution);
            console.log(data);
        })
    }, [])
    
    return (<div>
        Time for some Sudoku
        <GenerateGame puzzle={puzzle} solution={sol} />
    </div>)
}