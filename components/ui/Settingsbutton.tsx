import {TouchableOpacity} from 'react-native'
import {Settingsicon} from '@/components/ui/Bottomnav/Icons'
import Animated, {FadeInDown} from 'react-native-reanimated'

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity)

const Settingsbutton = () => {
  return (
    <TouchableOpacity className='flex items-center justify-center h-12 w-12 p-2 rounded-xl '>
      <Settingsicon size={22} />
    </TouchableOpacity>
  )
}

export default Settingsbutton
