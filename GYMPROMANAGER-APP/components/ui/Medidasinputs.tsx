import React, {useState, useEffect, useCallback} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  TextInput,
} from 'react-native'

interface MeasurementInputsProps {
  peso: {
    valor: number
    unidad: 'kg' | 'lb'
  }
  altura: {
    valor: number
    unidad: 'cm' | 'pulg'
  }
  setPeso: (peso: {valor: number; unidad: 'kg' | 'lb'}) => void
  setAltura: (altura: {valor: number; unidad: 'cm' | 'pulg'}) => void
}

export default function MeasurementInputs({
  peso,
  altura,
  setPeso,
  setAltura,
}: MeasurementInputsProps) {
  const [height, setHeight] = useState(altura.valor.toString())
  const [weight, setWeight] = useState(peso.valor.toString())
  const [isMetric, setIsMetric] = useState({
    height: altura.unidad === 'cm',
    weight: peso.unidad === 'kg',
  })

  const [heightToggleAnim] = useState(
    new Animated.Value(altura.unidad === 'cm' ? 0 : 1),
  )
  const [weightToggleAnim] = useState(
    new Animated.Value(peso.unidad === 'kg' ? 0 : 1),
  )

  const animateToggle = useCallback(
    (type: 'height' | 'weight', toValue: number) => {
      Animated.spring(type === 'height' ? heightToggleAnim : weightToggleAnim, {
        toValue,
        useNativeDriver: false,
        tension: 60,
        friction: 8,
      }).start()
    },
    [heightToggleAnim, weightToggleAnim],
  )

  const convertHeight = useCallback(
    (value: number, fromUnit: 'cm' | 'pulg', toUnit: 'cm' | 'pulg'): number => {
      if (fromUnit === toUnit) return Math.round(value)
      return Math.round(fromUnit === 'cm' ? value / 2.54 : value * 2.54)
    },
    [],
  )

  const convertWeight = useCallback(
    (value: number, fromUnit: 'kg' | 'lb', toUnit: 'kg' | 'lb'): number => {
      if (fromUnit === toUnit) return Math.round(value)
      return Math.round(fromUnit === 'kg' ? value * 2.20462 : value / 2.20462)
    },
    [],
  )

  const handleToggle = useCallback(
    (type: 'height' | 'weight') => {
      setIsMetric((prev) => {
        const newValue = !prev[type]
        animateToggle(type, newValue ? 0 : 1)

        if (type === 'height') {
          const currentValue = Number.parseFloat(height)
          const newHeight = convertHeight(
            currentValue,
            prev.height ? 'cm' : 'pulg',
            newValue ? 'cm' : 'pulg',
          ).toString()
          setHeight(newHeight)
          setAltura({
            valor: Number.parseInt(newHeight, 10),
            unidad: newValue ? 'cm' : 'pulg',
          })
        } else {
          const currentValue = Number.parseFloat(weight)
          const newWeight = convertWeight(
            currentValue,
            prev.weight ? 'kg' : 'lb',
            newValue ? 'kg' : 'lb',
          ).toString()
          setWeight(newWeight)
          setPeso({
            valor: Number.parseInt(newWeight, 10),
            unidad: newValue ? 'kg' : 'lb',
          })
        }

        return {...prev, [type]: newValue}
      })
    },
    [
      height,
      weight,
      convertHeight,
      convertWeight,
      setAltura,
      setPeso,
      animateToggle,
    ],
  )

  const handleHeightChange = useCallback(
    (value: string) => {
      const numValue = Math.round(Number.parseFloat(value) || 0)
      setHeight(numValue.toString())
      setAltura({valor: numValue, unidad: isMetric.height ? 'cm' : 'pulg'})
    },
    [setAltura, isMetric.height],
  )

  const handleWeightChange = useCallback(
    (value: string) => {
      const numValue = Math.round(Number.parseFloat(value) || 0)
      setWeight(numValue.toString())
      setPeso({valor: numValue, unidad: isMetric.weight ? 'kg' : 'lb'})
    },
    [setPeso, isMetric.weight],
  )

  useEffect(() => {
    setHeight(altura.valor.toString())
    setWeight(peso.valor.toString())
    setIsMetric({
      height: altura.unidad === 'cm',
      weight: peso.unidad === 'kg',
    })
    heightToggleAnim.setValue(altura.unidad === 'cm' ? 0 : 1)
    weightToggleAnim.setValue(peso.unidad === 'kg' ? 0 : 1)
  }, [altura, peso, heightToggleAnim, weightToggleAnim])

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Input de altura */}
        <View style={styles.inputContainer}>
          <View style={styles.header}>
            <View style={styles.toggleContainer}>
              <Text
                style={[styles.unit, {opacity: isMetric.height ? 0.4 : 1}]}
                className='font-Copperplate'>
                pulg
              </Text>
              <Pressable
                onPress={() => handleToggle('height')}
                style={styles.toggleWrapper}>
                <View style={styles.toggleBackground}>
                  <Animated.View
                    style={[
                      styles.toggleCircle,
                      {
                        backgroundColor: '#4A9B9B',
                        borderColor: '#6CB0B4',
                        borderWidth: 2,
                        transform: [
                          {
                            translateX: heightToggleAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [22, 2],
                            }),
                          },
                        ],
                      },
                    ]}
                  />
                </View>
              </Pressable>
              <Text
                style={[styles.unit, {opacity: isMetric.height ? 1 : 0.4}]}
                className='font-Copperplate'>
                cm
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.valueContainer,
              {
                backgroundColor: '#518893',
                borderWidth: 4,
                borderColor: '#6CB0B4',
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 10,
              },
            ]}>
            <TextInput
              className='font-Copperplate'
              style={styles.valueInput}
              value={height}
              onChangeText={handleHeightChange}
              keyboardType='numeric'
            />
            <Text
              style={styles.valueUnit}
              className='font-Copperplate'>
              {isMetric.height ? 'cm' : 'pulg'}
            </Text>
          </View>
        </View>

        {/* Input de peso */}
        <View style={styles.inputContainer}>
          <View style={styles.header}>
            <View style={styles.toggleContainer}>
              <Text
                style={[styles.unit, {opacity: isMetric.weight ? 0.4 : 1}]}
                className='font-Copperplate'>
                lb
              </Text>
              <Pressable
                onPress={() => handleToggle('weight')}
                style={styles.toggleWrapper}>
                <View style={styles.toggleBackground}>
                  <Animated.View
                    style={[
                      styles.toggleCircle,
                      {
                        backgroundColor: '#E07A5F',
                        borderColor: '#DFAA8C',
                        borderWidth: 2,
                        transform: [
                          {
                            translateX: weightToggleAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [22, 2],
                            }),
                          },
                        ],
                      },
                    ]}
                  />
                </View>
              </Pressable>
              <Text
                style={[styles.unit, {opacity: isMetric.weight ? 1 : 0.4}]}
                className='font-Copperplate'>
                kg
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.valueContainer,
              {
                backgroundColor: '#CC7751',
                borderWidth: 4,
                borderColor: '#DFAA8C',
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 10,
              },
            ]}>
            <TextInput
              className='font-Copperplate'
              style={styles.valueInput}
              value={weight}
              onChangeText={handleWeightChange}
              keyboardType='numeric'
            />
            <Text
              style={[styles.valueUnit, {textAlign: 'center'}]}
              className='font-Copperplate'>
              {isMetric.weight ? 'kg' : 'lb'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  inputContainer: {
    flex: 1,
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toggleWrapper: {
    padding: 4,
  },
  toggleBackground: {
    width: 44,
    height: 24,
    backgroundColor: '#333',
    borderRadius: 12,
    justifyContent: 'center',
  },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
  },
  unit: {
    color: '#fff',
    fontSize: 14,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  valueInput: {
    height: 50,
    minWidth: 20,
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
    flex: 1,
  },
  valueUnit: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 4,
  },
})
