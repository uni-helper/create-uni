import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { USER_EVENT } from '@/constants/USER_EVENT'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import React, { useState } from 'react'

const steps = [
  '项目名称',
  'TypeScript',
  'Template',
  'Plugins',
  'Modules',
  'ESLint',
  'Install Path',
  'Confirm',
]

const plugins = ['Plugin 1', 'Plugin 2', 'Plugin 3', 'Plugin 4']
const modules = ['Module 1', 'Module 2', 'Module 3', 'Module 4']

export default function CLIInterface() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    projectName: '',
    requireTypeScript: '',
    useTemplate: '',
    requiredPlugins: [],
    requiredModules: [],
    requireESLint: '',
    installationPath: window.create_uni_current_dir,
  })

  window.addEventListener('pathEvent', (event) => {
    const message = event.detail.path
    setFormData({ ...formData, installationPath: message })
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRadioChange = (value: string, field: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleCheckboxChange = (value: string, field: string) => {
    const currentValues = formData[field as keyof typeof formData] as string[]
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value]
    setFormData({ ...formData, [field]: updatedValues })
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleConfirm = () => {
    console.log('Form submitted:', formData)
    // Here you would typically send the data to a server or perform some action
  }

  const StepLabel = (index: number) => (
    <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{steps[index]}</Label>
  )

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-2">
            {StepLabel(currentStep)}
            <Input
              id="projectName"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              placeholder="uni-app"
              className="w-full bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 focus:border-zinc-500 dark:focus:border-zinc-400 focus:ring-zinc-500 dark:focus:ring-zinc-400"
            />
          </div>
        )
      case 1:
        return (
          <RadioGroup
            value={formData.requireTypeScript}
            onValueChange={value => handleRadioChange(value, 'requireTypeScript')}
          >
            <div className="space-y-2">
              {StepLabel(currentStep)}

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="typescript-yes" className="border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400" />
                <Label htmlFor="typescript-yes" className="text-zinc-600 dark:text-zinc-400">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="typescript-no" className="border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400" />
                <Label htmlFor="typescript-no" className="text-zinc-600 dark:text-zinc-400">No</Label>
              </div>
            </div>
          </RadioGroup>
        )
      case 2:
        return (
          <RadioGroup
            value={formData.useTemplate}
            onValueChange={value => handleRadioChange(value, 'useTemplate')}
          >
            <div className="space-y-2">
              {StepLabel(currentStep)}

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="template-yes" className="border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400" />
                <Label htmlFor="template-yes" className="text-zinc-600 dark:text-zinc-400">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="template-no" className="border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400" />
                <Label htmlFor="template-no" className="text-zinc-600 dark:text-zinc-400">No</Label>
              </div>
            </div>
          </RadioGroup>
        )
      case 3:
        return (
          <div className="space-y-2">
            {StepLabel(currentStep)}

            {plugins.map(plugin => (
              <div key={plugin} className="flex items-center space-x-2">
                <Checkbox
                  id={plugin}
                  checked={formData.requiredPlugins.includes(plugin)}
                  onCheckedChange={() => handleCheckboxChange(plugin, 'requiredPlugins')}
                  className="border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                />
                <Label htmlFor={plugin} className="text-zinc-600 dark:text-zinc-400">{plugin}</Label>
              </div>
            ))}
          </div>
        )
      case 4:
        return (
          <div className="space-y-2">
            {StepLabel(currentStep)}

            {modules.map(module => (
              <div key={module} className="flex items-center space-x-2">
                <Checkbox
                  id={module}
                  checked={formData.requiredModules.includes(module)}
                  onCheckedChange={() => handleCheckboxChange(module, 'requiredModules')}
                  className="border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                />
                <Label htmlFor={module} className="text-zinc-600 dark:text-zinc-400">{module}</Label>
              </div>
            ))}
          </div>
        )
      case 5:
        return (
          <RadioGroup
            value={formData.requireESLint}
            onValueChange={value => handleRadioChange(value, 'requireESLint')}
          >
            <div className="space-y-2">
              {StepLabel(currentStep)}

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="eslint-yes" className="border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400" />
                <Label htmlFor="eslint-yes" className="text-zinc-600 dark:text-zinc-400">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="eslint-no" className="border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400" />
                <Label htmlFor="eslint-no" className="text-zinc-600 dark:text-zinc-400">No</Label>
              </div>
            </div>
          </RadioGroup>
        )
      case 6:
        return (
          <div className="space-y-2">
            {StepLabel(currentStep)}

            <div className="flex items-center space-x-2">
              <Input
                id="installationPath"
                name="installationPath"
                value={formData.installationPath}
                onChange={handleInputChange}
                className="flex-grow bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 focus:border-zinc-500 dark:focus:border-zinc-400 focus:ring-zinc-500 dark:focus:ring-zinc-400"
                placeholder="Enter path"
              />
              <Button
                onClick={() => window.ipc.postMessage(USER_EVENT.FILE_PATH)}
                variant="outline"
                size="sm"
                className="border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                Browse
              </Button>
            </div>
          </div>
        )
      case 7:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">Confirm Your Choices</h2>
            <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-md overflow-x-auto text-xs">
              <pre className="text-zinc-700 dark:text-zinc-300">{JSON.stringify(formData, null, 2)}</pre>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="p-6 pt-0">
      <div className="mb-6">
        <div className="h-1 bg-zinc-200 dark:bg-zinc-700 rounded-full">
          <div
            className="h-full bg-zinc-600 dark:bg-zinc-400 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          >
          </div>
        </div>
        <div className="text-xs mt-2 text-zinc-500 dark:text-zinc-400">
          Step
          {' '}
          {currentStep + 1}
          {' '}
          of
          {' '}
          {steps.length}
          :
          {' '}
          {steps[currentStep]}
        </div>
      </div>
      <div className="bg-gradient-to-b from-zinc-100 to-white dark:from-zinc-800 dark:to-zinc-900 p-6 rounded-lg mb-6">
        <div className="mb-6">{renderStep()}</div>
      </div>
      <div className="flex justify-between">
        <Button
          onClick={handleBack}
          disabled={currentStep === 0}
          variant="outline"
          size="sm"
          className="w-[80px] border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        {currentStep < steps.length - 1
          ? (
              <Button
                onClick={handleNext}
                size="sm"
                className="w-[80px] bg-zinc-800 dark:bg-zinc-200 text-zinc-100 dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-300"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )
          : (
              <Button
                onClick={handleConfirm}
                size="sm"
                className="w-[80px] bg-zinc-800 dark:bg-zinc-200 text-zinc-100 dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-300"
              >
                Confirm
                <Check className="w-4 h-4 ml-1" />
              </Button>
            )}
      </div>
    </div>
  )
}
