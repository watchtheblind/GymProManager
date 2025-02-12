import React, {useState, useCallback, useMemo} from 'react'
import {
  View,
  useWindowDimensions,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import ConfirmationModal from '@/components/common/ConfirmationModal'
import {SubscriptionProduct} from '@/hooks/Data/Endpoints' // Importamos el tipo de suscripción

interface subscriptionsCardProps {
  subscriptions: SubscriptionProduct[] // Datos de las suscripciones
}

const SubscriptionItem = React.memo(({item, index, onPress}: any) => {
  const planColors = [
    {bg: 'bg-[#FF6B6B]', border: 'border-[#FF9F9F]'}, // Plan 1
    {bg: 'bg-[#4ECDC4]', border: 'border-[#88D8C0]'}, // Plan 2
    {bg: 'bg-[#FFD166]', border: 'border-[#FFE08C]'}, // Plan 3
    {bg: 'bg-[#A06CD5]', border: 'border-[#C4A1E0]'}, // Plan 4
    {bg: 'bg-[#45B69C]', border: 'border-[#6DD5C4]'}, // Plan 5
    {bg: 'bg-[#FF8B94]', border: 'border-[#FFB5B5]'}, // Plan 6
  ]

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

  return (
    <TouchableOpacity
      key={item.nombre}
      onPress={onPress}
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
  )
})

export default function subscriptionsCard({
  subscriptions,
}: subscriptionsCardProps) {
  const {width} = useWindowDimensions()
  const [selectedSubscription, setSelectedSubscription] =
    useState<SubscriptionProduct | null>(null)
  const [showAlert, setShowAlert] = useState(false)

  const handleSubscriptionPress = useCallback(
    (subscription: SubscriptionProduct) => {
      setSelectedSubscription(subscription)
      setShowAlert(true)
    },
    [],
  )

  const handleAccept = useCallback(() => {
    if (selectedSubscription) {
      Linking.openURL(selectedSubscription.url)
    }
    setShowAlert(false)
  }, [selectedSubscription])

  const handleCloseAlert = useCallback(() => {
    setShowAlert(false)
  }, [])

  const renderItem = useCallback(
    ({item, index}: {item: SubscriptionProduct; index: number}) => (
      <SubscriptionItem
        item={item}
        index={index}
        onPress={() => handleSubscriptionPress(item)}
      />
    ),
    [handleSubscriptionPress],
  )

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          width,
          flex: 1,
        },
        headerContainer: {
          flexDirection: 'row',
          justifyContent: 'center',
        },
        headerText: {
          fontFamily: 'Copperplate',
          fontSize: 26,
          color: 'white',
        },
        headerTextAccent: {
          fontFamily: 'Copperplate',
          fontSize: 26,
          color: '#DFAA8C',
        },
        subHeaderText: {
          fontFamily: 'Copperplate',
          fontSize: 26,
          color: 'white',
        },
        subHeaderTextAccent1: {
          fontFamily: 'Copperplate',
          fontSize: 26,
          color: '#6CB0B4',
        },
        subHeaderTextAccent2: {
          fontFamily: 'Copperplate',
          fontSize: 26,
          color: '#B0A462',
        },
        scrollViewContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 0,
        },
      }),
    [width],
  )

  return (
    <View style={styles.container}>
      <View
        style={styles.headerContainer}
        className='mt-5'>
        <Text style={styles.headerText}>LA </Text>
        <Text style={styles.headerTextAccent}>APLICACIÓN</Text>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.subHeaderText}>QUE SE </Text>
        <Text style={styles.subHeaderTextAccent1}>ADAPTA</Text>
        <Text style={styles.subHeaderTextAccent2}> A TI</Text>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={subscriptions}
          renderItem={renderItem}
          keyExtractor={(item) => item.nombre}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.scrollViewContainer}
          className='mt-4 w-full'
        />
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
