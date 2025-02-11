import Carousel from './Carousel/Carousel'
import BottomTabs from './Bottomnav'
import {useSession} from '@/hooks/SessionContext'
export default function HomeScreen() {
  const {user: activeSession} = useSession()
  if (!activeSession) {
    return <Carousel></Carousel>
  }
  return <BottomTabs></BottomTabs>
}
