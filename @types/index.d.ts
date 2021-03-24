type GraphNode = {
    point: number[];
    pointHash: string;
    neighbors: string[];
    wall: boolean;
    visited: boolean;
}

type Graph = {
    [hash: string]: GraphNode
}

type TableProps = {
    rows: number;
    columns: number;
}

type SetType = {
    node: GraphNode,
    gNumber: number;
    fNumber: number;
}