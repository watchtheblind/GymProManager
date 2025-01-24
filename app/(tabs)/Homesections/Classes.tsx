import React, {useEffect, useState} from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import {router, Stack} from 'expo-router'
import {useFetchAPI} from '@/hooks/useFetchAPI'
import {ThemedText} from '@/components/ThemedText'

export default function Classes() {
  const [search, setSearch] = useState('')
  const {data, loading, error} = useFetchAPI('/clases', {})
  const [searchedClasess, setSearchedClasses] = useState<any[]>()

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
    const validationSource = data.filter((item: any) => item.titulo)
    const filteredClasess = validationSource.filter((item: any) => {
      return item.titulo.toLowerCase().includes(text.toLowerCase())
    })
    setSearchedClasses(filteredClasess)
  }
  const debounceSearchClass = debounce(searchClass, setSearchTextAlways, 1000)

  useEffect(() => {
    setSearchedClasses(data)
  }, [data])

  useEffect(() => {
    return () => {
      clearTimeout(timeout)
    }
  }, [])

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
        <View className='flex flex-row items-center'>
          <Text className=' text-white text-xl font-Copperplate'>
            CLASES VIRTUALES
          </Text>
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
              onChangeText={debounceSearchClass}
              className='pl-12 py-2  rounded-bl-3xl rounded-tr-3xl bg-[#B0A462] border-2 border-solid border-[#FEF4C9]'
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
          </View>
        </KeyboardAvoidingView>
        <View className='flex flex-row w-full'>
          <View className='flex flex-row w-full flex-wrap'>
            {searchedClasess &&
              searchedClasess.map((item: any, index: number) => {
                return (
                  <View
                    className='flex flex-col items-left w-[50%] px-2 py-4'
                    key={index.toString()}>
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
                      className='w-full'>
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
              })}
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
