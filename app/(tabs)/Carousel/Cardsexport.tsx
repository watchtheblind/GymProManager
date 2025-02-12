import {useState, useEffect, lazy, Suspense, memo, useMemo} from 'react'
import {fetchAds, fetchSubscriptions} from '@/hooks/Data/Endpoints'

// Carga diferida de componentes
const GenericCard = lazy(() => import('./CarouselCardInfo'))
const SuscriptionsCard = lazy(
  () => import('@/app/(tabs)/Carousel/SuscriptionsCard'),
)

// Tipos
interface CardData {
  id: string
  title: string
  image: string | (() => any) // Mantenemos el tipo original
  content: React.ReactNode
}

// Definir las props para MemoizedGenericCard
interface GenericCardProps {
  titulo: string
  texto: string
  imagen: string | any
  titleSize: number
  polygonTopPosition: number
}

// Definir las props para MemoizedSuscriptionsCard
interface SuscriptionsCardProps {
  subscriptions: any // Cambia `any` por el tipo correcto de tus suscripciones
}

// Componentes memoizados con tipado
const MemoizedGenericCard = memo(
  ({
    titulo,
    texto,
    imagen,
    titleSize,
    polygonTopPosition,
  }: GenericCardProps) => (
    <GenericCard
      titulo={titulo}
      texto={texto}
      imagen={imagen}
      titleSize={titleSize}
      polygonTopPosition={polygonTopPosition}
    />
  ),
)

const MemoizedSuscriptionsCard = memo(
  ({subscriptions}: SuscriptionsCardProps) => (
    <SuscriptionsCard subscriptions={subscriptions} />
  ),
)

export default function useCarouselData() {
  const [carouselData, setCarouselData] = useState<CardData[]>([])
  const [isLoading, setIsLoading] = useState(true) // Estado para controlar la carga

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Carga en paralelo de anuncios y suscripciones
        const [adsResponse, subscriptionsResponse] = await Promise.all([
          fetchAds('Contraseña...'),
          fetchSubscriptions('Contraseña...'),
        ])

        console.log('Ads Response:', JSON.stringify(adsResponse)) // Depuración

        // Validar que adsResponse sea un array
        if (!Array.isArray(adsResponse)) {
          console.error('Invalid adsResponse:', adsResponse)
          return
        }

        // Asignar los datos directamente (sin acceder a una clave `data`)
        const adsData = adsResponse
        const subscriptionsData = subscriptionsResponse.data

        // Mapear los datos de los anuncios a CardData
        const mappedData: CardData[] = adsData
          .slice(0, 3)
          .map((item, index) => ({
            id: (index + 1).toString(),
            title: item.titulo,
            image: item.imagen, // Mantenemos item.imagen tal cual
            content: (
              <MemoizedGenericCard
                key={index}
                titulo={item.titulo}
                texto={item.texto}
                imagen={item.imagen}
                titleSize={index === 1 ? 4 : 3} // Personalizamos el tamaño del título
                polygonTopPosition={index === 2 ? 14 : 0} // Personalizamos la posición de la imagen
              />
            ),
          }))

        // Añadir la SuscriptionsCard con los datos de las suscripciones
        mappedData.push({
          id: '4',
          title: 'Title 4',
          image: require('@/assets/images/onboarding-04.jpg'), // Ruta local con require
          content: (
            <MemoizedSuscriptionsCard subscriptions={subscriptionsData} />
          ), // Pasamos las suscripciones como prop
        })

        setCarouselData(mappedData)
      } catch (error) {
        console.error('Error fetching carousel data:', error)
      } finally {
        setIsLoading(false) // Marcar como cargado, incluso si hay un error
      }
    }

    fetchData()
  }, [])

  // Memoizar el valor de carouselData para evitar re-renderizados innecesarios
  const memoizedCarouselData = useMemo(() => carouselData, [carouselData])

  return {carouselData: memoizedCarouselData, isLoading} // Devolver tanto los datos como el estado de carga
}
