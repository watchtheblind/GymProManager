import React, {useState} from 'react'
import {
  View,
  useWindowDimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import ConfirmationModal from '@/components/common/ConfirmationModal'
import {SubscriptionProduct} from '@/hooks/Data/Endpoints' // Importamos el tipo de suscripción

interface SuscriptionsCardProps {
  subscriptions: SubscriptionProduct[] // Datos de las suscripciones
}

export default function SuscriptionsCard({
  subscriptions,
}: SuscriptionsCardProps) {
  const {width} = useWindowDimensions()
  const [selectedSubscription, setSelectedSubscription] =
    useState<SubscriptionProduct | null>(null)
  const [showAlert, setShowAlert] = useState(false)

  const handleSubscriptionPress = (subscription: SubscriptionProduct) => {
    setSelectedSubscription(subscription)
    setShowAlert(true)
  }

  const handleAccept = () => {
    if (selectedSubscription) {
      Linking.openURL(selectedSubscription.url)
    }
    setShowAlert(false)
  }

  const handleCloseAlert = () => {
    setShowAlert(false)
  }

  const translatePeriod = (period: string) => {
    switch (period) {
      case 'month':
        return 'mes'
      case 'year':
        return 'año'
      default:
        return period
    }
  }

  // Colores para cada plan
  const planColors = [
    {bg: 'bg-[#FF6B6B]', border: 'border-[#FF9F9F]'}, // Plan 1
    {bg: 'bg-[#4ECDC4]', border: 'border-[#88D8C0]'}, // Plan 2
    {bg: 'bg-[#FFD166]', border: 'border-[#FFE08C]'}, // Plan 3
    {bg: 'bg-[#A06CD5]', border: 'border-[#C4A1E0]'}, // Plan 4
    {bg: 'bg-[#45B69C]', border: 'border-[#6DD5C4]'}, // Plan 5
    {bg: 'bg-[#FF8B94]', border: 'border-[#FFB5B5]'}, // Plan 6
  ]

  return (
    <View style={{width, flex: 1}}>
      <View className='flex flex-row justify-center mt-6'>
        <Text className='font-Copperplate text-3xl text-white'>LA </Text>
        <Text className='font-Copperplate text-3xl text-[#DFAA8C]'>
          APLICACIÓN
        </Text>
      </View>
      <View className='flex flex-row justify-center'>
        <Text className='font-Copperplate text-3xl text-white'>QUE SE </Text>
        <Text className='font-Copperplate text-3xl text-[#6CB0B4]'>ADAPTA</Text>
        <Text className='font-Copperplate text-3xl text-[#B0A462]'> A TI</Text>
      </View>
      <View className='flex flex-col flex-1'>
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 20,
          }}
          className='mt-4 w-full'>
          {subscriptions.map((item, index) => (
            <TouchableOpacity
              key={item.nombre}
              onPress={() => handleSubscriptionPress(item)}
              className={`p-2 w-80 h-40 items-center mb-4 ${planColors[index % planColors.length].bg} border-2 ${planColors[index % planColors.length].border} rounded-tl-3xl rounded-br-3xl`}>
              <MaterialCommunityIcons
                name={'star' as keyof typeof MaterialCommunityIcons.glyphMap}
                size={40}
                color='#fff'
                className='mb-4'
              />
              <Text className='text-xl font-Copperplate text-white text-center mb-2'>
                {item.nombre}
              </Text>
              <Text className='text-2xl font-Copperplate text-white'>
                {item.precio} €/{translatePeriod(item.subscripcion.periodo)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ConfirmationModal
        visible={showAlert}
        title='Redirección'
        message='Será redirigido a nuestra página de pago, después podrá regresar y acceder a la plataforma'
        onAccept={handleAccept}
        onClose={handleCloseAlert}
      />
    </View>
  )
}
