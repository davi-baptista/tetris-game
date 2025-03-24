const HIGHSCORE_KEY = 'tetris_highscore';

export function getHighscore() {
    return parseInt(localStorage.getItem(HIGHSCORE_KEY)) || 0;
}

export function updateHighscore(score) {
    const currentHighscore = getHighscore();
    if (score > currentHighscore) {
        localStorage.setItem(HIGHSCORE_KEY, score);
        return score;
    }
    return currentHighscore;
}