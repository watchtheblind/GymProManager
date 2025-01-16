import Vistacarrusel1 from './Vistacarrusel1'
import Vistacarrusel2 from '@/app/(tabs)/Carrusel/Vistacarrusel2'
import Vistacarrusel3 from '@/app/(tabs)/Carrusel/Vistacarrusel3'
import Vistacarrusel4 from '@/app/(tabs)/Carrusel/Vistacarrusel4'

export default [
  {
    id: '1',
    title: 'Title 1',
    image: require('@/assets/images/onboarding-01.jpeg'),
    content: <Vistacarrusel1 />,
  },
  {
    id: '2',
    title: 'Title 2',
    image: require('@/assets/images/onboarding-02.jpeg'),
    content: <Vistacarrusel2 />,
  },
  {
    id: '3',
    title: 'Title 3',
    image: require('@/assets/images/onboarding-03.jpeg'),
    content: <Vistacarrusel3 />,
  },
  {
    id: '4',
    title: 'Title 4',
    image: require('@/assets/images/onboarding-04.jpg'),
    content: <Vistacarrusel4 />,
  },
]
