export type LoginDto = {
	email: string
	password: string
	remember?: boolean
}

export type LoginResponse = {
	accessToken: string
	refreshToken?: string
	user?: { id: string; email: string; name?: string; role?: string }
}
