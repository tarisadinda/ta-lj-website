import axios from 'axios'
import { getToken } from './token'

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 120000,
    headers: {
        "Content-Type": "multipart/form-data"
    }
})

axiosInstance.interceptors.request.use (
    (config) => {
        const token = getToken()

        return {
            ...config,
            headers: {
                ...config.headers,
                Authorization: `Bearer ${token}`
            }
        }
    },
    (error) => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use (
    (res) => {
        return res
    }, (err) => {
        return Promise.reject(err)
    }
)