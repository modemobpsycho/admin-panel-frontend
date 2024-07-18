import React from 'react'
import './buttonStyles.scss'

interface AccessButtonProps {
	access: boolean
	userId: number
	onUpdateAccess: (userId: number, access: boolean) => void
}

export const AccessButton: React.FC<AccessButtonProps> = props => {
	const { access, userId, onUpdateAccess } = props

	const handleClick = () => {
		const newAccess = !access
		onUpdateAccess(userId, newAccess)
	}

	return (
		<button
			className={access ? 'accessButton' : 'unblockButton'}
			onClick={handleClick}
		>
			{access ? 'Block' : 'Unblock'}
		</button>
	)
}
