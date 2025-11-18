export const saveToken = (access_token: string, refresh_token: string): void => {
    if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem("ACCESS_TOKEN", access_token);
        localStorage.setItem("REFRESH_TOKEN", refresh_token);
    }

}

export const isLogged = (): boolean => {
    if (typeof window !== 'undefined' && localStorage.getItem('ACCESS_TOKEN')) {
        return true;
    }
    return false;
}

export const clearToken=():void=>{
    if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.clear();
    }
}