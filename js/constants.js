export const BOARD_WIDTH = 12;
export const BOARD_HEIGHT = 20;
export const BLOCK_SIZE = 20;
export const INITIAL_DROP_INTERVAL = 1000;

export const COLORS = [
    null,
    '#4ecca3', // I - Verde água
    '#ff7edb', // J - Rosa
    '#00b8ff', // L - Azul claro
    '#ffd300', // O - Amarelo
    '#ff6b6b', // S - Vermelho suave
    '#c792ea', // T - Roxo
    '#7fdbca', // Z - Verde água claro
];

export const PIECES = [
    [[1, 1, 1, 1]], // I
    [[1, 0, 0], [1, 1, 1]], // J
    [[0, 0, 1], [1, 1, 1]], // L
    [[1, 1], [1, 1]], // O
    [[0, 1, 1], [1, 1, 0]], // S
    [[0, 1, 0], [1, 1, 1]], // T
    [[1, 1, 0], [0, 1, 1]], // Z
];