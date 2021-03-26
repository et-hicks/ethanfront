import React from 'react';

import SudokuStyles from "../../styles/Sudoku/Sudoku.module.scss"

const gameTable = (game: string) => {
    const gameArr = game.split("");

    const rowOfRows = []

    for (let i = 0; i < 9; i++) {
        rowOfRows.push(gameArr.splice(0, 9))
    }

    let iter = 0
    const iterateRow = (row: string[], i: number) => {
            
            // console.log(iter);
            const sudokuRow = (<tr key={iter}>
                        <td 
                            className={(iter === 2 || iter === 5) ? `${SudokuStyles.rowModThree}` : `${SudokuStyles.rowNotThree}`}
                            id={`point ${iter}-${0}`}
                            
                            >
                                {processPoint(row[0])}
                        </td>
                        <td 
                            className={(iter === 2 || iter === 5) ? `${SudokuStyles.rowModThree}` : `${SudokuStyles.rowNotThree}`}
                            id={`point ${iter}-${1}`}
                            
                            >
                                {processPoint(row[1])}
                        </td>
                        <td 
                            className={(iter === 2 || iter === 5) ? `${SudokuStyles.rowModThree} ${SudokuStyles.everyThreeCell}` : `${SudokuStyles.rowNotThree} ${SudokuStyles.everyThreeCell}`}
                            id={`point ${iter}-${2}`}
                            
                            >
                                {processPoint(row[2])}
                        </td>
                        <td 
                            className={(iter === 2 || iter === 5) ? `${SudokuStyles.rowModThree}` : `${SudokuStyles.rowNotThree}`}
                            id={`point ${iter}-${3}`}
                            
                            >
                                {processPoint(row[3])}
                        </td>
                        <td 
                            className={(iter === 2 || iter === 5) ? `${SudokuStyles.rowModThree}` : `${SudokuStyles.rowNotThree}`}
                            id={`point ${iter}-${4}`}
                            
                            >
                                {processPoint(row[4])}
                        </td>
                        <td 
                            className={(iter === 2 || iter === 5) ? `${SudokuStyles.rowModThree} ${SudokuStyles.everyThreeCell}` : `${SudokuStyles.rowNotThree} ${SudokuStyles.everyThreeCell}`}
                            id={`point ${iter}-${5}`}
                            
                            >
                                {processPoint(row[5])}
                        </td>
                        <td 
                            className={(iter === 2 || iter === 5) ? `${SudokuStyles.rowModThree}` : `${SudokuStyles.rowNotThree}`}
                            id={`point ${iter}-${6}`}
                            
                            >
                                {processPoint(row[6])}
                        </td>
                        <td 
                            className={(iter === 2 || iter === 5) ? `${SudokuStyles.rowModThree}` : `${SudokuStyles.rowNotThree}`}
                            id={`point ${iter}-${7}`}
                            
                            >
                                {processPoint(row[7])}
                        </td>
                        <td 
                            className={(iter === 2 || iter === 5) ? `${SudokuStyles.rowModThree}` : `${SudokuStyles.rowNotThree}`}
                            id={`point ${iter}-${8}`}
                            >
                                {processPoint(row[8])}
                        </td>
                    </tr>)
                    iter ++;
            return sudokuRow
    }

    // creates a table of tables. Not what I want
    // return rowOfRows.map((item, i) => {
    //     // console.log(item);
    //     return (<table key={i}
    //     >
    //         <tbody>
    //             {iterateRow(item, i)}
    //         </tbody>
    //     </table>)
    // })
    return (<table key={"MainTable"} id={"SudokuTable"}>
        <tbody>
            {rowOfRows.map((item, i) => {
                return iterateRow(item, i)
            })}
        </tbody>
    </table>)
}

const processPoint = (pt: string) => {
    return pt === "0" ? " " : pt
}

const generateChoices = () => {
    const choices = [];
    for (let i = 1; i < 10; i++) {
        choices.push(i.toString());
    }
    return choices;
}

const processPointID = (id: string) => {
    const strArr = id.slice(5).split("-")
    return [parseInt(strArr[0]), parseInt(strArr[1])]
}

const replaceCharacter = (str: string, index: number, replace: string): string => {
    return str.substr(0, index) + replace + str.substr(index+1, str.length);
}

// converts ANY row, col pair into the local 3x3 grid in sudoku
const locToLocalGrid = (row: number, col: number, puzzle: string) => {
    const localGrid: string[][] = [];
    const localX = getGridNaught(row);
    const localY = getGridNaught(col);

    for (let i = 0; i < 3; i++) {
        const localLoc = (9 * (localX + i)) + localY;
        const localRow = getRowLoc(localLoc, puzzle, 3);

        localGrid.push(localRow);
    }
    return localGrid;
}

const getRow = (row: number, puzzle: string, upTo: number = 9): string[] => {
    return puzzle.substr(row * 9, upTo).split("")
}

const getRowLoc = (row: number, puzzle: string, upTo: number = 9): string[] => {
    return puzzle.substr(row, upTo).split("")
}

const getCol = (col: number, puzzle: string): string[] => {
    const colArr: string[] = []
    let i = 0;
    while (colArr.length < 9) {
        const location = 9 * i + col;
        const val = puzzle.charAt(location)

        colArr.push(val);
        i++;
    }
    return colArr
}

const getGridNaught = (val: number): number => {
    if (0 <= val && val <= 2) {
        return 0
    } else if (3 <= val && val <= 5) {
        return 3
    } else if (6 <= val && val <= 9) {
        return 6
    } else {
        console.log("%cPANIC! Something we wrong", "color: red; font-size:30px");
        return -1
    }
}

// func incase I want a flat 3x3 grid
const flatten = (arr: any[][]) => {
    const flat: any[] = []
    for (let row of arr) {
        for (let item of row) {
            flat.push(item)
        }
    }
    return flat;
}

const noRepeats = (arr: string[]) => {

    while (arr.indexOf("0") !== -1) {
        const ind = arr.indexOf("0");
        arr.splice(ind, 1)

    }
    const st = new Set(arr)



    // by removing all the zeroes and then creating a set, we know if there is a 
    // duplicate when the sizes are the same
    return st.size === arr.length;
}

// returns true if this is a valid solution
const acceptCandidate = (rowNum: number, colNum: number, puzzle: string, canditate: string) => {

    
    if (canditate.length > 1) return; // dont want long strings

    const location = (9 * rowNum) + colNum;
    const puzz = replaceCharacter(puzzle, location, canditate)
    

    const localGrid: string[][] = locToLocalGrid(rowNum, colNum, puzz);

    const col: string[] = getCol(colNum, puzz);
    const row: string[] = getRow(rowNum, puzz);
    const flatGrid: string[] = flatten(localGrid);

    return noRepeats(flatGrid) && noRepeats(row) && noRepeats(col)
}

const accept = (puzzle: string) => {
    // Whenever we have a zero, we should return the result immediatly as bad
    if (puzzle.includes("0")) return false
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            // console.log("%cPanics here", "color: red; font-size: 22px;");
            const localGrid: string[][] = locToLocalGrid(i, j, puzzle);

            const col: string[] = getCol(j, puzzle);
            const row: string[] = getRow(i, puzzle);
            const flatGrid: string[] = flatten(localGrid);

            if (!(noRepeats(flatGrid) && noRepeats(row) && noRepeats(col))) {
                // console.log(noRepeats(flatGrid), noRepeats(row) , noRepeats(col));
                return false
            }
        }
    }
    return true;
}

const start = (puzzle: string): string[] => {
    // returns the array of all possibilities of a blank spot in a location
    
    const strArr = puzzle.split("")
    const firstInd = strArr.indexOf("0");

    const colNum = firstInd % 9;
    const rowNum = (firstInd - colNum) / 9 // should always be a whole number


    const localGrid: string[][] = locToLocalGrid(rowNum, colNum, puzzle);

    const col: string[] = getCol(colNum, puzzle);
    const row: string[] = getRow(rowNum, puzzle);
    const flatGrid: string[] = flatten(localGrid);

    const choices = generateChoices();

    let difference = choices
                    .filter(x => !row.includes(x))


    let diff2 = difference
                    .filter(x => !col.includes(x))


    let diff3 = diff2
                    .filter(x => !flatGrid.includes(x))


    return diff3;
}


const solvePuzzle = (rowNum: number, colNum: number, puzzle: string, canditate: string): string => {

    if (puzzle !== "NOOT" && accept(puzzle)) return puzzle;
    let puzz = puzzle;
    if (!acceptCandidate(rowNum, colNum, puzzle, canditate)) {

        return "NOOT";
    } else {

        puzz = replaceCharacter(puzz, puzz.indexOf("0"), canditate)
        if (puzz.indexOf("0") === -1 && puzz !== "NOOT" && accept(puzz)) {

            return puzz;
        }
    }

    let cand = start(puzz);

    const firstInd = puzz.indexOf("0");

    const col = firstInd % 9;
    const row = (firstInd - col) / 9 // should always be a whole number

    for (let choice of cand) {
        const p = solvePuzzle(row, col, puzz, choice);
        if (accept(p)) return p
    }

    return "NO RECURSION"
}

const startSolver = (puzzle: string) => {
    let firstStart = start(puzzle);
    const strArr = puzzle.split("");
    const firstInd = strArr.indexOf("0");

    const colNum = firstInd % 9;
    const rowNum = (firstInd - colNum) / 9 // should always be a whole number
    let puzz = puzzle

    for (let item of firstStart) {
        puzz = solvePuzzle(rowNum, colNum, puzz, item)
        console.log("ret from solvePuzzle: ", puzz);
        if (accept(puzz)) return puzz
        puzz = puzzle
    }
    return "NO SOLUTION";
}


export {
    gameTable,
    processPointID,
    replaceCharacter,
    locToLocalGrid,
    startSolver
}