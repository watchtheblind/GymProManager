import React, {useState} from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'
import SearchBar from '@/components/ui/SearchBar'
import {Ionicons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import useBackHandler from '@/hooks/Common/useBackHandler'

const Services = () => {
  const navigation = useNavigation()
  const [searchText, setSearchText] = useState('')

  // Categorías con sus respectivos íconos y colores de fondo y borde
  const categories = [
    {
      name: 'Entrenamiento personal',
      count: 3,
      iconName: 'fitness-center' as keyof typeof MaterialIcons.glyphMap, // Ícono válido
      color: '#B0A462', // Color de fondo
      borderColor: '#FEF4C9', // Color del borde
    },
    {
      name: 'Yoga',
      count: 10,
      iconName: 'self-improvement' as keyof typeof MaterialIcons.glyphMap, // Ícono válido
      color: '#518893', // Color de fondo
      borderColor: '#6CB0B4', // Color del borde
    },
    {
      name: 'Pilates',
      count: 5,
      iconName: 'fitness-center' as keyof typeof MaterialIcons.glyphMap, // Ícono válido
      color: '#CC7751', // Color de fondo
      borderColor: '#DFAA8C', // Color del borde
    },
    {
      name: 'Boxeo',
      count: 10,
      iconName: 'sports-mma' as keyof typeof MaterialIcons.glyphMap, // Ícono válido
      color: '#B0A462', // Color de fondo
      borderColor: '#FEF4C9', // Color del borde
    },
    {
      name: 'Artes marciales',
      count: 10,
      iconName: 'sports-kabaddi' as keyof typeof MaterialIcons.glyphMap, // Ícono válido
      color: '#518893', // Color de fondo
      borderColor: '#6CB0B4', // Color del borde
    },
    {
      name: 'Danza',
      count: 9,
      iconName: 'music-note' as keyof typeof MaterialIcons.glyphMap, // Ícono válido
      color: '#D67D5E', // Color de fondo
      borderColor: '#DFAA8C', // Color del borde
    },
    {
      name: 'Rehabilitación',
      count: 2,
      iconName: 'healing' as keyof typeof MaterialIcons.glyphMap, // Ícono válido
      color: '#518893', // Color de fondo
      borderColor: '#6CB0B4', // Color del borde
    },
  ]

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchText.toLowerCase()),
  )

  const handleBackPress = () => {
    navigation.navigate('Bottomnav' as never)
    return true
  }

  useBackHandler(handleBackPress)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Bottomnav' as never)}
          style={styles.backButton}>
          <Ionicons
            name='arrow-back'
            size={24}
            color='white'
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>CATEGORÍAS</Text>
      </View>
      <SearchBar
        onSearch={setSearchText}
        onClear={() => setSearchText('')}
      />
      <ScrollView>
        {filteredCategories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryItem,
              {
                backgroundColor: category.color,
                borderColor: category.borderColor, // Borde específico para cada categoría
                borderWidth: 3, // Grosor del borde
              },
            ]}>
            <MaterialIcons
              name={category.iconName}
              size={30}
              color='white'
              style={styles.categoryIcon}
            />
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryCount}>
                {category.count} entrenamientos
              </Text>
            </View>
            {/* Cambiar a chevron-right y color blanco */}
            <MaterialIcons
              name='chevron-right'
              size={24}
              color='white'
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#1D1D1B',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingRight: 70,
    paddingTop: 60,
  },
  backButton: {
    marginRight: 16,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'Copperplate',
    color: 'white',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryIcon: {
    marginRight: 10,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  categoryCount: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'MyriadPro',
  },
})

export default Services
