import React, {useState} from 'react'
import {View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native'
import {Portrait} from '@/components/ui/Bottomnav/Icons'
import Activity from '../../components/ProfileTabs/Activity'
import Progress from '../../components/ProfileTabs/Progress'
import Tabs from '@/components/common/Tabs'
import Avatar from '@/components/common/Avatar'
import {useSession} from '@/hooks/SessionContext'
export default function Profile() {
  const {user} = useSession()
  const [activeTab, setActiveTab] = useState('progress')
  const [avatarUri, setAvatarUri] = useState<string | null>(
    user?.meta?.backend_imagen || null,
  )
  // Define las pestañas
  const tabs = [
    {id: 'progress', label: 'Mi progreso'},
    {id: 'activity', label: 'Mi actividad'},
  ]

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Contenedor para la imagen de perfil y nombre */}
          <View style={styles.profileWrapper}>
            <View style={styles.portraitContainer}>
              <Portrait size={330} />
            </View>
            <View style={styles.profileContainer}>
              <Avatar
                imageUrl={avatarUri || undefined}
                initials={user?.first_name?.[0]}
              />
              <Text style={styles.profileName}>{user?.meta.nickname}</Text>
            </View>
          </View>
          <View style={styles.profileContainer}>
            <Text style={styles.fullName}>
              {user?.meta.backend_nombre + ' ' + user?.meta.backend_apellido}
            </Text>
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
    paddingInline: 15,
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
    marginTop: -10,
    textTransform: 'uppercase',
  },
  fullName: {
    color: 'white',
    fontFamily: 'MyriadPro',
    fontSize: 20,
    marginTop: -15,
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
})
