import React from 'react'
import useBackHandler from '@/hooks/Common/useBackHandler'
import {useNavigation} from '@react-navigation/native'
import ConfirmationModal from '@/components/ui/ConfirmationModal'
import {useSession} from '@/hooks/SessionContext'

interface SessionCloseProps {
  isModalVisible: boolean
  onCloseModal: () => void
  onOpenModal: () => void
}

const SessionClose: React.FC<SessionCloseProps> = ({
  isModalVisible,
  onCloseModal,
  onOpenModal,
}) => {
  const navigation = useNavigation()
  const {logout} = useSession()

  const closeSession = async () => {
    await logout() // Cierra la sesión
    navigation.navigate('index' as never)
  }

  const handleDecline = () => {
    onCloseModal()
  }

  useBackHandler(() => {
    onOpenModal()
    return true
  })

  return (
    <ConfirmationModal
      visible={isModalVisible}
      title='Aviso'
      message='¿Desea cerrar sesión?'
      onAccept={closeSession}
      onClose={handleDecline}
    />
  )
}

export default SessionClose
