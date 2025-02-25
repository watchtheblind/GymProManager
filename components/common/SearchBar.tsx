import React, {useState} from 'react'
import {View, TextInput, TouchableOpacity} from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

interface SearchBarProps {
  onSearch: (text: string) => void
  onClear: () => void
}

const SearchBar: React.FC<SearchBarProps> = ({onSearch, onClear}) => {
  const [searchText, setSearchText] = useState<string>('')

  const handleSearch = (text: string) => {
    setSearchText(text)
    onSearch(text)
  }

  const handleClear = () => {
    setSearchText('')
    onClear()
  }

  return (
    <View style={{width: '100%', marginTop: 20, marginBottom: 20}}>
      <View
        style={{
          position: 'relative',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TextInput
          style={{
            fontFamily: 'MyriadPro',
            paddingLeft: 40,
            paddingRight: 40,
            paddingVertical: 10,
            fontSize: 15,
            color: 'white',
            borderRadius: 30,
            backgroundColor: '#B0A462',
            borderWidth: 2,
            borderColor: '#FEF4C9',
            width: '100%',
          }}
          keyboardType='default'
          placeholder='Buscar'
          placeholderTextColor='#fff'
          value={searchText}
          onChangeText={handleSearch}
        />
        <View style={{position: 'absolute', left: 10}}>
          <MaterialIcons
            name='search'
            size={28}
            color='white'
          />
        </View>
        {searchText !== '' && (
          <TouchableOpacity
            onPress={handleClear}
            style={{position: 'absolute', right: 10}}>
            <MaterialIcons
              name='close'
              size={24}
              color='white'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default SearchBar
