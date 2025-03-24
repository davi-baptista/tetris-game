const SAVEGAME_KEY = 'tetris_savegame';

export function saveGame(gameState) {
    const saveData = {
        board: gameState.board,
        piece: {
            matrix: gameState.piece.matrix,
            position: gameState.piece.position
        },
        nextPiece: {
            matrix: gameState.nextPiece.matrix,
            position: gameState.nextPiece.position
        },
        score: gameState.score,
        level: gameState.level,
        timestamp: Date.now()
    };
    
    localStorage.setItem(SAVEGAME_KEY, JSON.stringify(saveData));
    return saveData;
}

export function loadGame() {
    const savedData = localStorage.getItem(SAVEGAME_KEY);
    if (!savedData) return null;
    
    try {
        const data = JSON.parse(savedData);
        // Verifica se o save é mais antigo que 24 horas
        if (Date.now() - data.timestamp > 24 * 60 * 60 * 1000) {
            localStorage.removeItem(SAVEGAME_KEY);
            return null;
        }
        return data;
    } catch (error) {
        console.error('Erro ao carregar o jogo:', error);
        localStorage.removeItem(SAVEGAME_KEY);
        return null;
    }
}

export function clearSaveGame() {
    localStorage.removeItem(SAVEGAME_KEY);
}