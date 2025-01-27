import React from 'react'
import {View, TextInput, Text} from 'react-native'
import Checkbox from 'expo-checkbox'
import {useState} from 'react'
import PhoneInput, {PhoneInputProps} from 'react-native-phone-number-input'

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
    firstName: string
    lastName: string
    idNumber: string
    address: string
    phone: string
    email: string
    password: string
  }
  setFormData: (newData: Partial<Step1Props['formData']>) => void
  phoneInput: React.RefObject<PhoneInput>
}

const Step1: React.FC<Step1Props> = ({formData, setFormData, phoneInput}) => {
  const handlePhoneChange = (phoneNumber: string) => {
    setFormData({phone: phoneNumber})
  }
  const [isChecked, setChecked] = useState(false)
  return (
    <View className='flex flex-col items-center w-11/12 gap-5 mt-6'>
      <TextInput
        className='bg-[#B0A462] border-4 py-3 border-[#FEF4C9] rounded-tr-3xl rounded-bl-3xl p-2 text-white w-full'
        style={[{fontFamily: 'MyriadPro'}]}
        placeholder='Nombre'
        onChangeText={(text) => setFormData({firstName: text})}
        value={formData.firstName}
        placeholderTextColor='#fff'
      />
      <TextInput
        className='bg-[#6CB0B4] border-4 py-3 border-[#518893] rounded-tl-3xl rounded-br-3xl p-2 text-white w-full'
        style={[{fontFamily: 'MyriadPro'}]}
        placeholder='Apellidos'
        onChangeText={(text) => setFormData({lastName: text})}
        value={formData.lastName}
        placeholderTextColor='#fff'
      />
      <TextInput
        className='bg-[#CC7751] border-4 py-3 border-[#DFAA8C] rounded-tr-3xl rounded-bl-3xl p-2 text-white w-full'
        style={[{fontFamily: 'MyriadPro'}]}
        placeholder='NIF/CUI/RUT/CI/CC/CURP'
        onChangeText={(text) => setFormData({idNumber: text})}
        value={formData.idNumber}
        placeholderTextColor='#fff'
      />
      <TextInput
        className='bg-[#B0A462] border-4 py-3 border-[#FEF4C9] rounded-tl-3xl rounded-br-3xl p-2 text-white w-full'
        style={[{fontFamily: 'MyriadPro'}]}
        placeholder='Domicilio/Dirección'
        onChangeText={(text) => setFormData({address: text})}
        value={formData.address}
        placeholderTextColor='#fff'
      />
      <PhoneInput
        ref={phoneInput}
        defaultValue={formData.phone}
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
          paddingBlock: 0,
          borderWidth: 4,
          borderColor: '#DFAA8C',
        }}
        textInputStyle={{color: '#ffff', fontSize: 16, fontFamily: 'MyriadPro'}}
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
        style={[{fontFamily: 'MyriadPro'}]}
        placeholder='Email'
        onChangeText={(text) => setFormData({email: text})}
        value={formData.email}
        placeholderTextColor='#fff'
      />
      <TextInput
        className='bg-[#6CB0B4] border-4 py-3 border-[#518893] rounded-tl-3xl rounded-br-3xl p-2 text-white w-full'
        placeholder='Contraseña'
        style={[{fontFamily: 'MyriadPro'}]}
        onChangeText={(text) => setFormData({password: text})}
        value={formData.password}
        placeholderTextColor='#fff'
      />
      <View className='flex flex-row w-11/12'>
        <Text className='text-white text-sm text-center mb-3'>
          Al registrarme acepto recibir comunicaciones de Trainingym, así como
          su Política de Privacidad.
        </Text>
      </View>
    </View>
  )
}

export default Step1
