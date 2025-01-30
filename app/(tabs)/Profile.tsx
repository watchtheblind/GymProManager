import React, {useState} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native'
import {Portrait} from '@/components/ui/Bottomnav/Icons'
import Activity from '../../components/ProfileTabs/Activity'
import Progress from '../../components/ProfileTabs/Progress'
import Tabs from '@/components/Tabs'

export default function Profile() {
  const [activeTab, setActiveTab] = useState('progress')

  // Define las pestañas
  const tabs = [
    {id: 'progress', label: 'Mi progreso'},
    {id: 'activity', label: 'Mi actividad'},
  ]

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Contenedor para la imagen de perfil y nombre */}
          <View style={styles.profileWrapper}>
            <View style={styles.portraitContainer}>
              <Portrait size={330} />
            </View>
            <View style={styles.profileContainer}>
              <Image
                source={require('@/assets/mbappe.png')}
                style={styles.profileImage}
              />
              <Text style={styles.profileName}>javier camacaro</Text>
            </View>
          </View>

          {/* Usa el componente Tabs */}
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabPress={setActiveTab}
          />

          {/* Contenido condicional */}
          <View style={styles.contentContainer}>
            {activeTab === 'progress' ? <Progress /> : <Activity />}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingVertical: 90,
  },
  profileWrapper: {
    height: 200,
    width: '100%',
    position: 'relative',
    marginBottom: 20,
  },
  portraitContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  profileContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 65,
    backgroundColor: '#333',
  },
  profileName: {
    color: 'white',
    fontFamily: 'Copperplate',
    fontSize: 20,
    marginTop: 16,
    textTransform: 'uppercase',
  },
  contentContainer: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
})
