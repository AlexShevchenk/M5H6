const baseUrl = "https://reqres.in/api/"

const handleResponse = async (response: Response) => {
    const message = await response.json()
    if (!response.ok) {

        //throw Error(message.error || 'Request error')
        console.log(response.status, message.error)
        return message
    }
    else{
        console.log(response.status)
        return message
    }

}

const apiClient = async ({ path, method, data }: apiClientProps) => {
    const requestOptions = {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: !!data ? JSON.stringify(data) : undefined
    }
    return await fetch(`${baseUrl}${path}`, requestOptions).then(handleResponse)
}

interface apiClientProps {
    path: string
    method: string
    data?: any
}

export default apiClient