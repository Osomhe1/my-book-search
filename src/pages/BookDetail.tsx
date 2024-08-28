/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchBookById } from '../services/bookService'
import { Box, Text, Image, Spinner, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [book, setBook] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const loadBookDetails = async () => {
      setLoading(true)
      try {
        const bookDetails = await fetchBookById(id!)
        setBook(bookDetails)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch book details. Please try again.')
        setLoading(false)
      }
    }

    loadBookDetails()
  }, [id])

  if (loading)
    return (
      <Box
        minH='100vh'
        width='100vw'
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
      >
        <Spinner />
      </Box>
    )
  if (error)
    return (
      <Box
        minH='100vh'
        width='100vw'
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
      >
        <Text color='red.500'>{error}</Text>
      </Box>
    )

  return (
    <Box p={4} minH='100vh'>
      <Button onClick={() => navigate(-1)} mb={4}>
        Back
      </Button>
      {book && (
        <>
          <Text fontSize='2xl' fontWeight='bold'>
            {book.volumeInfo.title}
          </Text>
          <Text fontSize='lg'>{book.volumeInfo.authors?.join(', ')}</Text>
          {/* Using dangerouslySetInnerHTML */}
          <Text
            mt={2}
            dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }}
          />
          <Text mt={2} fontWeight='bold'>
            Publisher: {book.volumeInfo.publisher}
          </Text>
          <Text>Published Date: {book.volumeInfo.publishedDate}</Text>
          <Image
            mt={4}
            src={book.volumeInfo.imageLinks?.thumbnail}
            alt={book.volumeInfo.title}
          />
        </>
      )}
    </Box>
  )
}

export default BookDetail
