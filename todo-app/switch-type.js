export function getTypeStorage() {
    const type = JSON.parse(localStorage.getItem('typeStorage'));
    return type;
}

export function setTypeApi() {
    localStorage.setItem('typeStorage', JSON.stringify({ type: 'api' }));
}

export function setTypeLocalStorage() {
    localStorage.setItem('typeStorage', JSON.stringify({ type: 'localStorage' }));
}