import {useState, useEffect} from 'react'
import Card01 from './Card01'
import Card02 from '@/app/(tabs)/Carousel/Card02'
import Card03 from '@/app/(tabs)/Carousel/Card03'
import Card04 from '@/app/(tabs)/Carousel/Card04'
import React from 'react'

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

const CardComponents = [Card01, Card02, Card03]

export default function useCarouselData() {
  const [carouselData, setCarouselData] = useState<CardData[]>([])
  const [isLoading, setIsLoading] = useState(true) // Estado para controlar la carga

  useEffect(() => {
    const fetchData = async () => {
      try {
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

        // Mapea los datos de la API a CardData
        const mappedData: CardData[] = data.slice(0, 3).map((item, index) => ({
          id: (index + 1).toString(),
          title: item.titulo,
          image: item.imagen, // Mantenemos item.imagen tal cual
          content: React.createElement(CardComponents[index], {
            titulo: item.titulo,
            texto: item.texto,
            imagen: item.imagen, // Pasamos item.imagen directamente
          }),
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
