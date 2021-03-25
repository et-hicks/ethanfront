import React, { useState, useEffect } from 'react'

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import Face from "@material-ui/icons/Face";

import CustomTabs from "../../components/CustomTabs/CustomTabs.js"
import {Button} from "@material-ui/core";

import { createTable, changeTableClass, hashToPoint, modifyGraph, AStar, disanceHeuristic, stateUndefined, objToHash } from "./TableUtils";

import TableStyles from '../../styles/PathFinder/Table.module.scss';
import { Tooltip } from '@material-ui/core';

enum TableInside {
    start = 1,
    end = 2,
    wall = 3,
    clear = 4,
}

type TableProps = {
    rows: number;
    columns: number;
    graph: Graph;
}

export default function Table({rows, columns, graph}: TableProps) {
    // For the lack of confusion: width is 
    // let board = <table id='board' dangerouslySetInnerHTML={createTable(4, 4)} />;
    
    const [boardValue, setBoardValue] = useState<number>(1)
    const [startVal, setStartVal] = useState({row: undefined, col: undefined})
    const [endVal, setEndVal] = useState({row: undefined, col: undefined})
    const [disableButton, setDisabledButton] = useState(true)
    // const [board, setBoard] = useState(null)

    useEffect(() => {
        if (!stateUndefined(startVal) && !stateUndefined(endVal)) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        };

    }, [startVal, endVal])



    // useEffect(() => {
        
    // maybe have a useContext here?
        const generatedTable = createTable(rows, columns, (row: number, col: number) => {
            // console.log("table row: ", row, "col: ", col, "boardvalue: ", boardValue);
            if (boardValue === TableInside.start) {
                // revert the current start to unvisited
                // set the new start
                startVal.row !== undefined && changeTableClass(startVal.row, startVal.col, TableStyles.unvisited);
                changeTableClass(row, col, TableStyles.start);
                setStartVal({row: row, col: col})
                modifyGraph(graph, row, col, "wall", false);
            } else if (boardValue == TableInside.end) {
                // revert the current end to unvisited
                // set the new end
                endVal.row !== undefined && changeTableClass(endVal.row, endVal.col, TableStyles.unvisited);
                changeTableClass(row, col, TableStyles.end);
                setEndVal({row: row, col: col});
                modifyGraph(graph, row, col, "wall", false);
            } else if (boardValue === TableInside.clear) {
                // set anything to unvisited
                // undefining start or end if needed
                if (row === startVal.row && col === startVal.col) {
                    changeTableClass(startVal.row, startVal.col, TableStyles.unvisited);
                    setStartVal({row: undefined, col: undefined})
                    modifyGraph(graph, row, col, "wall", false);
                } else if (row === endVal.row && col === endVal.col) {
                    changeTableClass(endVal.row, endVal.col, TableStyles.unvisited);
                    setEndVal({row: undefined, col: undefined});
                    modifyGraph(graph, row, col, "wall", false);
                } else {
                    changeTableClass(row, col, TableStyles.unvisited);
                    modifyGraph(graph, row, col, "wall", false);
                }
            } else {
                // set the the current thing to a wall
                // if the current point is the start or the end, set that to undefined/undefined
                // dont let someone simulate with an undefined start or end
                if (row === startVal.row && col === startVal.col) {
                    changeTableClass(startVal.row, startVal.col, TableStyles.unvisited);
                    setStartVal({row: undefined, col: undefined})
                    changeTableClass(row, col, TableStyles.wall);
                    modifyGraph(graph, row, col, "wall", true);
                } else if (row === endVal.row && col === endVal.col) {
                    changeTableClass(endVal.row, endVal.col, TableStyles.unvisited);
                    setEndVal({row: undefined, col: undefined});
                    changeTableClass(row, col, TableStyles.wall);
                    modifyGraph(graph, row, col, "wall", true);
                } else {
                    changeTableClass(row, col, TableStyles.wall);
                    modifyGraph(graph, row, col, "wall", true);
                }
            }
        });
        
        // setBoard(board)
    // }, [])
    const startArr = [startVal["row"], startVal["col"]];
    const endArr = [endVal["row"], endVal["col"]];
    // console.log(graph, "The answer is: ", AStar(graph, startArr, endArr, disanceHeuristic));
    
    const viz = (e) => {
        e.preventDefault();
        const {answer, considered} = AStar(graph, startArr, endArr, disanceHeuristic);
        
        for (let hash of considered) {
            if (hash === objToHash(startVal) || hash === objToHash(endVal)) {
                continue
            }
            const pt = hashToPoint(hash);
            
            changeTableClass(pt[0], pt[1], TableStyles.visited)
        }

        if (answer === undefined) return

        for (let i = 0; i < answer.length; i ++) {
            setTimeout(() => {
                const hash = answer[i];
                if (hash === objToHash(startVal) || hash === objToHash(endVal)) {
                    return
                }
                const pt = hashToPoint(hash);
                
                changeTableClass(pt[0], pt[1], TableStyles.inpath);
            }, i * 250)
        }
    }

    const clearTable = (e) => {
        setStartVal({row: undefined, col: undefined})
        setEndVal({row: undefined, col: undefined})
        e.preventDefault();
        for (let i = 0; i < rows; i ++) {
            for (let j = 0; j < columns; j++) {
                changeTableClass(i, j, TableStyles.unvisited);
                modifyGraph(graph, i, j, "wall", false);
            }
        }
    }


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

    const visualizeButton = (<div>
        <Tooltip placement="top" title={!disableButton ? "Visualize a path" : "You need to set a start and a goal first"}>
            <span>
                <Button onClick={viz} disabled={disableButton}>
                    Visualize the path with A Star
                </Button>
            </span>
        </Tooltip>
    </div>);

    const clearButton = (<div>
        <Tooltip placement="top" title={"clear everything on the board"}>
            <span>
                <Button onClick={clearTable}>
                    Clear everything
                </Button>
            </span>
        </Tooltip>
    </div>);


    return (<div>
        HTML table
        {controller}
        <div style={{maxHeight: "60vh", maxWidth: "60vw"}}>
            <div className={TableStyles.outer}>{generatedTable}</div>
        </div>
        {visualizeButton}
        {clearButton}
    </div>)
} // commit for master // another commit for master