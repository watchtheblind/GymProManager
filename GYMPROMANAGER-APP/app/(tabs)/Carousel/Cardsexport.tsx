import Card01 from './Card01'
import Card02 from '@/app/(tabs)/Carousel/Card02'
import Card03 from '@/app/(tabs)/Carousel/Card03'
import Card04 from '@/app/(tabs)/Carousel/Card04'

export default [
  {
    id: '1',
    title: 'Title 1',
    image: require('@/assets/images/onboarding-01.jpeg'),
    content: <Card01 />,
  },
  {
    id: '2',
    title: 'Title 2',
    image: require('@/assets/images/onboarding-02.jpeg'),
    content: <Card02 />,
  },
  {
    id: '3',
    title: 'Title 3',
    image: require('@/assets/images/onboarding-03.jpeg'),
    content: <Card03 />,
  },
  {
    id: '4',
    title: 'Title 4',
    image: require('@/assets/images/onboarding-04.jpg'),
    content: <Card04 />,
  },
]
