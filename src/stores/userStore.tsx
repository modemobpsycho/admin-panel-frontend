// userStore.ts

import create from 'zustand'

interface UserStoreState {
	isLoggedIn: boolean
	token: string | null
	login: (token: string) => void
	logout: () => void
}

const useUserStore = create<UserStoreState>(set => ({
	isLoggedIn: false,
	token: null,
	login: token => set({ isLoggedIn: true, token }),
	logout: () => set({ isLoggedIn: false, token: null }),
}))

export default useUserStore
