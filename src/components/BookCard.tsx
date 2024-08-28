import { Box, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

interface BookCardProps {
  id: string
  title: string
  authors: string[]
  publishedDate: string
  thumbnail: string
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  authors,
  publishedDate,
  thumbnail,
}) => {
  return (
    <Link to={`/book/${id}`}>
      <Box
        minH='100%'
        borderWidth='1px'
        borderRadius='lg'
        overflow='hidden'
        p={4}
      >
        <Image src={thumbnail} alt={title} />
        <Text mt={2} fontWeight='bold'>
          {title}
        </Text>
        <Text>{authors.join(', ')}</Text>
        <Text>{publishedDate}</Text>
      </Box>
    </Link>
  )
}

export default BookCard
