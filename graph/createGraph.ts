class GraphNode {
  val: number
  neighbors: GraphNode[]

  constructor(val?: number, neighbors?: GraphNode[]) {
    this.val = val === undefined ? 0 : val
    this.neighbors = neighbors === undefined ? [] : neighbors
  }
}

class Graph {
  nodes: GraphNode[]

  constructor(adjacencyMatrix: number[][]) {
    const numNodes = adjacencyMatrix.length
    this.nodes = []

    // create node
    for (let i = 0; i < numNodes; i++) {
      this.nodes.push(new GraphNode(i))
    }

    // link node
    for (let i = 0; i < numNodes; i++) {
      for (let j = 0; j < numNodes; j++) {
        if (adjacencyMatrix[i][j] === 1) {
          this.nodes[i].neighbors.push(this.nodes[j])
        }
      }
    }
  }

  findRootNode(): GraphNode | null {
    for (const node of this.nodes) {
      if (this.isRoot(node)) {
        return node
      }
    }
    return null
  }

  isRoot(node: GraphNode): boolean {
    for (const otherNode of this.nodes) {
      if (otherNode.neighbors.includes(node)) {
        return false
      }
    }
    return true
  }
}

const adjacencyMatrix: number[][] = [
  [0, 0, 0, 0],
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
]

const noRootAdjacencyMatrix: number[][] = [
  [0, 0, 0, 1],
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
]

// const graph = new Graph(adjacencyMatrix)
const graph = new Graph(noRootAdjacencyMatrix)
const rootNode = graph.findRootNode()

if (rootNode) {
  console.log('Root Node! ', rootNode.val)
} else {
  console.log('No root node! ')
}
