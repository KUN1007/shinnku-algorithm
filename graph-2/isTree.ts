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

const isTree = (rootNode: GraphNode | null): boolean => {
  if (!rootNode) {
    // Empty graph is a tree
    return true
  }

  const visited: Set<GraphNode> = new Set()

  const dfs = (node: GraphNode | null, parent: GraphNode | null): boolean => {
    if (!node) {
      return true
    }

    if (visited.has(node)) {
      return false
    }

    visited.add(node)

    for (const neighbor of node.neighbors) {
      if (neighbor !== parent && !dfs(neighbor, node)) {
        return false
      }
    }

    return true
  }

  return dfs(rootNode, null) && visited.size === countNodes(rootNode)
}

const countNodes = (node: GraphNode | null): number => {
  if (!node) {
    return 0
  }

  let count = 1

  for (const neighbor of node.neighbors) {
    count += countNodes(neighbor)
  }

  return count
}
