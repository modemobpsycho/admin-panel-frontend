import React from 'react'
import './buttonStyles.scss'

interface DeleteButtonProps {
	userId: number
	email: string
	onDelete: (userId: number, email: string) => void
}

export const DeleteButton: React.FC<DeleteButtonProps> = props => {
	const { userId, email, onDelete } = props

	const handleClick = () => {
		onDelete(userId, email)
	}

	return (
		<button className='deleteButton' onClick={handleClick}>
			Delete
		</button>
	)
}
