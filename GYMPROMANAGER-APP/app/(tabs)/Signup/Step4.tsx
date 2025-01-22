import React, {useState} from 'react'
import {
  View,
  useWindowDimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'

interface Step4Props {
  onPlanSelected: (plan: Plan | null) => void
  formData: {
    selectedPlan: {
      id: number
      description: string
      price: number
    } | null
  }
  setFormData: (newData: Partial<Step4Props['formData']>) => void
}

interface Plan {
  id: number
  description: string
  color: string
  borderColor: string
  borderRadius: string
  price: number
  icon: keyof typeof MaterialCommunityIcons.glyphMap
  paymentUrl: string
}

const plans: Plan[] = [
  {
    id: 1,
    description: 'SUSCRIPCION A',
    color: 'bg-[#CC7751]',
    borderColor: 'border-[#DFAA8C]',
    borderRadius: 'rounded-tr-3xl rounded-bl-3xl border-4',
    price: 499,
    icon: 'trophy',
    paymentUrl: 'https://example.com/bronze-payment',
  },
  {
    id: 2,
    description: 'SUSCRIPCION B',
    color: 'bg-[#518893]',
    borderColor: 'border-[#6CB0B4]',
    borderRadius: 'rounded-tl-3xl rounded-br-3xl border-4',
    price: 99,
    icon: 'medal',
    paymentUrl: 'https://example.com/silver-payment',
  },
  {
    id: 3,
    description: 'SUSCRIPCION C',
    color: 'bg-[#B0A462]',
    borderColor: 'border-[#FEF4C9]',
    borderRadius: 'rounded-tr-3xl rounded-bl-3xl border-4',
    price: 50,
    icon: 'star',
    paymentUrl: 'https://example.com/gold-payment',
  },
]

export default function Step4({onPlanSelected, setFormData}: Step4Props) {
  const {width} = useWindowDimensions()
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)

  const handlePlanSelection = async (plan: Plan) => {
    setSelectedPlan(plan)
    onPlanSelected(plan)

    // Open payment URL
    const supported = await Linking.canOpenURL(plan.paymentUrl)
    if (supported) {
      await Linking.openURL(plan.paymentUrl)
    } else {
      console.error(`Don't know how to open URL: ${plan.paymentUrl}`)
    }
  }

  const handleSubmit = () => {
    if (selectedPlan) {
      setFormData({selectedPlan})
      alert('Formulario enviado con éxito')
    } else {
      alert('Por favor, completa todos los campos requeridos.')
    }
  }

  return (
    <View style={{width, flex: 1}}>
      <View className='flex flex-row justify-center mt-6'>
        <Text className='font-Copperplate text-3xl text-white'>
          ELIGE TU PLAN
        </Text>
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
          {plans.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handlePlanSelection(item)}
              activeOpacity={0.7}
              className={`p-2 w-80 h-40 items-center mb-4 ${
                selectedPlan?.id === item.id
                  ? 'bg-opacity-60 ' + item.color
                  : item.color
              } border-2 ${
                selectedPlan?.id === item.id
                  ? 'border-white border-4 '
                  : item.borderColor
              } ${item.borderRadius}`}>
              <MaterialCommunityIcons
                name={item.icon}
                size={40}
                color='#fff'
                className='mb-4'
              />
              <Text className='text-xl font-Copperplate text-white text-center mb-2'>
                {item.description}
              </Text>
              <Text className='text-2xl font-Copperplate text-white'>
                {item.price === 0 ? 'Gratis' : item.price + ' €/mes'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  selectedPlan: {
    transform: [{scale: 1.05}], // Aumentar el tamaño del plan seleccionado
  },
})
