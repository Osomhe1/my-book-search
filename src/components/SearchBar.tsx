import React from 'react'
import { Input, Box } from '@chakra-ui/react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(event.currentTarget.value)
    }
  }

  return (
    <Box my={4} w={{ md: 400 }}>
      <Input placeholder='Search for books' onKeyPress={handleKeyPress} />
    </Box>
  )
}

export default SearchBar
