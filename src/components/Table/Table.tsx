import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Button } from '@mui/material'
import './table.scss'
import DeleteIcon from '@mui/icons-material/Delete'
import BlockIcon from '@mui/icons-material/Block'
import useUserStore from '../../stores/userStore'
import { User } from '../../types/user.interface'
import { API_URL } from '../../helpers/constants'
import { errorHandler } from '../../helpers/errorHandler'
import useModalStore from '../../stores/modalStore'

export default function Table() {
	const [data, setData] = useState<User[]>([])
	const [isUsersLoaded, setIsUsersLoaded] = useState(false)
	const [selectedRows, setSelectedRows] = useState<number[]>([])
	const [selectAllRows, setSelectAllRows] = useState(false)
	const mainCheckbox = useRef<HTMLInputElement>(null)
	const email = useUserStore(state => state.email)
	const { logout } = useUserStore(state => state)
	const { showMessage } = useModalStore(state => state)

	useEffect(() => {
		setIsUsersLoaded(false)
		axios
			.get<User[]>(API_URL + '/users')
			.then(response => {
				setData(response.data)
			})
			.catch(error => {
				console.log(error)
			})
			.finally(() => setIsUsersLoaded(true))
	}, [])

	useEffect(() => {
		if (
			(data.some(user => user.access === false && user.email === email) ||
				data.find(user => user.email === email) === undefined) &&
			isUsersLoaded
		) {
			logout()
		}
	}, [data])

	useEffect(() => {
		if (selectedRows.length === data.length) {
			setSelectAllRows(true)
		} else {
			setSelectAllRows(false)
		}
		if (selectedRows.length > 0 && selectedRows.length < data.length) {
			mainCheckbox.current!.indeterminate = true
			setSelectAllRows(true)
		} else {
			mainCheckbox.current!.indeterminate = false
		}
	}, [selectedRows.length, data.length])

	const handleUpdateAccess = (access: boolean) => {
		try {
			axios
				.put(API_URL + '/users', { access, userIds: selectedRows })
				.then(response => {
					setData(response.data)
				})
			showMessage('Users access successfully updated!')
		} catch (error) {
			errorHandler(error, showMessage)
		}
	}

	const handleDeleteUsers = () => {
		try {
			axios.delete(API_URL + '/users', {
				data: { userIds: selectedRows },
			})
			setData(prevData =>
				prevData.filter(
					item => item.id !== selectedRows.find(rowId => rowId === item.id)
				)
			)
			showMessage('Users deleted successfully!')
		} catch (error) {
			errorHandler(error, showMessage)
		}
		setSelectedRows([])
		setSelectAllRows(false)
	}

	const handleCheckboxChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		userId: number
	) => {
		const isChecked = event.target.checked
		if (isChecked) {
			setSelectedRows(prevSelectedRows => [...prevSelectedRows, userId])
		} else {
			setSelectedRows(prevSelectedRows =>
				prevSelectedRows.filter(rowId => rowId !== userId)
			)
		}
	}

	const handleSelectAllRows = (event: React.ChangeEvent<HTMLInputElement>) => {
		const isChecked = event.target.checked
		setSelectAllRows(isChecked)

		if (isChecked) {
			const allUserIds = data.map(item => item.id)
			setSelectedRows(allUserIds)
		} else {
			setSelectedRows([])
		}
	}

	const getStatusLabel = (access: boolean) => {
		return access ? 'Active' : 'Blocked'
	}

	return (
		<div>
			<div className='button-container'>
				<Button
					className='m-2'
					variant='contained'
					color='secondary'
					disabled={selectedRows.length === 0}
					onClick={handleDeleteUsers}
				>
					<DeleteIcon />
				</Button>
				<Button
					className='m-2'
					variant='contained'
					color='primary'
					disabled={selectedRows.length === 0}
					onClick={() => handleUpdateAccess(false)}
				>
					<BlockIcon />
				</Button>
				<Button
					className='m-2'
					variant='contained'
					color='primary'
					disabled={selectedRows.length === 0}
					onClick={() => handleUpdateAccess(true)}
				>
					Unblock
				</Button>
			</div>
			<div className='table-container'>
				<table className='table'>
					<thead>
						<tr>
							<th className='header-cell checkbox-cell'>
								<input
									type='checkbox'
									checked={selectAllRows}
									onChange={handleSelectAllRows}
									ref={mainCheckbox}
								/>
							</th>
							<th>
								Username
								<br />
								<span style={{ fontSize: 'small' }}>Position</span>
							</th>
							<th className='header-cell'>Email</th>
							<th className='header-cell'>Last login</th>
							<th className='header-cell'>Status</th>
						</tr>
					</thead>
					<tbody>
						{data.map(item => (
							<tr key={item.id}>
								<td className='checkbox-cell'>
									<input
										type='checkbox'
										checked={selectedRows.includes(item.id)}
										onChange={event => handleCheckboxChange(event, item.id)}
									/>
								</td>
								<td>
									{item.username}
									<br />
									<span style={{ fontSize: 'small' }}>
										{item.position ?? '-'}
									</span>
								</td>
								<td>{item.email}</td>
								<td>
									{new Date(item.lastLogin).toLocaleTimeString()}{' '}
									{new Date(item.lastLogin).toLocaleDateString()}
								</td>
								<td>{getStatusLabel(item.access)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
