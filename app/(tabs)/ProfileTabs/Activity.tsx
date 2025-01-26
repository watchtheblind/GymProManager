import {View, Text, StyleSheet, Image} from 'react-native'
const Activity = () => {
  return (
    <View>
      <View style={styles.activityContainer}>
        <Text style={styles.activityText}>Resumen de tu actividad:</Text>

        {/* Aquí puedes agregar más componentes para mostrar la actividad */}
        <View style={styles.activityItem}>
          <Text style={styles.activityItemText}>
            Última sesión: 45 minutos de cardio
          </Text>
        </View>
        <View style={styles.activityItem}>
          <Text style={styles.activityItemText}>
            Calorías quemadas hoy: 320 kcal
          </Text>
        </View>
        <View style={styles.activityItem}>
          <Text style={styles.activityItemText}>Pasos dados: 8,500</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  activityContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
  },
  activityText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Copperplate',
    marginBottom: 20,
    textAlign: 'left',
  },
  activityItem: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    width: '100%',
  },
  activityItemText: {
    color: 'white',
    fontSize: 14,
  },
})

export default Activity
