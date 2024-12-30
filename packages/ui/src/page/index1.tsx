// import { Button } from '@/components/ui/button'
// import { Checkbox } from '@/components/ui/checkbox'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
// import { USER_EVENT } from '@/constants/USER_EVENT'
// import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
// import React, { useState } from 'react'

// const steps = [
//   '项目名称111',
//   'Require TypeScript',
//   'Use Template',
//   'Select Required Plugins',
//   'Select Required Modules',
//   'Require ESLint',
//   'Choose Installation Path',
//   'Confirm',
// ]

// const plugins = ['Plugin 1', 'Plugin 2', 'Plugin 3', 'Plugin 4']
// const modules = ['Module 1', 'Module 2', 'Module 3', 'Module 4']

// export default function CLIInterface() {
//   const [currentStep, setCurrentStep] = useState(0)
//   const [formData, setFormData] = useState({
//     projectName: '',
//     requireTypeScript: '',
//     useTemplate: '',
//     requiredPlugins: [],
//     requiredModules: [],
//     requireESLint: '',
//     installationPath: '',
//   })

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleRadioChange = (value: string, field: string) => {
//     setFormData({ ...formData, [field]: value })
//   }

//   const handleCheckboxChange = (value: string, field: string) => {
//     const currentValues = formData[field as keyof typeof formData] as string[]
//     const updatedValues = currentValues.includes(value)
//       ? currentValues.filter(item => item !== value)
//       : [...currentValues, value]
//     setFormData({ ...formData, [field]: updatedValues })
//   }

//   const handleDirectoryPicker = async () => {
//     try {
//       if ('showDirectoryPicker' in window) {
//         // eslint-disable-next-line ts/ban-ts-comment
//         // @ts-expect-error xx
//         const dirHandle = await window.showDirectoryPicker()
//         console.log('Selected directory:', dirHandle)
//         setFormData({ ...formData, installationPath: dirHandle.name })
//       }
//       else {
//         throw new Error('Directory picker not supported')
//       }
//     }
//     catch (err) {
//       console.error('Error selecting directory:', err)
//       // eslint-disable-next-line no-alert
//       const manualPath = prompt('Please enter the installation path manually:')
//       if (manualPath) {
//         setFormData({ ...formData, installationPath: manualPath })
//       }
//     }
//   }

//   const handleNext = () => {
//     if (currentStep < steps.length - 1) {
//       setCurrentStep(currentStep + 1)
//     }
//   }

//   const handleBack = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1)
//     }
//   }

//   const handleConfirm = () => {
//     console.log('Form submitted:', formData)
//     // Here you would typically send the data to a server or perform some action
//   }

//   const renderStep = () => {
//     switch (currentStep) {
//       case 0:
//         return (
//           <div className="space-y-2">
//             <Label htmlFor="projectName" className="text-sm font-medium">项目名称</Label>
//             <Input
//               id="projectName"
//               name="projectName"
//               value={formData.projectName}
//               onChange={handleInputChange}
//               className="w-full"
//               placeholder="uni-app"
//             />
//           </div>
//         )
//       case 1:
//         return (
//           <RadioGroup
//             value={formData.requireTypeScript}
//             onValueChange={value => handleRadioChange(value, 'requireTypeScript')}
//           >
//             <div className="space-y-2">
//               <Label className="text-sm font-medium">Require TypeScript</Label>
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="yes" id="typescript-yes" />
//                 <Label htmlFor="typescript-yes">Yes</Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="no" id="typescript-no" />
//                 <Label htmlFor="typescript-no">No</Label>
//               </div>
//             </div>
//           </RadioGroup>
//         )
//       case 2:
//         return (
//           <RadioGroup
//             value={formData.useTemplate}
//             onValueChange={value => handleRadioChange(value, 'useTemplate')}
//           >
//             <div className="space-y-2">
//               <Label className="text-sm font-medium">Use Template</Label>
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="yes" id="template-yes" />
//                 <Label htmlFor="template-yes">Yes</Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="no" id="template-no" />
//                 <Label htmlFor="template-no">No</Label>
//               </div>
//             </div>
//           </RadioGroup>
//         )
//       case 3:
//         return (
//           <div className="space-y-2">
//             <Label className="text-sm font-medium">Select Required Plugins</Label>
//             {plugins.map(plugin => (
//               <div key={plugin} className="flex items-center space-x-2">
//                 <Checkbox
//                   id={plugin}
//                   checked={formData.requiredPlugins.includes(plugin)}
//                   onCheckedChange={() => handleCheckboxChange(plugin, 'requiredPlugins')}
//                 />
//                 <Label htmlFor={plugin}>{plugin}</Label>
//               </div>
//             ))}
//           </div>
//         )
//       case 4:
//         return (
//           <div className="space-y-2">
//             <Label className="text-sm font-medium">Select Required Modules</Label>
//             {modules.map(module => (
//               <div key={module} className="flex items-center space-x-2">
//                 <Checkbox
//                   id={module}
//                   checked={formData.requiredModules.includes(module)}
//                   onCheckedChange={() => handleCheckboxChange(module, 'requiredModules')}
//                 />
//                 <Label htmlFor={module}>{module}</Label>
//               </div>
//             ))}
//           </div>
//         )
//       case 5:
//         return (
//           <RadioGroup
//             value={formData.requireESLint}
//             onValueChange={value => handleRadioChange(value, 'requireESLint')}
//           >
//             <div className="space-y-2">
//               <Label className="text-sm font-medium">Require ESLint</Label>
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="yes" id="eslint-yes" />
//                 <Label htmlFor="eslint-yes">Yes</Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="no" id="eslint-no" />
//                 <Label htmlFor="eslint-no">No</Label>
//               </div>
//             </div>
//           </RadioGroup>
//         )
//       case 6:
//         return (
//           <div className="space-y-2">
//             <Label htmlFor="installationPath" className="text-sm font-medium">Choose Installation Path</Label>
//             <div className="flex items-center space-x-2">
//               <Input
//                 id="installationPath"
//                 name="installationPath"
//                 value={formData.installationPath}
//                 onChange={handleInputChange}
//                 className="flex-grow"
//                 placeholder="Enter installation path"
//               />
//               <Button
//                 onClick={() => window.ipc.postMessage(USER_EVENT.FILE_PATH)}
//                 variant="outline"
//                 size="sm"
//               >
//                 Browse
//               </Button>
//             </div>
//           </div>
//         )
//       case 7:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-lg font-semibold">Confirm Your Choices</h2>
//             <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
//               {JSON.stringify(formData, null, 2)}
//             </pre>
//           </div>
//         )
//       default:
//         return null
//     }
//   }

//   return (
//     <div className="min-h-screen bg-white text-gray-900 p-4 sm:p-6 md:p-8">
//       <div className="max-w-md mx-auto">
//         <h1 className="text-2xl font-bold mb-6">Uni Creator</h1>
//         <div className="mb-4">
//           <div className="h-1 bg-gray-200 rounded-full">
//             <div
//               className="h-full bg-primary rounded-full transition-all duration-300 ease-in-out"
//               style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
//             >
//             </div>
//           </div>
//           <div className="text-sm mt-2 text-gray-600">
//             Step
//             {' '}
//             {currentStep + 1}
//             {' '}
//             of
//             {' '}
//             {steps.length}
//             :
//             {' '}
//             {steps[currentStep]}
//           </div>
//         </div>
//         <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
//           <div className="mb-6">{renderStep()}</div>
//           <div className="flex justify-between mt-6">
//             <Button
//               onClick={handleBack}
//               disabled={currentStep === 0}
//               variant="outline"
//               size="sm"
//             >
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Back
//             </Button>
//             {currentStep < steps.length - 1
//               ? (
//                   <Button
//                     onClick={handleNext}
//                     size="sm"
//                   >
//                     Next
//                     <ArrowRight className="w-4 h-4 ml-2" />
//                   </Button>
//                 )
//               : (
//                   <Button
//                     onClick={handleConfirm}
//                     size="sm"
//                   >
//                     Confirm
//                     <Check className="w-4 h-4 ml-2" />
//                   </Button>
//                 )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
