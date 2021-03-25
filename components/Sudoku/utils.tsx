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
            
            console.log(iter);
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

const processPointID = (id: string) => {
    const strArr = id.slice(5).split("-")
    return [parseInt(strArr[0]), parseInt(strArr[1])]
}

const replaceCharacter = (str: string, index: number, replace: string): string => {
    return str.substr(0, index) + replace + str.substr(index+1, str.length);
}

export {
    gameTable,
    processPointID,
    replaceCharacter
}