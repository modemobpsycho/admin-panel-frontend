import React, { useEffect } from 'react'
import useModalStore from '../../stores/modalStore'
import Modal from '@mui/material/Modal/Modal'

interface ModalWindowProps {
	isOpen: boolean
	onClose: () => void
}

const ModalWindow: React.FC<ModalWindowProps> = ({ isOpen, onClose }) => {
	const { message, closeModal } = useModalStore()

	useEffect(() => {
		if (isOpen) {
			const timeout = setTimeout(() => {
				closeModal()
			}, 10000)

			return () => clearTimeout(timeout)
		}
	}, [isOpen, closeModal])

	const handleClose = () => {
		closeModal()
		onClose()
	}

	return (
		<Modal open={isOpen} onClose={handleClose}>
			<>
				<h2>Уведомление</h2>
				<p>{message}</p>
				<button onClick={handleClose}>Закрыть модальное окно</button>
			</>
		</Modal>
	)
}

export default ModalWindow
