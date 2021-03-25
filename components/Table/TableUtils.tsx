import { GraphicEqSharp } from '@material-ui/icons';
import React from 'react'


import TableStyles from '../../styles/PathFinder/Table.module.scss';

// exported for table modification
const changeTableClass = (row: number, col: number, toClass: string) => {
    // console.log("row: ", row, 'col: ', col);
    const tableData = document.getElementById(`point ${row}-${col}`);

    tableData.className = `${TableStyles.inner} ${toClass}`;
}

// exported for table creation
const createTable = (rows: number, cols: number, clicked?: Function) => {

    const clicker = (row: number, col: number) => {
        // console.log("clicker", row, col);
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
                                {" "}
                                {/* {row}-{col} */}
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
    // console.log(grid);
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
const AStar = (graph: Graph, start: number[], goal: number[], h: Function): AStarAnswer => {
    // console.log(graph);
    const startHash = pointToHash(start);
    const goalHash = pointToHash(goal);
    // This should be a min heap, or something similar
    // will prolly become a sorted array instead.
    // This is small enough, and fast enough, that it ought to work
    const openSet: SetType[] = [];
    const consideredNodes: string[] = [startHash];
    const startSet: SetType = {
        node: graph[startHash],
        gNumber: 0,
        fNumber: h(start, goal),
        distance: dis(start, goal)
    }
    openSet.push(startSet);
    
    const cameFrom: Map<string, string> = new Map()

    const gScore = {}
    gScore[startHash] = 0

    const fScore = {}
    fScore[startHash] = h(start, goal)

    // let iter = 0;
    while (openSet.length > 0) {
        // smallest fScore value first
        const { node, gNumber, fNumber, distance} = openSet.shift();
        // console.log(node, gNumber, fNumber, distance);

        if (node.pointHash === goalHash) {
            const answer = reconstructPath(cameFrom, node.pointHash);
            return {answer: answer, considered: consideredNodes}
        }
        // iter++

        for (let neighbor of node.neighbors) {
            // console.log(neighbor, node.neighbors, gScore[neighbor]);
            if (graph[neighbor].wall) continue // Can't add walls 
            // console.log(graph[neighbor].point, node.point, openSet);
            const distance = dis(graph[neighbor].point, goal);
            // console.log('distance: ', distance, neighbor, openSet);

            const tentative_gScore = gNumber + distance; // d is always 1
            
            if (gScore[neighbor] === undefined) gScore[neighbor] = Number.POSITIVE_INFINITY


            if (tentative_gScore < gScore[neighbor]) {
                
                cameFrom.set(neighbor, node.pointHash);
                gScore[neighbor] = tentative_gScore;
                fScore[neighbor] = gScore[neighbor] + h(graph[neighbor].point, goal);
                // consideredNodes.push(neighbor)
                // console.log("considered: ", neighbor, gScore[neighbor], fScore[neighbor], gNumber, tentative_gScore, distance);

                if (!inOpenSet(openSet, neighbor)) {
                    consideredNodes.push(neighbor)
                    const neighborNode: SetType = {
                        node: graph[neighbor],
                        gNumber: tentative_gScore,
                        fNumber: gScore[neighbor] + h(graph[neighbor].point, goal),
                        distance: distance
                    };
                    openSet.push(neighborNode);
                    // This is why we need minHeaps
                    openSet.sort((a: SetType, b: SetType) => {
                        // return a.fNumber >= b.fNumber ? 1 : -1; 
                        if (a.fNumber > b.fNumber) {
                            return 1
                        } else if (a.fNumber < b.fNumber) {
                            return -1
                        } else if (a.fNumber === b.fNumber) {
                            // sort based on smallest distance whenever the fNumber is equal
                            // should be an optimization
                            return a.gNumber >= b.gNumber ? 1 : -1
                        }
                    });
                } 
            }
        }
    }

    return {answer: [], considered: consideredNodes}
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

const disanceHeuristic = (node: number[], goal: number[]): number => {
    // manhatten distance OR the L1 norm
    const x = Math.abs((node[0] - goal[0]))
    const y = Math.abs((node[1] - goal[1]))
    // console.log(dis);
    return x + y
}

const dis = (start: number[], goal: number[]): number => {

    const x = Math.pow((start[0] - goal[0]), 2);
    const y = Math.pow((start[1] - goal[1]), 2);
    // const dis = Math.sqrt(x + y);

    // console.log(dis);

    return x + y
}


const hashToPoint = (hash: string): number[] => {
    const strArr = hash.split('_');
    // console.log(hash, strArr);
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

const stateUndefined = (state): boolean => {
    if (state["row"] === undefined || state["col"] === undefined) {
        return true
    }
    return false
}

const objToHash = (state) => {
    return `${state.row}_${state.col}`;
}
 

export {
    createTable,
    changeTableClass,
    createGraph,
    modifyGraph,
    AStar,
    disanceHeuristic,
    stateUndefined,
    objToHash,
    hashToPoint
}