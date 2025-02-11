import {useCallback} from 'react'

interface FilterOptions<T> {
  searchQuery: string
  showFavorites: boolean
  favorites: String[]
  data: T[]
  searchKeys: (keyof T)[]
}

export const useFilter = <T extends {ID: string}>({
  searchQuery,
  showFavorites,
  favorites,
  data,
  searchKeys,
}: FilterOptions<T>) => {
  const filterData = useCallback(() => {
    let filtered = data

    // Filtrado por búsqueda
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        searchKeys.some((key) =>
          String(item[key]).toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      )
    }

    // Filtrado por favoritos
    if (showFavorites) {
      filtered = filtered.filter((item) => favorites.includes(item.ID))
    }

    return filtered
  }, [searchQuery, showFavorites, favorites, data, searchKeys])

  return filterData()
}
