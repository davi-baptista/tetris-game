import { BLOCK_SIZE, COLORS } from './constants.js';

export function createMatrix(width, height) {
    const matrix = [];
    for (let i = 0; i < height; i++) {
        matrix.push(new Array(width).fill(0));
    }
    return matrix;
}

export function drawMatrix(context, matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = COLORS[value];
                context.fillRect(
                    (x + offset.x) * BLOCK_SIZE,
                    (y + offset.y) * BLOCK_SIZE,
                    BLOCK_SIZE - 1,
                    BLOCK_SIZE - 1
                );
            }
        });
    });
}

export function drawGhostPiece(context, matrix, position, ghostY) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = 'rgba(255, 255, 255, 0.2)';
                context.fillRect(
                    (x + position.x) * BLOCK_SIZE,
                    (y + ghostY) * BLOCK_SIZE,
                    BLOCK_SIZE - 1,
                    BLOCK_SIZE - 1
                );
            }
        });
    });
}

export function drawNextPiece(context, matrix) {
    const blockSize = 20;
    const padding = 10;
    const width = matrix[0].length * blockSize;
    const height = matrix.length * blockSize;
    const offsetX = (context.canvas.width - width) / 2;
    const offsetY = (context.canvas.height - height) / 2;

    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = COLORS[value];
                context.fillRect(
                    offsetX + x * blockSize,
                    offsetY + y * blockSize,
                    blockSize - 1,
                    blockSize - 1
                );
            }
        });
    });
}

export function clearLines(board, updateScore) {
    let linesCleared = 0;
    
    outer: for (let y = board.length - 1; y >= 0; y--) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x] === 0) {
                continue outer;
            }
        }
        
        const row = board.splice(y, 1)[0].fill(0);
        board.unshift(row);
        linesCleared++;
        y++;
    }
    
    if (linesCleared > 0) {
        updateScore(linesCleared);
    }
}