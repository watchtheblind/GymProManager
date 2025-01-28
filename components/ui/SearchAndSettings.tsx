import type React from "react"
import { View, TouchableOpacity } from "react-native"
import SearchBar from "@/components/ui/SearchBar"
import { Settingsicon } from "@/components/ui/Bottomnav/Icons"

interface SearchAndSettingsProps {
  onSearch: (text: string) => void
  onClear: () => void
}

const SearchAndSettings: React.FC<SearchAndSettingsProps> = ({ onSearch, onClear }) => {
  return (
    <View className="flex flex-row justify-center items-center">
      <View className="flex-3">
        <View className="w-11/12">
          <SearchBar onSearch={onSearch} onClear={onClear} />
        </View>
      </View>
      <View className="flex-1 flex items-center justify-center w-1/4">
        <TouchableOpacity className="h-12 w-12 p-2 rounded-xl mr-2">
          <Settingsicon size={24} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SearchAndSettings

