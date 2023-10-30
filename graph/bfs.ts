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
      this.nodes.push(new GraphNode(i + 1))
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

  findNodeByValue(value: number): GraphNode | null {
    for (const node of this.nodes) {
      if (node.val === value) {
        return node
      }
    }
    return null
  }
}

const adjacencyMatrix: number[][] = [
  [0, 1, 0, 0],
  [1, 0, 1, 0],
  [1, 1, 0, 0],
  [0, 0, 1, 0],
]

const graph = new Graph(adjacencyMatrix)

const minDistance = (
  startNode: GraphNode | null,
  endNode: GraphNode | null
) => {
  if (!startNode || !endNode) {
    return -1
  }

  if (startNode === endNode) {
    return 0
  }

  const queue = [startNode]
  const visited = new Set<GraphNode>()
  visited.add(startNode)

  let distance = 0

  while (queue.length) {
    const size = queue.length

    for (let i = 0; i < size; i++) {
      const currentNode = queue.shift()

      if (!currentNode) {
        return
      }

      for (const neighbor of currentNode.neighbors) {
        if (neighbor === endNode) {
          return distance + 1
        }

        if (!visited.has(neighbor)) {
          visited.add(neighbor)
          queue.push(neighbor)
        }
      }
    }

    distance++
  }

  return -1
}

const node2 = graph.findNodeByValue(1)
const node1 = graph.findNodeByValue(3)

const distance =
  minDistance(node1, node2) === -1
    ? minDistance(node2, node1)
    : minDistance(node1, node2)

if (distance === -1) {
  console.log('The two nodes are not reachable')
} else {
  console.log(`The shortest distance is: ${distance}`)
}
