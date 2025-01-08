import {
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { USER_EVENT } from '@/constants/USER_EVENT'
import { BookText, Github } from 'lucide-react'

interface TemplateItemProps {
  item: typeof window.create_uni_data.ui[number]
}

function UIItem({ item }: TemplateItemProps) {
  return (
    <SelectItem
      value={item.value}
      content={(
        <div className="mx-auto w-full max-w-sm items-start">
          <DrawerHeader className="border-b border-dashed border-zinc-500/50 mx-2">
            <DrawerTitle>{item.name}</DrawerTitle>
            <DrawerDescription>
              {item.hint}
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex justify-center text-2xl mt-4 space-x-3 ">
            {item.github && (
              <Github
                onClick={() => window.ipc.postMessage(`${USER_EVENT.OPEN}|${item.github}`)}
                className="cursor-pointer hover:-translate-y-0.5 transition-transform duration-200"
                stroke="#888"
              />
            )}
            {
              item.website && (
                <BookText
                  onClick={() => window.ipc.postMessage(`${USER_EVENT.OPEN}|${item.website}`)}
                  className="cursor-pointer hover:-translate-y-0.5 transition-transform duration-20"
                  stroke="#888"
                />
              )
            }
          </div>
        </div>
      )}
    >
      {item.name}
    </SelectItem>
  )
}

interface OptionCheckProps {
  value?: string
  options: typeof window.create_uni_data.plugin
  onChange: (value: string) => void
}
export function UICheck({ value, options, onChange }: OptionCheckProps) {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger
        className="w-full bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 focus:border-zinc-500 dark:focus:border-zinc-400 focus:ring-zinc-500 dark:focus:ring-zinc-400"
      >
        <SelectValue
          placeholder="不需要组件库"
        />
      </SelectTrigger>
      <SelectContent>
        {
          options.map((item) => {
            if (item.value) {
              return <UIItem item={item} />
            }
            else {
              return <SelectItem value={item.value}>{item.name}</SelectItem>
            }
          },
          )
        }
      </SelectContent>
    </Select>
  )
}
