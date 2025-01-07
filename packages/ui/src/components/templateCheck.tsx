import {
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { USER_EVENT } from '@/constants/USER_EVENT'

import Ansi from 'ansi-to-react'
import { BookText, Github } from 'lucide-react'
import { Demo } from './icons/demo'
import { Gitee } from './icons/gitee'

interface TemplateItemProps {
  item: typeof window.create_uni_data.templateList[number]
}

function TemplateItem({ item }: TemplateItemProps) {
  return (
    <SelectItem
      value={item.value}
      content={(
        <div className="mx-auto w-full max-w-sm items-start">
          <DrawerHeader className="border-b border-dashed border-zinc-500/50 mx-2">
            <DrawerTitle>{item.label}</DrawerTitle>
            <DrawerDescription>
              <Ansi>
                {item.description}
              </Ansi>
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex justify-center text-2xl mt-4 space-x-3 ">
            {
              Object.keys(item.url).map((key) => {
                if (key === 'github') {
                  return (
                    <Github
                      onClick={() => window.ipc.postMessage(`${USER_EVENT.OPEN},${item.url[key]}`)}
                      className="cursor-pointer hover:-translate-y-0.5 transition-transform duration-200"
                      stroke="#888"
                    />
                  )
                }
                if (key === 'gitee') {
                  return (
                    <Gitee
                      onClick={() => window.ipc.postMessage(`${USER_EVENT.OPEN},${item.url[key]}`)}
                      class="cursor-pointer hover:-translate-y-0.5 transition-transform duration-20"
                    />
                  )
                }
                else {
                  return null
                }
              })
            }
            {
              item.website && (
                <BookText
                  onClick={() => window.ipc.postMessage(`${USER_EVENT.OPEN},${item.website}`)}
                  className="cursor-pointer hover:-translate-y-0.5 transition-transform duration-20"
                  stroke="#888"
                />
              )
            }
            {
              item.playground && (
                <Demo
                  onClick={() => window.ipc.postMessage(`${USER_EVENT.OPEN},${item.playground}`)}
                  className="cursor-pointer hover:-translate-y-0.5 transition-transform duration-20"
                />
              )
            }
          </div>
        </div>
      )}
    >
      {item.label}
    </SelectItem>
  )
}

const templateList = window.create_uni_data.templateList
templateList.unshift({
  label: '自定义模板',
  value: 'custom',
} as TemplateItemProps['item'])

export function TemplateCheck({ useTemplate, onChange }: { useTemplate: string, onChange: (value: string) => void }) {
  return (
    <Select onValueChange={onChange} value={useTemplate}>
      <SelectTrigger
        className="w-full bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 focus:border-zinc-500 dark:focus:border-zinc-400 focus:ring-zinc-500 dark:focus:ring-zinc-400"
      >
        <SelectValue
          placeholder="自定义模板"
        />
      </SelectTrigger>
      <SelectContent>
        {
          templateList.map((item) => {
            if (item.list) {
              return (
                <SelectGroup className="border-b border-dashed border-zinc-500/50">
                  <SelectLabel>{item.label}</SelectLabel>
                  {
                    item.list.map((item) => {
                      return <TemplateItem item={item} />
                    })
                  }
                </SelectGroup>
              )
            }
            else if (item.url) {
              return <TemplateItem item={item} />
            }
            else {
              return <SelectItem value={item.value}>{item.label}</SelectItem>
            }
          },
          )
        }
      </SelectContent>
    </Select>
  )
}
