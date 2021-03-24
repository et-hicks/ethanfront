import { GraphicEqSharp } from '@material-ui/icons';
import React from 'react'


import TableStyles from '../../styles/PathFinder/Table.module.scss';

// exported for table modification
const changeTableClass = (row: number, col: number, toClass: string) => {
    console.log("row: ", row, 'col: ', col);
    const tableData = document.getElementById(`point ${row}-${col}`);

    tableData.className = `${TableStyles.inner} ${toClass}`;
}

// exported for table creation
const createTable = (rows: number, cols: number, clicked?: Function) => {

    const clicker = (row: number, col: number) => {
        console.log("clicker", row, col);
        clicked?.(row, col)
    }

    let grid = []
    for (let row = 0; row < rows; row++) {
        let gridRow = []
        for (let col = 0; col < cols; col++) {
            const point = <div 
                            id={`point ${row}-${col}`} 
                            key={`key ${row}-${col}`} 
                            className={`${TableStyles.inner} ${TableStyles.unvisited}`} 
                            onClick={() => clicker(row, col)}
                            >
                                {row}-{col}
                            </div>
            gridRow.push(point)
        }
        grid.push(<div 
                    id={`rowID ${row}`} 
                    className={TableStyles.middle}
                    key={`IDKey ${row}`}
                    >
                        {gridRow}
                    </div>)
    }
    console.log(grid);
    return grid
}

// exported for graph creation
const createGraph = (rows: number, cols: number): Graph => {
    let g: Graph = {};
    for (let row = 0; row < rows; row ++) {
        for (let col = 0; col < cols; col++) {
            const pointHash: string = pointToHash([row, col]);
            const neighbors: string[] = []
            if (col - 1 > -1) {// add up
                neighbors.push(pointToHash([row, col - 1]));
            }
            if (col + 1 < cols) {// add down
                neighbors.push(pointToHash([row, col + 1]));
            }
            if (row - 1 > -1) {// add left
                neighbors.push(pointToHash([row - 1, col]));
            }
            if (row + 1 < rows) {// add right
                neighbors.push(pointToHash([row + 1, col]));
            }
            const gNode: GraphNode = {
                point: [row, col],
                pointHash: pointHash,
                neighbors: neighbors,
                wall: false,
                visited: false,
            };
            g[pointHash] = gNode;
        }
    }
    return g;
}

// exported for table creation
const modifyGraph = (g: Graph, row: number, col: number, w_v: string, bool: boolean) => {
    // w_v can either be 'wall' or 'visited', and will change to either
    // true or false, depending on what is requested
    
    const key: string = pointToHash([row, col]);
    g[key][w_v] = bool;
}

// exported for path finding
const AStar = (graph: Graph, start: number[], goal: number[], h: Function, rows: number, cols: number): string[] => {
    console.log(graph);
    const startHash = pointToHash(start);
    const goalHash = pointToHash(goal);
    // This should be a min heap, or something similar
    // will prolly become a sorted array instead.
    // This is small enough, and fast enough, that it ought to work
    const openSet: SetType[] = [];
    const startSet: SetType = {
        node: graph[startHash],
        gNumber: 0,
        fNumber: h(start, goal),
    }
    openSet.push(startSet);
    
    const cameFrom: Map<string, string> = new Map()

    const gScore = {}
    gScore[startHash] = 0

    const fScore = {}
    fScore[startHash] = h(start, goal)

    while (openSet.length > 0) {
        // smallest fScore value first
        const { node, gNumber, fNumber} = openSet.shift();

        if (node.pointHash === goalHash) {
            return reconstructPath(cameFrom, node.pointHash);
        }

        for (let neighbor of node.neighbors) {
            console.log(neighbor, node.neighbors, gScore[neighbor]);
            if (graph[neighbor].wall) continue // Can't add walls 
            const tentative_gScore = gNumber + 1 // d is always 1
            if (tentative_gScore < gScore[neighbor] || gScore[neighbor] === undefined) {
                cameFrom.set(neighbor, node.pointHash);
                gScore[neighbor] = tentative_gScore;
                fScore[neighbor] = gScore[neighbor] + h(graph[neighbor].point, goal);
                if (!inOpenSet(openSet, neighbor)) {
                    const neighborNode: SetType = {
                        node: graph[neighbor],
                        gNumber: tentative_gScore,
                        fNumber: gScore[neighbor] + h(graph[neighbor].point, goal)
                    }
                    openSet.push(neighborNode)
                    // This is why we need minHeaps
                    openSet.sort((a: SetType, b: SetType) => {
                        return a.fNumber > b.fNumber ? 1 : -1; 
                    })
                }
            }
        }
    }
}

const reconstructPath = (cameFrom: Map<string, string>, current: string): string[] => {
    const total_path = [current];
    
    while (cameFrom.has(current)) {
        const currHolder = current
        current = cameFrom.get(current);
        total_path.push(current);
        cameFrom.delete(currHolder);
    }
    total_path.reverse();
    return total_path;
    
}

const inOpenSet = (openSet: SetType[], neighbor: string): boolean => {
    // TODO: make this better
    for (let i = 0; i < openSet.length; i++) {
       if (openSet[i].node.pointHash === neighbor) {
           return true
       }
    }
    return false;
}

const pointToHash = (point: number[]): string => {
    return `${point[0]}_${point[1]}`;
}

const disanceHeuristic = (start: number[], goal: number[]): number => {
    // manhatten distance OR the L1 norm
    return (start[0] - goal[0]) + (start[1] - goal[1])
}


const hashToPoint = (hash: string): number[] => {
    const strArr = hash.split('_');
    return [parseInt(strArr[0]), parseInt(strArr[1])]
}

const minHeapify =  (array, index) => {
    const temp = array[index]
    let childIndex
  
    for (; index * 2 < array.length; index = childIndex) {
      childIndex = index * 2
  
      // Choose the smaller of the two (left, right) children
      if (childIndex != array.length - 1 && array[childIndex] > array[childIndex + 1]) {
        childIndex ++
      }
  
      if (temp > array[childIndex]) {
        array[index] = array[childIndex]
      } else {
        break
      }
    }
  
    array[index] = temp
  }




export {
    createTable,
    changeTableClass,
    createGraph,
    modifyGraph,
    AStar,
    disanceHeuristic
}