import React from 'react'
import {View, Text} from 'react-native'

interface StepProgressProps {
  currentStep: number
  steps: Array<{
    label: string
    number: number
  }>
}

const StepProgress: React.FC<StepProgressProps> = ({currentStep, steps}) => {
  return (
    <View className='w-full max-w-3xl mb-3'>
      <View className='relative flex flex-row items-center justify-between'>
        <View className='absolute left-0 top-4 h-0.5 -translate-y-1/2 w-full bg-gray-200'>
          <View
            className='h-full bg-[#B0A462] transition-all duration-300 ease-in-out'
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </View>

        {/* Steps */}
        {steps.map((step) => (
          <View
            key={step.number}
            className='relative z-10 flex flex-col items-center'>
            <View
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                ${
                  step.number < currentStep
                    ? 'bg-[#B0A462] border-[#B0A462]'
                    : step.number === currentStep
                      ? 'bg-[#CC7751] border-[#CC7751]'
                      : 'bg-gray-100 border-gray-300'
                }`}>
              <Text
                className={`text-sm font-bold
                  ${step.number <= currentStep ? 'text-white' : 'text-gray-500'}`}>
                {step.number}
              </Text>
            </View>
            <Text
              className={`mt-2 text-xs text-center
                ${step.number <= currentStep ? 'text-white' : 'text-gray-400'}`}>
              {step.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export default StepProgress
