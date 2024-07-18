import create from 'zustand'

interface ModalStoreState {
	isOpen: boolean
	message: string
	openModal: (message: string) => void
	closeModal: () => void
}

const useModalStore = create<ModalStoreState>(set => ({
	isOpen: false,
	message: '',
	openModal: message => {
		set({ isOpen: true, message })
	},
	closeModal: () => {
		set({ isOpen: false, message: '' })
	},
}))

export default useModalStore
