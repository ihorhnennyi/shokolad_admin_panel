import axios from 'axios'

// .env: VITE_API_URL=http://localhost:5000/api
export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api',
	withCredentials: true, // если юзаешь cookie-сессии
})
