import React from 'react'

import Meta from "../Customs/Meta"

import SudokuView from '../views/Sudoku/Sudoku';

export default function Sudoku() {
    return (<div>
        <Meta title={"Sudoku Solver"} 
        keywords={"Ethan Hicks, sudoku solving, software, sudoku"}
        description={"Demo of backtracking and of sudoku solving"} />
        <SudokuView />
    </div>)
}