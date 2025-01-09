import { Eslint } from '@/components/icons/eslint'
import { Rename } from '@/components/icons/rename'
import { Template } from '@/components/icons/template'
import { Typescript } from '@/components/icons/typeScript'
import { OptionCheck } from '@/components/optionCheck'
import { TemplateCheck } from '@/components/templateCheck'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { UICheck } from '@/components/UICheck'
import { USER_EVENT } from '@/constants/USER_EVENT'
import { ArrowLeft, ArrowRight, Blocks, Check, Folder, Package, Puzzle } from 'lucide-react'
import React, { useState } from 'react'

const customSteps = [
  {
    title: 'Project Name',
    icon: <Rename />,
    value: 'name',
  },
  { title: 'Template', icon: <Template />, value: 'template' },
  { title: 'TypeScript', icon: <Typescript />, value: 'ts' },
  { title: 'Plugins', icon: <Blocks size={18} />, value: 'plugins' },
  { title: 'Modules', icon: <Package size={18} />, value: 'modules' },
  { title: 'UI', icon: <Puzzle size={18} />, value: 'ui' },
  { title: 'ESLint', icon: <Eslint />, value: 'eslint' },
  { title: 'Install Path', icon: <Folder size={18} />, value: 'path' },
] as const

const templateSteps = [
  {
    title: 'Project Name',
    icon: <Rename />,
    value: 'name',
  },
  { title: 'Template', icon: <Template />, value: 'template' },
  { title: 'Install Path', icon: <Folder size={18} />, value: 'path' },
] as any

export default function CLIInterface() {
  const [steps, setSteps] = useState(customSteps)

  const [currentStep, setCurrentStep] = useState<typeof customSteps[number]['value']>('name')
  const [formData, setFormData] = useState({
    projectName: '',
    useTemplate: 'custom',
    requireTypeScript: true,
    requiredPlugins: [],
    requiredModules: [],
    requireUI: null,
    requireESLint: true,
    installationPath: window.create_uni_current_dir,
  })

  window.addEventListener('pathEvent', (event) => {
    const message = event.detail.path
    setFormData({ ...formData, installationPath: message })
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement
    setFormData({ ...formData, [name]: value })
  }

  const handleTemplateChange = (value: string) => {
    console.log('Template changed:', value)
    setFormData({ ...formData, useTemplate: value })
    if (value !== 'custom') {
      setSteps(templateSteps)
    }
    else {
      setSteps(customSteps)
    }
  }

  const handleUIChange = (value: string) => {
    setFormData({ ...formData, requireUI: value })
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
    const currentIndex = steps.findIndex(item => item.value === currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].value)
    }
  }

  const handleBack = () => {
    const currentIndex = steps.findIndex(item => item.value === currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].value)
    }
  }

  const StepLabel = (value: string) => {
    const index = steps.findIndex(item => item.value === value)
    return (
      <div className="flex items-center pb-2">
        <div className="mr-2 text-zinc-500 text-xl">{steps[index].icon}</div>
        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{steps[index].title}</Label>
      </div>
    )
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'name':
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
      case 'template':
        return (
          <div className="space-y-2">
            {StepLabel(currentStep)}

            <TemplateCheck
              useTemplate={formData.useTemplate}
              onChange={handleTemplateChange}
            />
          </div>
        )
      case 'ts':
        return (
          <RadioGroup
            value={formData.requireTypeScript as unknown as string}
            onValueChange={value => handleRadioChange(value, 'requireTypeScript')}
          >
            <div className="space-y-2">
              {StepLabel(currentStep)}

              <div className="flex items-center space-x-2">
                <RadioGroupItem value={true as unknown as string} id="typescript-yes" className="border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400" />
                <Label htmlFor="typescript-yes" className="text-zinc-600 dark:text-zinc-400">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={false as unknown as string} id="typescript-no" className="border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400" />
                <Label htmlFor="typescript-no" className="text-zinc-600 dark:text-zinc-400">No</Label>
              </div>
            </div>
          </RadioGroup>
        )
      case 'plugins':
        return (
          <div className="space-y-2">
            {StepLabel(currentStep)}

            <OptionCheck
              checkList={formData.requiredPlugins}
              options={window.create_uni_data.plugin}
              onChange={value => handleCheckboxChange(value, 'requiredPlugins')}
            />

          </div>
        )
      case 'modules':
        return (
          <div className="space-y-2">
            {StepLabel(currentStep)}

            <OptionCheck
              checkList={formData.requiredModules}
              options={window.create_uni_data.module}
              onChange={value => handleCheckboxChange(value, 'requiredModules')}
            />

          </div>
        )
      case 'ui':
        return (
          <div className="space-y-2">
            {StepLabel(currentStep)}

            <UICheck
              value={formData.requireUI}
              options={window.create_uni_data.ui}
              onChange={handleUIChange}
            />
          </div>
        )
      case 'eslint':
        return (
          <RadioGroup
            value={formData.requireESLint as unknown as string}
            onValueChange={value => handleRadioChange(value, 'requireESLint')}
          >
            <div className="space-y-2">
              {StepLabel(currentStep)}

              <div className="flex items-center space-x-2">
                <RadioGroupItem value={true as unknown as string} id="eslint-yes" className="border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400" />
                <Label htmlFor="eslint-yes" className="text-zinc-600 dark:text-zinc-400">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={false as unknown as string} id="eslint-no" className="border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400" />
                <Label htmlFor="eslint-no" className="text-zinc-600 dark:text-zinc-400">No</Label>
              </div>
            </div>
          </RadioGroup>
        )
      case 'path':
        return (
          <div className="space-y-2">
            {StepLabel(currentStep)}

            <div className="flex flex-col items-center">
              <Label className="pt-2">{formData.installationPath}</Label>

              <div className=" w-full border-b border-1 border-dashed border-zinc-500/50 my-2" />

              <Button
                variant="outline"
                className="w-full !ml-0 "
                onClick={() => window.ipc.postMessage(USER_EVENT.FILE_PATH)}
              >
                Pick Folder
              </Button>
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
            style={{ width: `${((steps.findIndex(item => item.value === currentStep) + 1) / steps.length) * 100}%` }}
          >
          </div>
        </div>
        <div className="text-xs mt-2 text-zinc-500 dark:text-zinc-400">
          Step
          {' '}
          {steps.findIndex(item => item.value === currentStep) + 1}
          {' '}
          of
          {' '}
          {steps.length}
          :
          {' '}
          {steps.find(item => item.value === currentStep).title}
        </div>
      </div>
      <div className="bg-gradient-to-b from-zinc-100 to-white dark:from-zinc-800 dark:to-zinc-900 p-6 rounded-lg mb-6">
        <div className="mb-6">{renderStep()}</div>
      </div>
      <div className="flex justify-between">
        <Button
          onClick={handleBack}
          disabled={currentStep === 'name'}
          variant="outline"
          size="sm"
          className="w-[80px] border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        {currentStep !== 'path'
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
                onClick={() => window.ipc.postMessage(`${USER_EVENT.INSTALL}|${JSON.stringify(formData)}`)}
                size="sm"
                className="w-[80px] bg-zinc-800 dark:bg-zinc-200 text-zinc-100 dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-300"
              >
                Install
                <Check className="w-4 h-4 ml-1" />
              </Button>
            )}
      </div>
    </div>
  )
}
