import React, {useState} from 'react'
import {View, Text, Button, Image} from 'react-native'
import Step1 from './Registro/Paso1'
import Step2 from './Registro/Paso2'
import Step3 from './Registro/Paso3'
import Step4 from './Registro/Paso4'

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
          formData.telefono &&
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
    // Here you would typically send the formData to your backend
    alert('Form submitted:' + JSON.stringify(formData))
  }

  return (
    <View className='flex-1 justify-center h-full text-white relative'>
      <View className='flex-1 justify-center items-center absolute inset-0 w-full h-full opacity-70'>
        <Image
          className='mt-24 h-80 w-104'
          source={require('@/assets/images/logo.png')}
        />
      </View>
      <View className='absolute inset-0 bg-[#1D1D1B] opacity-90'></View>
      <View className='flex flex-col items-center'>
        <Text className='text-white text-3xl font-Copperplate'>REGISTRO</Text>
        <Text className='text-white text-xl mt-2'>Paso {step} de 4</Text>
        {step === 1 && (
          <Step1
            formData={formData}
            setFormData={updateFormData}
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
        <View className='flex flex-row justify-center mt-6'>
          <Button
            title={step === 4 ? 'Enviar' : 'Siguiente'}
            onPress={handleNext}
            disabled={!validateStep()}
          />
        </View>
      </View>
    </View>
  )
}

export default MultiStepForm
