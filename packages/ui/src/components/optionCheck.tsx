import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { USER_EVENT } from '@/constants/USER_EVENT'
import { BookText, Ellipsis, Github } from 'lucide-react'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'

interface OptionCheckProps {
  checkList: string[]
  options: typeof window.create_uni_data.plugin
  onChange: (value: string) => void
}

export function OptionCheck({ checkList, options, onChange }: OptionCheckProps) {
  return (

    <div className="max-h-60 space-y-2">
      {options.map(plugin => (
        <div key={plugin} className="flex items-center space-x-2">
          <Checkbox
            id={plugin.value}
            checked={checkList.includes(plugin.value)}
            onCheckedChange={() => onChange(plugin.value)}
            className="border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
          />
          <Label htmlFor={plugin.value} className="text-zinc-600 dark:text-zinc-300 flex justify-between  items-center w-full">
            {plugin.name}
            <Drawer>
              <DrawerTrigger>
                <Ellipsis
                  className="cursor-pointer opacity-50 hover:opacity-100"
                />
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="border-b border-dashed border-zinc-500/50 mx-2">
                  <DrawerTitle>{plugin.name}</DrawerTitle>
                  <DrawerDescription>
                    {plugin.hint}
                  </DrawerDescription>
                </DrawerHeader>
                <div className="flex justify-center text-2xl mt-4 space-x-3 ">
                  <Github
                    onClick={() => window.ipc.postMessage(`${USER_EVENT.OPEN},${plugin.github}`)}
                    className="cursor-pointer hover:-translate-y-0.5 transition-transform duration-200"
                    stroke="#888"
                  />
                  {
                    plugin.website && (
                      <BookText
                        onClick={() => window.ipc.postMessage(`${USER_EVENT.OPEN},${plugin.website}`)}
                        className="cursor-pointer hover:-translate-y-0.5 transition-transform duration-20"
                        stroke="#888"
                      />
                    )
                  }
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Label>
        </div>
      ))}
    </div>
  )
}
