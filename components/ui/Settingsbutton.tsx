import {TouchableOpacity} from 'react-native'
import {Settingsicon} from '@/components/ui/Bottomnav/Icons'
import Animated, {FadeInDown} from 'react-native-reanimated'

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity)

const Settingsbutton = () => {
  return (
    <AnimatedTouchableOpacity
      entering={FadeInDown.delay(300).duration(500)}
      className='flex items-center justify-center h-12 w-12 p-2 rounded-xl bg-[#518893]  border-4 border-[#6CB0B4]'>
      <Settingsicon size={22} />
    </AnimatedTouchableOpacity>
  )
}

export default Settingsbutton
