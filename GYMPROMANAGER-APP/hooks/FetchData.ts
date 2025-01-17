class FetchData {
  baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async get(url: string) {
    const response = await fetch(`${this.baseUrl}${url}`)
    return response.json()
  }

  async put(url: string, data: any) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.json()
  }

  async post(url: string, data: any) {
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.json()
    } catch (error) {
      throw new Error('Error en red')
    }
  }

  async delete(url: string) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'DELETE',
    })
    return response.json()
  }
}

export default function Fetch(url: string) {
  return new FetchData(url)
}
