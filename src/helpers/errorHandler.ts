import { AxiosError } from 'axios'

export function errorHandler(
	error: unknown,
	showMessage: (message: string) => void
) {
	if (error instanceof AxiosError) {
		showMessage(error.response!.data.message)
	} else {
		showMessage('Something went wrong. Please try again later.')
	}
}
