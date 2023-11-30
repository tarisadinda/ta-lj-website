export const getToken = () => {
    const token = typeof window !== "undefined" ? sessionStorage.getItem('access_token') : null

    return token
}

export const setToken = (token) => {
    if(typeof window !== undefined) {
        sessionStorage.setItem('access_token', token)
    }
}

export const removeToken = () => {
    if(typeof window !== undefined) {
        sessionStorage.removeItem('access_token')
    }
}