import React, {useState, useRef} from 'react'
import {View, Text, Button, Image, ScrollView} from 'react-native'
import PhoneInput from 'react-native-phone-number-input'
import Step1 from './Registro/Paso1'
import Step2 from './Registro/Paso2'
import Step3 from './Registro/Paso3'
import Step4 from './Registro/Paso4'
import StepProgress from './Registro/StepProgress'
import CustomButton from '@/components/ui/Button2'
interface FormData {
  // Step 1
  nombre: string
  apellidos: string
  nif: string
  domicilio: string
  telefono: string
  email: string
  password: string
  // Step 2
  fechaNacimiento: string
  genero: string
  // Step 3
  ocupacion: string
  nivelEducativo: string
  // Step 4
  intereses: string
  objetivos: string
}

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    apellidos: '',
    nif: '',
    domicilio: '',
    telefono: '',
    email: '',
    password: '',
    fechaNacimiento: '',
    genero: '',
    ocupacion: '',
    nivelEducativo: '',
    intereses: '',
    objetivos: '',
  })

  const phoneInput = useRef<PhoneInput>(null)

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prevData) => ({...prevData, ...newData}))
  }

  const validateStep = () => {
    switch (step) {
      case 1:
        return (
          formData.nombre &&
          formData.apellidos &&
          formData.nif &&
          formData.domicilio &&
          phoneInput.current?.isValidNumber(formData.telefono) &&
          formData.email &&
          formData.password
        )
      case 2:
        return formData.fechaNacimiento && formData.genero
      case 3:
        return formData.ocupacion && formData.nivelEducativo
      case 4:
        return formData.intereses && formData.objetivos
      default:
        return false
    }
  }

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    alert('Form submitted:' + '\n' + JSON.stringify(formData))
  }

  const steps = [
    {number: 1, label: 'Datos Personales'},
    {number: 2, label: 'Información Básica'},
    {number: 3, label: 'Perfil'},
    {number: 4, label: 'Preferencias'},
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
            />
          )}
          <View className='flex flex-row justify-center mt-6 mb-6'>
            <CustomButton
              title={step === 4 ? 'Enviar' : 'Siguiente'}
              onPress={handleNext}
              // disabled={validateStep()}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default MultiStepForm
