import apiClient from '../client'

export const registration = ({ email, password }: { email: string, password: string }) => apiClient({
    path: `register`,
    method: 'post',
    data: { email, password }
})