
export function  getToken() : string {
    const token = localStorage.getItem('apiToken');
    return token ?? '';
}
export function setToken(token : string) {
    localStorage.setItem('apiToken', token);
}