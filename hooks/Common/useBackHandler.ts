import {useCallback, useEffect} from 'react'
import {BackHandler} from 'react-native'
import {useFocusEffect} from '@react-navigation/native'

/**
 * Hook personalizado para manejar el botón de retroceso en Android.
 * @param onBackPress - Función que se ejecutará cuando se presione el botón de retroceso.
 */
const useBackHandler = (onBackPress: () => boolean) => {
  useFocusEffect(
    useCallback(() => {
      // Agregar el listener para el botón de retroceso
      BackHandler.addEventListener('hardwareBackPress', onBackPress)

      // Limpiar el listener cuando el componente se desmonte
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }, [onBackPress]),
  )
}

export default useBackHandler
