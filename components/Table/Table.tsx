import React, { useState, useEffect } from 'react'

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import Face from "@material-ui/icons/Face";

import CustomTabs from "../../components/CustomTabs/CustomTabs.js"

import { createTable, changeTableClass } from "./TableUtils";

import TableStyles from '../../styles/PathFinder/Table.module.scss';

type TableProps = {
    rows: number;
    columns: number;
}

enum TableInside {
    start = 1,
    end = 2,
    wall = 3,
    clear = 4,
}


export default function Table({rows, columns}: TableProps) {
    // For the lack of confusion: width is 
    // let board = <table id='board' dangerouslySetInnerHTML={createTable(4, 4)} />;
    
    const [boardValue, setBoardValue] = useState<number>(0)
    const [startVal, setStartVal] = useState({row: 0, col: 0})
    const [endVal, setEndVal] = useState({row: rows-1, col: columns-1})

    // const [board, setBoard] = useState(null)
    
    // useEffect(() => {
        const generatedTable = createTable(4, 4, (row: number, col: number) => {
            console.log("table row: ", row, "col: ", col);
            if (boardValue === TableInside.start) {
                // revert the current start to unvisited
                // set the new start
                startVal.row !== undefined && changeTableClass(startVal.row, startVal.col, TableStyles.unvisited);
                changeTableClass(row, col, TableStyles.start);
                setStartVal({row: row, col: col})
            } else if (boardValue == TableInside.end) {
                // revert the current end to unvisited
                // set the new end
                endVal.row !== undefined && changeTableClass(endVal.row, endVal.col, TableStyles.unvisited);
                changeTableClass(row, col, TableStyles.end);
                setEndVal({row: row, col: col});
            } else if (boardValue === TableInside.clear) {
                // set anything to unvisited
                // undefining start or end if needed
                if (row === startVal.row && col === startVal.col) {
                    changeTableClass(startVal.row, startVal.col, TableStyles.unvisited);
                    setStartVal({row: undefined, col: undefined})
                
                } else if (row === endVal.row && col === endVal.col) {
                    changeTableClass(endVal.row, endVal.col, TableStyles.unvisited);
                    setEndVal({row: undefined, col: undefined});
                
                } else {
                    changeTableClass(row, col, TableStyles.unvisited);
                }
            } else {
                // set the the current thing to a wall
                // if the current point is the start or the end, set that to undefined/undefined
                // dont let someone simulate with an undefined start or end
                if (row === startVal.row && col === startVal.col) {
                    changeTableClass(startVal.row, startVal.col, TableStyles.unvisited);
                    setStartVal({row: undefined, col: undefined})
                    changeTableClass(row, col, TableStyles.wall);
                
                } else if (row === endVal.row && col === endVal.col) {
                    changeTableClass(endVal.row, endVal.col, TableStyles.unvisited);
                    setEndVal({row: undefined, col: undefined});
                    changeTableClass(row, col, TableStyles.wall);
                
                } else {
                    changeTableClass(row, col, TableStyles.wall);
                }
            }
        })
        // setBoard(board)
    // }, [])
    
    console.log(generatedTable);

    const controller = <div>
        <FormControlLabel
            control={
                <Radio 
                    checked={boardValue === TableInside.start}
                    value={TableInside.start}
                    onChange={() => setBoardValue(TableInside.start)}
                />
            }
            label={"Place Start"}
        />
        <FormControlLabel 
            control={
                <Radio 
                    checked={boardValue === TableInside.end}
                    value={TableInside.end}
                    onChange={() => setBoardValue(TableInside.end)}
                />
            }
            label={"Place End"}
        />
        <FormControlLabel 
            control={
                <Radio 
                    checked={boardValue === TableInside.wall}
                    value={TableInside.wall}
                    onChange={() => setBoardValue(TableInside.wall)}
                />
            }
            label={"Draw a wall"}
        />
         <FormControlLabel 
            control={
                <Radio 
                    checked={boardValue === TableInside.clear}
                    value={TableInside.wall}
                    onChange={() => setBoardValue(TableInside.clear)}
                />
            }
            label={"Clear a selection"}
        />
    </div>

    return (<div>
        HTML table
        {controller}
        <div className={TableStyles.outer}>{generatedTable}</div>
    </div>)
} // commit for master