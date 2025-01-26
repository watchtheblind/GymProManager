import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
const Progress = () => {
  return (
    <>
      <Text style={styles.messageText}>
        Estás realizando un gran trabajo y tu cuerpo lo está notando
      </Text>

      {/* Métricas */}
      <View style={styles.metricsContainer}>
        <View
          style={[
            styles.metricCard,
            {
              backgroundColor: '#518893',
              borderColor: '#6CB0B4',
              borderTopRightRadius: 15,
              borderBottomLeftRadius: 15,
            },
          ]}>
          <View style={styles.metricContent}>
            <Text style={styles.metricLabel}>Peso</Text>
            <Text style={styles.metricValue}>71,1</Text>
            <Text style={styles.metricUnit}>KG</Text>
          </View>
        </View>

        <View
          style={[
            styles.metricCard,
            {
              backgroundColor: '#CC7751',
              borderColor: '#DFAA8C',
              borderTopLeftRadius: 15,
              borderBottomRightRadius: 15,
            },
          ]}>
          <View style={styles.metricContent}>
            <Text style={styles.metricLabel}>Grasa</Text>
            <Text style={styles.metricValue}>9,2</Text>
            <Text style={styles.metricUnit}>%</Text>
          </View>
        </View>

        <View
          style={[
            styles.metricCard,
            {
              backgroundColor: '#B5AD6F',
              borderColor: '#FEF4C9',
              borderTopRightRadius: 15,
              borderBottomLeftRadius: 15,
            },
          ]}>
          <View style={styles.metricContent}>
            <Text style={styles.metricLabel}>Músculo</Text>
            <Text style={styles.metricValue}>63,3</Text>
            <Text style={styles.metricUnit}>KG</Text>
          </View>
        </View>
      </View>
      {/* Botones */}
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: '#B5AD6F',
            borderWidth: 3,
            borderColor: '#FEF4C9',
          },
        ]}>
        <Text style={styles.buttonText}>Registrar nuevo pesaje</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: '#518893',
            borderWidth: 3,
            borderColor: '#6CB0B4',
          },
        ]}>
        <Text style={styles.buttonText}>Registrar mi peso</Text>
      </TouchableOpacity>
    </>
  )
}
const styles = StyleSheet.create({
  messageText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    padding: 0,
    marginBottom: 20,
    lineHeight: 24,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 35,
    width: '100%',
    gap: 7,
  },
  metricCard: {
    flex: 1,
    borderWidth: 3,
    padding: 12,
    alignItems: 'center',
  },
  metricContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  metricValue: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Copperplate',
  },
  metricUnit: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Copperplate',
    opacity: 0.8,
  },
  metricLabel: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Copperplate',
  },
  button: {
    width: '90%',
    borderRadius: 40,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
})
export default Progress
