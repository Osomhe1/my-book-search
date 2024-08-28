import { Input, Box } from '@chakra-ui/react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(event.target.value)
    }
  }

  return (
    <Box maxW={{ md: 400 }} mx='auto' my={4}>
      <Input placeholder='Search for books' onKeyPress={handleSearch} />
    </Box>
  )
}

export default SearchBar
