import React from 'react'

import Table from "../../components/Table/Table"

import { createGraph } from "../../components/Table/TableUtils";

export default function PathFinder() {

    // graph for the re-render 
    const graph: Graph = createGraph(4, 4)

    // maybe have a table wrapper? or a useContext?

    return (<div>
        Pathfinder
        <Table rows={4} columns={4} graph={graph}/>
    </div>)
}