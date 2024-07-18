import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Button } from '@mui/material'
import './table.scss'
import DeleteIcon from '@mui/icons-material/Delete'
import BlockIcon from '@mui/icons-material/Block'
import useUserStore from '../../stores/userStore'
import { User } from '../../types/user.interface'

export default function Table() {
	const [data, setData] = useState<User[]>([])
	const [isUsersLoaded, setIsUsersLoaded] = useState(false)
	const [selectedRows, setSelectedRows] = useState<number[]>([])
	const [selectAllRows, setSelectAllRows] = useState(false)
	const mainCheckbox = useRef<HTMLInputElement>(null)
	const email = useUserStore(state => state.email)
	const { logout } = useUserStore(state => state)

	useEffect(() => {
		setIsUsersLoaded(false)
		axios
			.get<User[]>('http://localhost:5000/api/users')
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
		axios
			.put(`http://localhost:5000/api/users`, { access, userIds: selectedRows })
			.then(response => {
				setData(response.data)
			})
			.catch(error => {
				console.log(error)
			})
	}

	const handleDeleteUsers = () => {
		axios
			.delete(`http://localhost:5000/api/users`, {
				data: { userIds: selectedRows },
			})
			.then(response => {
				if (response.status === 204) {
					setData(prevData =>
						prevData.filter(
							item => item.id !== selectedRows.find(rowId => rowId === item.id)
						)
					)
				}
			})
			.catch(error => {
				console.log(error)
			})

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
				<span>{process.env.REACT_APP_API_URL}</span>
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
			<table className='table'>
				<thead>
					<tr>
						<th>
							<input
								type='checkbox'
								checked={selectAllRows}
								onChange={handleSelectAllRows}
								ref={mainCheckbox}
							/>
						</th>
						<th>ID</th>
						<th>Username</th>
						<th>Email</th>
						<th>Position</th>
						<th>Last login</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{data.map(item => (
						<tr key={item.id}>
							<td>
								<input
									type='checkbox'
									checked={selectedRows.includes(item.id)}
									onChange={event => handleCheckboxChange(event, item.id)}
								/>
							</td>
							<td>{item.id}</td>
							<td>{item.username}</td>
							<td>{item.email}</td>
							<td>{item.position}</td>
							<td>
								{new Date(item.lastLogin).toLocaleTimeString() +
									' ' +
									new Date(item.lastLogin).toLocaleDateString()}
							</td>
							<td>{getStatusLabel(item.access)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
