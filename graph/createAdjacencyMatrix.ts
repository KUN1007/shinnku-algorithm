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

const graph = new Graph(adjacencyMatrix)
const rootNode = graph.findRootNode()

// code

const dfsCountNodes = (rootNode: GraphNode) => {
  const visited = new Set<GraphNode>()
  const stack = [rootNode]

  while (stack.length) {
    const currentNode = stack.pop()

    if (!currentNode) {
      break
    }

    visited.add(currentNode)

    for (const neighbor of currentNode.neighbors) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor)
      }
    }
  }

  return visited.size
}

const createAdjacencyMatrix = (rootNode: GraphNode | null): number[][] => {
  if (!rootNode) {
    return []
  }

  // Method1: calculate node sum ,because this.nodes.push(new GraphNode(i))
  // const numNodes = rootNode.val + 1
  const adjacencyMatrix: number[][] = []

  // Method2: calculate node sum
  const numNodes = dfsCountNodes(rootNode)

  // initialize
  for (let i = 0; i < numNodes; i++) {
    adjacencyMatrix.push(Array(numNodes).fill(0))
  }

  const dfs = (node: GraphNode) => {
    for (const neighbor of node.neighbors) {
      adjacencyMatrix[node.val][neighbor.val] = 1
      dfs(neighbor)
    }
  }

  dfs(rootNode)

  return adjacencyMatrix
}

console.table(adjacencyMatrix)
console.table(createAdjacencyMatrix(rootNode))
