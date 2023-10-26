export const getToken = () => {
    const token = typeof window !== "undefined" ? sessionStorage.getItem('user_token') : null

    return token
}

export const setToken = (token) => {
    if(typeof window !== undefined) {
        sessionStorage.setItem('user_token', token)
    }
}

export const removeToken = () => {
    if(typeof window !== undefined) {
        sessionStorage.removeItem('user_token')
    }
}