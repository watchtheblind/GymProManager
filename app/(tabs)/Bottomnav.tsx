import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {View, Text, StyleSheet, Platform} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {
  Dumbbellicon,
  Profileicon,
  Goalicon,
} from '@/components/ui/Bottomnav/Icons'
const Tab = createBottomTabNavigator()

// Placeholder screens
const MiCentroScreen = () => (
  <View style={styles.screen}>
    <Text className='text-white'>Mi Centros</Text>
  </View>
)

const HoyTienesScreen = () => (
  <View style={styles.screen}>
    <Text className='text-white'>Hoy Tienes</Text>
  </View>
)

const PerfilScreen = () => (
  <View style={styles.screen}>
    <Text className='text-white'>Perfil</Text>
  </View>
)

export default function BottomTabs() {
  return (
    <>
      <View style={styles.rotatedView}></View>
      <View style={styles.rotatedView}></View>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: '#ffff',
          tabBarInactiveTintColor: 'rgba(0, 0, 0, 0.5)',
          tabBarLabelStyle: styles.tabBarLabel,
          headerShown: false,
          tabBarShowLabel: true,
        }}>
        <Tab.Screen
          name='MiCentro'
          component={MiCentroScreen}
          options={{
            tabBarLabel: 'Mi centro',
            tabBarIcon: ({color, size}) => (
              <Dumbbellicon
                color={color} // Pasa el color activo/inactivo
                size={size} // Pasa el tamaño
              />
            ),
          }}
        />
        <Tab.Screen
          name='HoyTienes'
          component={HoyTienesScreen}
          options={{
            tabBarLabel: 'Hoy tienes',
            tabBarIcon: ({color, size}) => (
              <Goalicon
                color={color} // Pasa el color activo/inactivo
                size={size} // Pasa el tamaño
              />
            ),
          }}
        />
        <Tab.Screen
          name='Perfil'
          component={PerfilScreen}
          options={{
            tabBarLabel: 'Perfil',
            tabBarIcon: ({color, size}) => (
              <Profileicon
                color={color} // Pasa el color activo/inactivo
                size={size} // Pasa el tamaño
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D1D1B',
  },
  rotatedView: {
    position: 'absolute',
    width: '100%',
    borderStyle: 'solid',
    borderColor: 'blue',
    height: 80, // Ajusta la altura según sea necesario
    backgroundColor: '#B0A462',
    transform: [{rotate: '-2deg'}],
    bottom: -12, // Ajusta la posición vertical
    left: 2,
    right: 0,
    zIndex: 1, // Asegúrate de que esté por encima de otros componentes
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 85 : 60,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingTop: 0,
    elevation: 0,
    zIndex: 2,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
})
