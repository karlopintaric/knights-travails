class Board {
  constructor() {
    this.possibleMoves = [
      [2, 1],
      [1, 2],
      [-1, 2],
      [-2, 1],
      [-2, -1],
      [-1, -2],
      [1, -2],
      [2, -1],
    ];
    this.board = this.#initGraph();
  }

  knightMoves(start, end) {
    // Check if valid positions
    if (
      !this.#validMove(start[0], start[1]) ||
      !this.#validMove(end[0], end[1])
    ) {
      console.log("Invalid move!");
      return;
    }

    const queue = [{ pos: start, moves: 0, path: [start] }];
    const visited = new Set();
    visited.add(start.join(","));

    while (queue.length !== 0) {
      const { pos, moves, path } = queue.shift();

      if (pos[0] == end[0] && pos[1] == end[1]) {
        console.log(`You made it in ${moves} moves! Here is your path:`);
        for (let move of path) {
          console.log(move);
        }

        return moves;
      }

      for (const neighbor of this.board[pos[0]][pos[1]]) {
        if (!visited.has(neighbor.join(","))) {
          visited.add(neighbor.join(","));
          queue.push({
            pos: neighbor,
            moves: moves + 1,
            path: [...path, neighbor],
          });
        }
      }
    }

    return -1;
  }

  #initGraph() {
    const board = [];

    for (let i = 0; i < 8; i++) {
      const row = [];

      for (let j = 0; j < 8; j++) {
        const edges = this.#getEdges(i, j);
        row.push(edges);
      }

      board.push(row);
    }

    return board;
  }

  #getEdges(i, j) {
    const edges = [];

    for (const move of this.possibleMoves) {
      const newI = i + move[0];
      const newJ = j + move[1];

      if (this.#validMove(newI, newJ)) {
        edges.push([newI, newJ]);
      }
    }

    return edges;
  }

  #validMove(i, j) {
    if (i < 0 || i > 7 || j < 0 || j > 7) {
      return false;
    }

    return true;
  }
}

const test = new Board();
test.knightMoves([3, 3], [4, 3]);
