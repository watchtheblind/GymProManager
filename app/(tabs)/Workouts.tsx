import React, {useState} from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native'
import SearchBar from '@/components/ui/SearchBar'

const workouts = [
  {
    id: '1',
    title: 'Entrenamiento',
    level: 'Experto',
    duration: '32 min',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qdzaZ77Mm0lXCyfRzLa1i3zJOTnuDH.png',
  },
  {
    id: '2',
    title: 'Boxeo',
    level: 'Intermedio',
    duration: '32 min',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qdzaZ77Mm0lXCyfRzLa1i3zJOTnuDH.png',
  },
  {
    id: '3',
    title: 'HIIT',
    level: 'Principiante',
    duration: '32 min',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qdzaZ77Mm0lXCyfRzLa1i3zJOTnuDH.png',
  },
  {
    id: '4',
    title: 'Entrenamiento',
    level: 'Experto',
    duration: '32 min',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qdzaZ77Mm0lXCyfRzLa1i3zJOTnuDH.png',
  },
]

export default function WorkoutList() {
  const [activeTab, setActiveTab] = useState('listado')
  const [showFavorites, setShowFavorites] = useState(false)

  const searchClass = (text: string) => {
    console.log('Searching:', text)
  }

  const clearSearch = () => {
    console.log('Clear search')
  }

  type Workout = {
    id: string
    title: string
    level: string
    duration: string
    image: string
  }

  const WorkoutCard = ({workout}: {workout: Workout}) => (
    <View className='relative w-[48%] aspect-square mb-4 rounded-xl overflow-hidden'>
      <Image
        source={{uri: workout.image}}
        className='absolute w-full h-full'
        resizeMode='cover'
      />
      <View className='absolute top-0 left-0'>
        <View className='bg-[#B5AD6F] px-2 py-1 rounded-br-xl'>
          <Text className='text-white text-xs'>{workout.level}</Text>
        </View>
      </View>
      <View className='absolute bottom-0 left-0 p-2'>
        <Text className='text-white font-bold'>{workout.title}</Text>
        <Text className='text-white text-xs'>{workout.duration}</Text>
      </View>
    </View>
  )

  return (
    <SafeAreaView className='flex-1 bg-[#1A1A1A]'>
      <View className='px-4 pt-4'>
        <View className='flex-row items-center mb-4'>
          <TouchableOpacity onPress={() => console.log('Back')}>
            <Text className='text-white text-2xl'>←</Text>
          </TouchableOpacity>
          <Text className='text-white text-xl font-bold ml-4'>
            Listado de entrenamientos
          </Text>
        </View>

        <View className='flex-row bg-[#333333] rounded-full mb-4'>
          <TouchableOpacity
            onPress={() => setActiveTab('listado')}
            className={`flex-1 py-2 px-4 rounded-full ${activeTab === 'listado' ? 'bg-[#B5AD6F]' : ''}`}>
            <Text
              className={`text-center ${activeTab === 'listado' ? 'text-white' : 'text-gray-400'}`}>
              Listado
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('mis-entrenamientos')}
            className={`flex-1 py-2 px-4 rounded-full ${activeTab === 'mis-entrenamientos' ? 'bg-[#B5AD6F]' : ''}`}>
            <Text
              className={`text-center ${activeTab === 'mis-entrenamientos' ? 'text-white' : 'text-gray-400'}`}>
              Mis entrenamientos
            </Text>
          </TouchableOpacity>
        </View>

        <View className='mb-4'>
          <SearchBar
            onSearch={searchClass}
            onClear={clearSearch}
          />
        </View>

        <View className='flex-row items-center mb-4'>
          <Text className='text-white mr-2'>Ver solo mis favoritos</Text>
          <TouchableOpacity
            onPress={() => setShowFavorites(!showFavorites)}
            className={`w-12 h-6 rounded-full ${showFavorites ? 'bg-[#B5AD6F]' : 'bg-gray-600'}`}>
            <View
              className={`w-5 h-5 rounded-full bg-white mt-0.5 ${showFavorites ? 'ml-6' : 'ml-1'}`}
            />
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View className='flex-row flex-wrap justify-between'>
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
