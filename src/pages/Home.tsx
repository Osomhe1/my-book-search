/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import BookList from '../components/BookList'
import { searchBooks, fetchInitialBooks } from '../services/bookService'
import { Box, Spinner, Text } from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroll-component'

const Home: React.FC = () => {
  const [books, setBooks] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const maxResults = 10

  useEffect(() => {
    const loadInitialBooks = async () => {
      setLoading(true)
      try {
        const initialBooks = await fetchInitialBooks(maxResults, 0)
        setBooks(initialBooks)
        setHasMore(initialBooks.length === maxResults)
      } catch (err) {
        setError('Failed to load initial books. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadInitialBooks()
  }, [])

  const handleSearch = async (query: string) => {
    setLoading(true)
    setError('')
    setBooks([])
    setCurrentPage(0)
    try {
      const results = await searchBooks(query, maxResults, 0)
      setBooks(results)
      setHasMore(results.length === maxResults)
    } catch (err) {
      setError('Failed to fetch books. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const loadMoreBooks = async () => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    try {
      const results = await searchBooks(
        'bestsellers',
        maxResults,
        nextPage * maxResults
      )
      setBooks((prevBooks) => [...prevBooks, ...results])
      setHasMore(results.length === maxResults)
    } catch (err) {
      setError('Failed to fetch more books. Please try again.')
    }
  }

  return (
    <Box p={4} minH='100vh'>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        textAlign='center'
      >
        <Text fontWeight={700} fontSize={30} color='black'>
          My Book Store
        </Text>
      </Box>
      <SearchBar onSearch={handleSearch} />
      {loading && (
        <Box
          minH='90vh'
          width='90vw'
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Spinner />
        </Box>
      )}
      {error && (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
        >
          <Text color='red.500'>{error}</Text>
        </Box>
      )}
      {!loading && (
        <InfiniteScroll
          dataLength={books.length}
          next={loadMoreBooks}
          hasMore={hasMore}
          loader={<Spinner />}
          endMessage={<Text>No more results</Text>}
        >
          <BookList books={books} />
        </InfiniteScroll>
      )}
    </Box>
  )
}

export default Home
