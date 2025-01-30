import {TouchableOpacity} from 'react-native'
import {Settingsicon} from '@/components/ui/Bottomnav/Icons'
import {useNavigation} from '@react-navigation/native'

const Settingsbutton = () => {
  const navigation = useNavigation()

  const handlePress = () => {
    navigation.navigate('Settings' as never)
  }

  return (
    <TouchableOpacity
      className='flex items-center justify-center h-12 w-12 p-2 rounded-xl'
      onPress={handlePress}>
      <Settingsicon size={22} />
    </TouchableOpacity>
  )
}

export default Settingsbutton
