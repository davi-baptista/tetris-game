export function createPiece(pieces) {
    const piece = pieces[Math.floor(Math.random() * pieces.length)];
    return {
        matrix: piece,
        position: {
            x: Math.floor(12 / 2) - Math.floor(piece[0].length / 2),
            y: 0
        }
    };
}

export function rotate(piece, board) {
    const matrix = piece.matrix;
    const N = matrix.length;
    const M = matrix[0].length;
    const rotated = [];
    
    for (let i = 0; i < M; i++) {
        rotated[i] = new Array(N).fill(0);
    }
    
    // Rotação no sentido horário
    for (let y = 0; y < N; y++) {
        for (let x = 0; x < M; x++) {
            rotated[x][N - 1 - y] = matrix[y][x];
        }
    }
    
    // Salva a posição atual
    const pos = piece.position.x;
    let offset = 1;
    
    // Tenta a rotação
    const oldMatrix = matrix;
    piece.matrix = rotated;
    
    // Se houver colisão, tenta ajustar a posição
    while (collide(piece, board)) {
        piece.position.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        
        // Se tentou ajustar muito para os lados, desfaz a rotação
        if (Math.abs(offset) > M) {
            piece.matrix = oldMatrix;
            piece.position.x = pos;
            return;
        }
    }
}

export function collide(piece, board) {
    const matrix = piece.matrix;
    const pos = piece.position;
    
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] !== 0 &&
                (board[y + pos.y] &&
                board[y + pos.y][x + pos.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

export function merge(piece, board) {
    piece.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                board[y + piece.position.y][x + piece.position.x] = value;
            }
        });
    });
}

export function getGhostPosition(piece, board) {
    let ghostY = piece.position.y;
    
    while (!collide({
        matrix: piece.matrix,
        position: { x: piece.position.x, y: ghostY + 1 }
    }, board)) {
        ghostY++;
    }
    
    return ghostY;
}