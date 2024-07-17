import React from 'react'
import './buttonStyles.scss' // Подключение файла стилей

interface DeleteButtonProps {
	userId: number
	onDelete: (userId: number) => void
}

export const DeleteButton: React.FC<DeleteButtonProps> = props => {
	const { userId, onDelete } = props

	const handleClick = () => {
		onDelete(userId)
	}

	return (
		<button className='deleteButton' onClick={handleClick}>
			Delete
		</button>
	)
}
