import React from 'react'


import TableStyles from '../../styles/PathFinder/Table.module.scss';

const changeTableClass = (row: number, col: number, toClass: string) => {
    console.log("row: ", row, 'col: ', col);
    const tableData = document.getElementById(`point ${row}-${col}`);

    tableData.className = `${TableStyles.inner} ${toClass}`;
}

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

const AStar = (start: number[], goal: number[], h: Function) => {
    const startHas = pointToHash(start)
    
    // This should be a min heap, or something similar
    // will prolly become a sorted array instead.
    // This is small enough, and fast enough, that it ought to work
    const openSet = [];
    openSet.push(start);
    
    cameFrom = {}

    gScore = {}
    gScore[startHash] = 0

    fScore = {}
    fScore[startHash] = h(start, goal)

    while (openSet.length > 0) {
        // smallest fScore value
        current = openSet.shift();

        if (current === goal) {
            return reconstructPath(cameFrom, current);
        }

        

    }
}

const reconstructPath = (cameFrom, current) => {

}


const disanceHeuristic = (start: number[], goal: number[]): number => {
    // manhatten distance OR the L1 norm
    return (start[0] - goal[0]) + (start[1] - goal[1])
}


const pointToHash = (point: number[]): string => {
    return `${point[0]}_${point[1]}`;
}

const hashToPoint = (hash: string): number[] => {
    strArr = hash.split('_');
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
    changeTableClass
}