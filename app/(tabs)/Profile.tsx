import React, {useState} from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native'
import {Portrait} from '@/components/ui/Bottomnav/Icons'
import Activity from './ProfileTabs/Activity'
import Progress from './ProfileTabs/Progress'
export default function Profile() {
  const [activeTab, setActiveTab] = useState('progress')

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

          {/* Tabs de navegación */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'progress' && styles.activeTab]}
              onPress={() => setActiveTab('progress')}>
              <Text
                style={
                  activeTab === 'progress'
                    ? styles.activeTabText
                    : styles.inactiveTabText
                }>
                Mi progreso
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'activity' && styles.activeTab]}
              onPress={() => setActiveTab('activity')}>
              <Text
                style={
                  activeTab === 'activity'
                    ? styles.activeTabText
                    : styles.inactiveTabText
                }>
                Mi actividad
              </Text>
            </TouchableOpacity>
          </View>

          {/* Contenido condicional */}
          <View style={styles.contentContainer}>
            {activeTab === 'progress' ? (
              <Progress></Progress>
            ) : (
              <Activity></Activity>
            )}
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
    justifyContent: 'flex-start', // Cambiado de "center" a "flex-start"
  },
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start', // Cambiado de "center" a "flex-start"
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
    width: 130,
    height: 130,
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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#333',
    borderRadius: 25,
    padding: 4,
    marginBottom: 10, // Reducido de 20 a 10
    width: '90%',
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#B5AD6F',
  },
  activeTabText: {
    color: 'white',
    fontSize: 14,
  },
  inactiveTabText: {
    color: '#888',
    fontSize: 14,
  },
  contentContainer: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'flex-start', // Cambiado de "center" a "flex-start"
    paddingTop: 10, // Añadido para dar un poco de espacio en la parte superior
  },
})
