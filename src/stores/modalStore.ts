import { Toast } from 'bootstrap'
import create from 'zustand'

interface ModalStoreState {
	message: string
	showMessage: (message: string) => void
}

const useModalStore = create<ModalStoreState>(set => ({
	message: '',
	showMessage: (message: string) => {
		set({ message })
		const myToast = Toast.getOrCreateInstance(
			document.getElementById('myToast') ?? 'myToast'
		)
		myToast.show()
	},
}))

export default useModalStore
