/* eslint-disable @typescript-eslint/no-explicit-any */
import { SimpleGrid } from '@chakra-ui/react'
import BookCard from './BookCard'

interface BookListProps {
  books: any[]
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <SimpleGrid columns={[1, 2, 3, 4]} spacing={10}>
      {books.map((book) => (
        <BookCard
          key={book.id}
          id={book.id}
          title={book.volumeInfo.title}
          authors={book.volumeInfo.authors || []}
          publishedDate={book.volumeInfo.publishedDate}
          thumbnail={book.volumeInfo.imageLinks?.thumbnail || ''}
        />
      ))}
    </SimpleGrid>
  )
}

export default BookList
