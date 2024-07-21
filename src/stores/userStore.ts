import create from 'zustand'

interface UserStoreState {
	token: string | null
	email: string | null
	username: string | null
	login: (token: string, email: string, username: string) => void
	logout: () => void
	getUserByEmail: () => string | null
}

const useUserStore = create<UserStoreState>(set => ({
	token: localStorage.getItem('accessToken') || null,
	email: localStorage.getItem('userEmail') || null,
	username: localStorage.getItem('username') || null,
	login: (token, email, username) => {
		set({ token, email, username })
		localStorage.setItem('accessToken', token)
		localStorage.setItem('userEmail', email)
		localStorage.setItem('username', username)
	},
	logout: () => {
		set({ token: null, email: null, username: null })
		localStorage.removeItem('accessToken')
		localStorage.removeItem('userEmail')
		localStorage.removeItem('username')
	},
	getUserByEmail: () => {
		return localStorage.getItem('userEmail')
	},
}))

export default useUserStore
