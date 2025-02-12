import {useState, useEffect} from 'react'
import GenericCard from './CarouselCardInfo'
import Card04 from '@/app/(tabs)/Carousel/Card04'

// Tipos
interface CardData {
  id: string
  title: string
  image: string | (() => any) // Mantenemos el tipo original
  content: React.ReactNode
}

interface ApiResponse {
  titulo: string
  texto: string
  imagen: string
}

export default function useCarouselData() {
  const [carouselData, setCarouselData] = useState<CardData[]>([])
  const [isLoading, setIsLoading] = useState(true) // Estado para controlar la carga

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener datos de la API
        const response = await fetch('https://gympromanager.com/app-ads.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'token=Contraseña...',
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data: ApiResponse[] = await response.json()

        const mappedData: CardData[] = data.slice(0, 3).map((item, index) => ({
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

        // Añadir la Card04 original
        mappedData.push({
          id: '4',
          title: 'Title 4',
          image: require('@/assets/images/onboarding-04.jpg'), // Ruta local con require
          content: <Card04 />,
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
