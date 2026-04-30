import { useState } from 'react'
import RegisterStep1 from './RegisterStep1'
import RegisterStep2 from './RegisterStep2'
import RegisterStep3 from './RegisterStep3'
import type { RegisterStep1Data, RegisterStep2Data } from '../../hooks/validation_zod'

type RegisterFormProps = {
  onSubmit: (loginData: RegisterStep1Data, passwordData: RegisterStep2Data) => void
  onCancel: () => void
}

export default function RegisterForm({ onSubmit, onCancel }: RegisterFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [step1Data, setStep1Data] = useState<RegisterStep1Data | undefined>()
  const [step2Data, setStep2Data] = useState<RegisterStep2Data | undefined>()

  const handleStep1Complete = (data: RegisterStep1Data) => {
    setStep1Data(data)
    setCurrentStep(2)
  }

  const handleStep2Complete = (data: RegisterStep2Data) => {
    setStep2Data(data)
    setCurrentStep(3)
  }

  const handleStep3Submit = () => {
    if (step1Data && step2Data) {
      onSubmit(step1Data, step2Data)
    }
  }

  const handleBackFromStep2 = () => {
    setCurrentStep(1)
  }

  const handleBackFromStep3 = () => {
    setCurrentStep(2)
  }

  return (
    <>
      {currentStep === 1 && (
        <RegisterStep1 onNext={handleStep1Complete} onCancel={onCancel} initialData={step1Data} />
      )}
      {currentStep === 2 && (
        <RegisterStep2 onNext={handleStep2Complete} onBack={handleBackFromStep2} initialData={step2Data} />
      )}
      {currentStep === 3 && step1Data && step2Data && (
        <RegisterStep3
          loginData={step1Data}
          passwordData={step2Data}
          onBack={handleBackFromStep3}
          onSubmit={handleStep3Submit}
        />
      )}
    </>
  )
}
