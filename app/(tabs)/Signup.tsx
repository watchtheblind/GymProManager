import type React from 'react'
import {useState, useRef} from 'react'
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native'
import type PhoneInput from 'react-native-phone-number-input'
import Step1 from './Signup/Step1'
import Step2 from './Signup/Step2'
import Step3 from './Signup/Step3'
import Step4 from './Signup/Step4'
import StepProgress from './Signup/StepProgress'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

interface Unit {
  value: number
  unit: 'kg' | 'lb'
}

interface Gender {
  value: 'masculino' | 'femenino' | 'neutral'
}
interface FormData {
  // Step 1
  firstName: string
  lastName: string
  idNumber: string
  address: string
  phone: string
  email: string
  password: string
  // Step 2
  birthDate: string
  gender?: Gender
  weight: Unit
  height: {value: number; unit: 'cm' | 'pulg'}
  // Step 3
  profilePicture: string
  // Step 4
  selectedPlan: {
    id: number
    description: string
    price: number
  } | null
  paymentValidated: boolean
}

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    idNumber: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    birthDate: '',
    profilePicture: '',
    gender: undefined,
    weight: {value: 0, unit: 'kg'},
    height: {value: 0, unit: 'cm'},
    selectedPlan: null,
    paymentValidated: false,
  })

  const phoneInput = useRef<PhoneInput>(null)

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prevData) => ({...prevData, ...newData}))
  }
  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = () => {
    alert('Form submitted:' + '\n' + JSON.stringify(formData))
  }

  const handlePlanSelected = (plan: FormData['selectedPlan']) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedPlan: plan,
      paymentValidated: false, // Reset payment validation when a new plan is selected
    }))
  }
  const validateStep = () => {
    switch (step) {
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.idNumber &&
          formData.address &&
          phoneInput.current?.isValidNumber(formData.phone) &&
          formData.email &&
          formData.password
        )
      case 2:
        return (
          formData.birthDate &&
          formData.gender &&
          formData.weight &&
          formData.height
        )
      case 3:
        return formData.profilePicture
      case 4:
        return formData.selectedPlan
      default:
        return false
    }
  }

  const steps = [
    {number: 1, label: 'Datos Personales'},
    {number: 2, label: 'Información Básica'},
    {number: 3, label: 'Perfil'},
    {number: 4, label: 'Membresía'},
  ]

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View className='flex-1 justify-center h-full text-white relative'>
        <View className='flex-1 justify-center items-center absolute inset-0 w-full h-full opacity-70'>
          <Image
            className='mt-24 h-80 w-full'
            source={require('@/assets/images/logo.png')}
          />
        </View>
        <View className='absolute inset-0 bg-[#1D1D1B] opacity-90'></View>
        <View className='flex flex-col items-center px-4'>
          <Text className='text-white text-3xl font-Copperplate my-8'>
            REGISTRO
          </Text>
          <StepProgress
            currentStep={step}
            steps={steps}
          />
          {step === 1 && (
            <Step1
              formData={formData}
              setFormData={updateFormData}
              phoneInput={phoneInput}
            />
          )}
          {step === 2 && (
            <Step2
              formData={formData}
              setFormData={updateFormData}
            />
          )}
          {step === 3 && (
            <Step3
              formData={formData}
              setFormData={updateFormData}
            />
          )}
          {step === 4 && (
            <Step4
              formData={formData}
              setFormData={updateFormData}
              onPlanSelected={handlePlanSelected} // Pasar la función para manejar la selección del plan
            />
          )}
          <View className='flex flex-row justify-center mt-6 mb-6 space-x-4'>
            {step > 1 && (
              <TouchableOpacity
                onPress={handleBack}
                className='bg-gray-500 p-3 rounded-full'>
                <MaterialIcons
                  name='arrow-back'
                  size={24}
                  color='white'
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={handleNext}
              className={`p-3 rounded-full ${
                !validateStep() ? 'bg-gray-400' : 'bg-blue-500' // Cambia el color si está deshabilitado
              }`}
              disabled={!validateStep()}>
              <MaterialIcons
                name={step === 4 ? 'check' : 'arrow-forward'}
                size={24}
                color='white'
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default MultiStepForm
