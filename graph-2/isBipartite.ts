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

const isBipartite = (rootNode: GraphNode | null): boolean => {
  if (!rootNode) {
    // Empty graph is a bipartite
    return true
  }

  const colors: Map<GraphNode, number> = new Map()
  const queue: GraphNode[] = []

  queue.push(rootNode)
  colors.set(rootNode, 0)

  while (queue.length > 0) {
    const node: GraphNode = queue.shift() as GraphNode
    const currentColor: number = colors.get(node) as number

    for (const neighbor of node.neighbors) {
      if (!colors.has(neighbor)) {
        colors.set(neighbor, 1 - currentColor)
        queue.push(neighbor)
      } else if (colors.get(neighbor) === currentColor) {
        return false
      }
    }
  }

  return true
}

console.log(isBipartite(rootNode))
