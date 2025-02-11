class FetchData {
  constructor(private baseUrl: string) {}

  private async request(url: string, method: string, data?: any) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    })

    if (!response.ok) {
      throw new Error('Error en red')
    }

    return response.json()
  }

  async get(url: string) {
    return this.request(url, 'GET')
  }

  async post(url: string, data: any) {
    return this.request(url, 'POST', data)
  }

  async put(url: string, data: any) {
    return this.request(url, 'PUT', data)
  }

  async delete(url: string) {
    return this.request(url, 'DELETE')
  }
}

export default function Fetch(url: string) {
  return new FetchData(url)
}
