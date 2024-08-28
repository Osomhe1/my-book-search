import axios from 'axios'

const API_URL = 'https://www.googleapis.com/books/v1/volumes'

export const searchBooks = async (
  query: string,
  maxResults: number = 10,
  startIndex: number = 0
) => {
  const response = await axios.get(`${API_URL}`, {
    params: {
      q: query,
      maxResults,
      startIndex,
    },
  })
  return response.data.items
}

export const fetchInitialBooks = async (
  maxResults: number = 10,
  startIndex: number = 0
) => {
  const response = await axios.get(`${API_URL}`, {
    params: {
      q: 'bestsellers',
      maxResults,
      startIndex,
    },
  })
  return response.data.items
}

export const fetchBookById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`)
  return response.data
}
