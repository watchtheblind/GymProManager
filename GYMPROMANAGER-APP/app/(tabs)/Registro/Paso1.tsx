import React from 'react'
import {View, TextInput, Text} from 'react-native'

import PhoneInput, {PhoneInputProps} from 'react-native-phone-number-input'

// Custom type that extends PhoneInputProps
type CustomPhoneInputProps = PhoneInputProps & {
  translation?: {
    search: string
    searchPlaceholder: string
    countryPlaceholder: string
    selectCountry: string
  }
}
interface Step1Props {
  formData: {
    nombre: string
    apellidos: string
    nif: string
    domicilio: string
    telefono: string
    email: string
    password: string
  }
  setFormData: (newData: Partial<Step1Props['formData']>) => void
  phoneInput: React.RefObject<PhoneInput>
}

const Step1: React.FC<Step1Props> = ({formData, setFormData, phoneInput}) => {
  const handlePhoneChange = (phoneNumber: string) => {
    setFormData({telefono: phoneNumber})
  }

  return (
    <View className='w-full flex flex-col gap-5 mt-6'>
      <TextInput
        className='bg-[#B0A462] border-4 py-3 border-[#FEF4C9] rounded-tr-3xl rounded-bl-3xl p-2 text-white w-full'
        placeholder='Nombre*'
        onChangeText={(text) => setFormData({nombre: text})}
        value={formData.nombre}
        placeholderTextColor='#fff'
      />
      <TextInput
        className='bg-[#6CB0B4] border-4 py-3 border-[#518893] rounded-tl-3xl rounded-br-3xl p-2 text-white w-full'
        placeholder='Apellidos*'
        onChangeText={(text) => setFormData({apellidos: text})}
        value={formData.apellidos}
        placeholderTextColor='#fff'
      />
      <TextInput
        className='bg-[#CC7751] border-4 py-3 border-[#DFAA8C] rounded-tr-3xl rounded-bl-3xl p-2 text-white w-full'
        placeholder='NIF/CUI/RUT/CI/CC/CURP'
        onChangeText={(text) => setFormData({nif: text})}
        value={formData.nif}
        placeholderTextColor='#fff'
      />
      <TextInput
        className='bg-[#B0A462] border-4 py-3 border-[#FEF4C9] rounded-tl-3xl rounded-br-3xl p-2 text-white w-full'
        placeholder='Domicilio/Dirección'
        onChangeText={(text) => setFormData({domicilio: text})}
        value={formData.domicilio}
        placeholderTextColor='#fff'
      />
      <PhoneInput
        ref={phoneInput}
        defaultValue={formData.telefono}
        defaultCode='ES'
        layout='first'
        onChangeFormattedText={handlePhoneChange}
        withDarkTheme
        withShadow
        containerStyle={{
          width: '100%',
          backgroundColor: 'transparent',
        }}
        textContainerStyle={{
          borderTopRightRadius: 20,
          borderBottomLeftRadius: 20,
          backgroundColor: '#CC7751',
          borderWidth: 4,
          borderColor: '#DFAA8C',
        }}
        textInputStyle={{color: '#ffff'}}
        codeTextStyle={{color: '#fff'}}
        countryPickerButtonStyle={{
          backgroundColor: '#CC7751',
          borderTopLeftRadius: 20,
          marginRight: 10,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          borderWidth: 4,
          borderColor: '#DFAA8C',
        }}
        placeholder='Número de teléfono'
        {...({
          translation: {
            search: 'Buscar',
            searchPlaceholder: 'Buscar país',
            countryPlaceholder: 'Seleccionar país',
            selectCountry: 'Seleccionar país',
          },
        } as CustomPhoneInputProps)}
      />
      <TextInput
        className='bg-[#B0A462] border-4 py-3 border-[#FEF4C9] rounded-tl-3xl rounded-br-3xl p-2 text-white w-full'
        placeholder='Email'
        onChangeText={(text) => setFormData({email: text})}
        value={formData.email}
        placeholderTextColor='#fff'
      />
      <TextInput
        className='bg-[#6CB0B4] border-4 py-3 border-[#518893] rounded-tl-3xl rounded-br-3xl p-2 text-white w-full'
        placeholder='Contraseña'
        onChangeText={(text) => setFormData({password: text})}
        secureTextEntry={true}
        value={formData.password}
        placeholderTextColor='#fff'
      />
    </View>
  )
}

export default Step1
