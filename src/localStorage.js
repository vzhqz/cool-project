
export function saveGridState(isGridShowing) {
    localStorage.setItem('isGridShowing', isGridShowing);
}

export function loadGridState() {
    const gridShowing = localStorage.getItem('isGridShowing');
    return gridShowing === 'true';
}

export function saveDotsState(areDotsShowing) {
    localStorage.setItem('areDotsShowing', areDotsShowing);
}

export function loadDotsState() {
    const dotsShowing = localStorage.getItem('areDotsShowing');
    return dotsShowing === 'true';
}