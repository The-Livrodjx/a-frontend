import { Box, Stack, HStack, Text } from "@chakra-ui/react";
import PaginationItem from "./PaginationItem";

interface PaginationProps {
  totalCountOfRegisters: number | any,
  registersPage?: number,
  currentPage?: number,
  onPageChange: (page: number) => void
}

const siblingsCount = 1

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1
    })
    .filter(page => page > 0)
}

export default function Pagination({
  totalCountOfRegisters,
  registersPage = 10,
  currentPage = 1,
  onPageChange
}: PaginationProps) {
  const startIndex = Number((currentPage - 1 ) * registersPage)
  const endIndex = Math.min(startIndex + registersPage - 1, totalCountOfRegisters -1)
  const lastPage = Math.ceil(totalCountOfRegisters / registersPage)

  const previousPages = currentPage > 1
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
    : []

  const nextPages = currentPage < lastPage
    ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : []

  return (
    <Stack
      position="relative"
      direction={["column", "row"]}
      mt="4"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <strong>{startIndex + 1 }</strong> - <strong>{endIndex + 1 }</strong> de <strong>{totalCountOfRegisters}</strong>
      </Box>
      <HStack spacing="2">

        {currentPage > (1 + siblingsCount) && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            {currentPage > (2 + siblingsCount) && (
              <Text color="gray.300" w="8" textAlign="center">...</Text>
            )
            }
          </>
        )}

        {previousPages.length > 0 && previousPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        })}

        <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />

        {nextPages.length > 0 && nextPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        })}

        {(currentPage + siblingsCount) < lastPage && (
          <>
            {(currentPage + 1 + siblingsCount) < lastPage && (
              <Text color="gray.300" w="8" textAlign="center">...</Text>
            )
            }
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}

      </HStack>
    </Stack>
  )
}