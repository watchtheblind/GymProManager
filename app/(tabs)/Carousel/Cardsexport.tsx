import {useState, useEffect} from 'react'
import GenericCard from './CarouselCardInfo'
import Card04 from '@/app/(tabs)/Carousel/Card04'
import {fetchAds, fetchSubscriptions} from '@/hooks/Data/Endpoints'

// Tipos
interface CardData {
  id: string
  title: string
  image: string | (() => any) // Mantenemos el tipo original
  content: React.ReactNode
}

export default function useCarouselData() {
  const [carouselData, setCarouselData] = useState<CardData[]>([])
  const [isLoading, setIsLoading] = useState(true) // Estado para controlar la carga

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener datos de los anuncios
        const adsResponse = await fetchAds('Contraseña...')
        console.log('Ads Response:', JSON.stringify(adsResponse)) // Depuración

        // Validar que adsResponse sea un array
        if (!Array.isArray(adsResponse)) {
          console.error('Invalid adsResponse:', adsResponse)
          return
        }

        // Asignar los datos directamente (sin acceder a una clave `data`)
        const adsData = adsResponse

        // Obtener datos de las suscripciones
        const subscriptionsResponse = await fetchSubscriptions('Contraseña...')
        const subscriptionsData = subscriptionsResponse.data

        // Mapear los datos de los anuncios a CardData
        const mappedData: CardData[] = adsData
          .slice(0, 3)
          .map((item, index) => ({
            id: (index + 1).toString(),
            title: item.titulo,
            image: item.imagen, // Mantenemos item.imagen tal cual
            content: (
              <GenericCard
                key={index}
                titulo={item.titulo}
                texto={item.texto}
                imagen={item.imagen}
                titleSize={index === 1 ? 4 : 3} // Personalizamos el tamaño del título
                polygonTopPosition={index === 2 ? 14 : 0} // Personalizamos la posición de la imagen
              />
            ),
          }))

        // Añadir la Card04 con los datos de las suscripciones
        mappedData.push({
          id: '4',
          title: 'Title 4',
          image: require('@/assets/images/onboarding-04.jpg'), // Ruta local con require
          content: <Card04 subscriptions={subscriptionsData} />, // Pasamos las suscripciones como prop
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

  return {carouselData, isLoading} // Devolver tanto los datos como el estado de carga
}
