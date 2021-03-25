import React, { useState } from 'react'

import Table from "../../components/Table/Table"
// core components
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import { Tooltip } from '@material-ui/core';
import { Button } from "@material-ui/core";
import { createGraph } from "../../components/Table/TableUtils";

export default function PathFinder() {

    // graph for the re-render
    const [rows, setRows] = useState("15");
    const [cols, setCols] = useState("15");
    const [tableVals, setTableVals] = useState([15, 15])
    const [graph, setGraph] = useState(createGraph(15, 15))
    // const graph: Graph = createGraph(4, 4)

    // maybe have a table wrapper? or a useContext?

    const validateRows = (e) => {
        if (!/^\d+$/.test(e.target.value)) {
            e.target.value = e.target.value.slice(0, -1)
        } else {
            setRows(e.target.value)
        }
    }

    const validateCols = (e) => {
        if (!/^\d+$/.test(e.target.value)) {
            e.target.value = e.target.value.slice(0, -1)
        } else {
            setCols(e.target.value)
        }
    }

    const generateTable = () => {
        setTableVals([parseInt(rows), parseInt(cols)])
        setGraph(createGraph(parseInt(rows), parseInt(cols)))
    }
    // @ts-ignore
    const rowInput = (<GridItem xs={12} sm={4} md={4} lg={3}>
        <CustomInput
          labelText="Rows"
          id="float"
          formControlProps={{
            fullWidth: true,
            onChange: validateRows,
          }}
        />
      </GridItem>);
    
    // @ts-ignore
    const colInput = (<GridItem xs={12} sm={4} md={4} lg={3}>
        <CustomInput
          labelText="Columns"
          id="float"
          formControlProps={{
            fullWidth: true,
            onChange: validateCols,
          }}
        />
      </GridItem>);

    return (<div>
        <h1>Pathfinder</h1>
        <GridContainer>
            {rowInput}
            {colInput}
            {/* @ts-ignore */}
            <GridItem xs={12} sm={4} md={4} lg={3}>
                <Tooltip placement="top" title={"Make a new table"} enterDelay={1500}>
                    <span>
                        <Button onClick={generateTable}>
                            Generate Table
                        </Button>
                    </span>
                </Tooltip>
            </GridItem>
          </GridContainer>
        <Table rows={tableVals[0]} columns={tableVals[1]} graph={graph}/>
        <div>
            <p>
                Any good website should have a pathfinding algorithm. As this is a good website, this has a pathfinding algorithm. A version of A Star is implemented to 
            find the optimal path between any two nodes. It's a version of A Star because it over-considers nodes on the path. Based on the way I handle undefined inputs to the 
            set of nodes, it adds too many neighbors in the process. However, this still beats out somethign like Breadth-First-Search due to the use of a hueristic in the computation
            process. As such, the runtime of this algo lies somewhere between A Star and BFS, with a worst case scenario being as bad as BFS.
            </p>
            <p>
                While you can make the grid as large or small as you want, I caution making it larger than around 100 by 100. It will work, but the browser might have a difficult time
                rendering all the nodes, and all the size of the nodes. But, path-find to your heart's content. 
            </p>
        </div>
    </div>)
}