import React, {useEffect, useState} from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import {Stack} from 'expo-router'
import {useFetchAPI} from '@/hooks/useFetchAPI'
import {ThemedText} from '@/components/ThemedText'
import Settingsbutton from '@/components/ui/Settingsbutton'

export default function Classes() {
  const [search, setSearch] = useState('')
  const {data, loading, error} = useFetchAPI('/clases', {})
  const [searchedClasses, setSearchedClasses] = useState<any[]>()

  const colors = ['#CC7751', '#518893', '#B0A462']
  const nivels = ['Principiante', 'Intermedio', 'Experto']
  const colorNivel = (nivel: number) => {
    return colors[nivel - 1]
  }
  const TextNivel = (nivel: number) => {
    return nivels[nivel - 1]
  }
  const fakeDelay = (ms: number) => new Promise((res) => setTimeout(res, ms))
  let timeout: any

  const debounce = (callback: any, alwaysCall: any, ms: number) => {
    return (...args: any) => {
      alwaysCall(...args)
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        callback(...args)
      }, ms)
    }
  }

  const setSearchTextAlways = (text: string) => {
    setSearch(text)
  }

  const searchClass = async (text: string) => {
    await fakeDelay(1000)
    if (text.trim() === '') {
      setSearchedClasses(data)
    } else {
      const validationSource = data.filter((item: any) => item.titulo)
      const filteredClasses = validationSource.filter((item: any) => {
        return item.titulo.toLowerCase().includes(text.toLowerCase())
      })
      setSearchedClasses(filteredClasses)
    }
  }

  const debounceSearchClass = debounce(searchClass, setSearchTextAlways, 1000)

  const clearSearch = () => {
    setSearch('')
    setSearchedClasses(data)
    if (timeout) {
      clearTimeout(timeout)
    }
  }

  useEffect(() => {
    setSearchedClasses(data)
  }, [data])

  useEffect(() => {
    return () => {
      clearTimeout(timeout)
    }
  }, [timeout]) // Added timeout to the dependency array

  return (
    <ScrollView
      scrollEventThrottle={16}
      bounces={false}
      style={styles.container}>
      <SafeAreaView>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <View className='flex flex-row items-center justify-between'>
          <Text className='text-white text-xl font-Copperplate'>
            CLASES VIRTUALES
          </Text>
          <Settingsbutton></Settingsbutton>
        </View>
        <KeyboardAvoidingView
          style={{
            width: '100%',
          }}
          className=''>
          <View className='mt-5 relative flex flex-row items-center mb-8'>
            <TextInput
              keyboardType='default'
              placeholder='Buscar'
              placeholderTextColor={'#fff'}
              value={search}
              onChangeText={debounceSearchClass}
              className='pl-12 pr-10 py-2 text-white rounded-bl-3xl rounded-tr-3xl bg-[#B0A462] border-2 border-solid border-[#FEF4C9]'
              style={{
                fontSize: 16,
                fontFamily: 'Myriad Pro',
                width: '100%',
              }}
            />
            <View className='absolute left-3'>
              <MaterialIcons
                name='search'
                size={32}
                color='white'
              />
            </View>
            {search !== '' && (
              <TouchableOpacity
                onPress={clearSearch}
                className='absolute right-3'>
                <MaterialIcons
                  name='close'
                  size={24}
                  color='white'
                />
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
        <View className='flex flex-row w-full'>
          <View className='flex flex-row w-full flex-wrap mb-20'>
            {searchedClasses &&
              Array.from({length: 3}).map((_, outerIndex) =>
                searchedClasses.map((item: any, index: number) => {
                  return (
                    <View
                      className='flex flex-col items-left w-[50%] px-2 py-4'
                      key={`${outerIndex}-${index}`}>
                      <Image
                        className='rounded-lg'
                        style={{height: 150, width: '100%'}}
                        source={{
                          uri: item.imagen,
                        }}
                        resizeMode='cover'
                      />
                      <ThemedText
                        type='subtitle'
                        className='w-full font-MyriadPro'>
                        {item.titulo}
                      </ThemedText>
                      <View className='flex flex-row w-full'>
                        <Text
                          className='inline-flex '
                          style={{color: colorNivel(item.nivel)}}>
                          {TextNivel(item.nivel)}
                        </Text>
                        <Text className='inline-flex ml-2 text-white'>
                          {item.time}
                        </Text>
                      </View>
                    </View>
                  )
                }),
              )}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1D1D1B',
    color: '#ffffff',
    paddingLeft: 16,
    paddingRight: 16,
    position: 'absolute',
    height: '100%',
    paddingTop: 64,
  },
  back: {
    height: 35,
    width: 40,
  },
  search: {
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 0,
  },
  grid: {
    gridTemplateColumns: '2',
  },
})
