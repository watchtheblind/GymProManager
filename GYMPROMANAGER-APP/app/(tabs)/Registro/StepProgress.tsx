import React from 'react';
import { View, Text } from 'react-native';

interface StepProgressProps {
  currentStep: number;
  steps: Array<{
    label: string;
    number: number;
  }>;
}

const StepProgress: React.FC<StepProgressProps> = ({ currentStep, steps }) => {
  return (
    <View className="w-full max-w-3xl mb-8">
      <View className="relative flex items-center justify-between">
        {/* Progress Line */}
        <View className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 w-full bg-gray-200">
          <View 
            className="h-full bg-[#B0A462] transition-all duration-300 ease-in-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </View>

        {/* Steps */}
        <View className="relative z-10 flex justify-between w-full">
          {steps.map((step) => (
            <View key={step.number} className="flex flex-col items-center">
              <View 
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                  ${step.number < currentStep 
                    ? 'bg-[#B0A462] border-[#B0A462]' 
                    : step.number === currentStep 
                    ? 'bg-[#CC7751] border-[#CC7751]' 
                    : 'bg-gray-100 border-gray-300'
                  }`}
              >
                <Text 
                  className={`text-sm font-bold
                    ${step.number <= currentStep ? 'text-white' : 'text-gray-500'}`}
                >
                  {step.number}
                </Text>
              </View>
              <Text 
                className={`mt-2 text-sm
                  ${step.number <= currentStep ? 'text-white' : 'text-gray-400'}`}
              >
                {step.label}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default StepProgress;

