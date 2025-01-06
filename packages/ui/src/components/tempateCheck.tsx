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
import { Gitee } from './icons/gitee'
import { Github } from './icons/github'
import { Vitepress } from './icons/vitepress'
import { Button } from './ui/button'

export function TemplateCheck() {
  const templateList = window.create_uni_data.templateList
  console.log(templateList)
  return (
    <Select>
      <SelectTrigger
        className="w-full bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 focus:border-zinc-500 dark:focus:border-zinc-400 focus:ring-zinc-500 dark:focus:ring-zinc-400"
      >
        <SelectValue
          placeholder="Theme"
        />
      </SelectTrigger>
      <SelectContent>
        {
          templateList.map((item) => {
            if (item.list) {
              return (
                <SelectGroup>
                  <SelectLabel>{item.label}</SelectLabel>
                  {
                    item.list.map((item) => {
                      return <SelectItem value={item.value}>{item.label}</SelectItem>
                    })
                  }
                </SelectGroup>
              )
            }
            else {
              return (
                <SelectItem
                  value={item.value}
                  content={(
                    <div className="mx-auto w-full max-w-sm items-start">
                      <DrawerHeader className="border-b border-dashed">
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
                                  class="cursor-pointer hover:-translate-y-1 transition-transform duration-200"
                                />
                              )
                            }
                            if (key === 'gitee') {
                              return (
                                <Gitee
                                  onClick={() => window.ipc.postMessage(`${USER_EVENT.OPEN},${item.url[key]}`)}
                                  class="cursor-pointer hover:-translate-y-1 transition-transform duration-20"
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
                            <Vitepress
                              onClick={() => window.ipc.postMessage(`${USER_EVENT.OPEN},${item.website}`)}
                              class="cursor-pointer hover:-translate-y-1 transition-transform duration-20"
                            />
                          )
                        }
                        {
                          item.playground && (
                            <Button
                              onClick={() => window.ipc.postMessage(`${USER_EVENT.OPEN},${item.playground}`)}
                              className="mt-4"
                            >
                              Playground
                            </Button>
                          )
                        }
                      </div>

                    </div>
                  )}
                >
                  <div className="">
                    <div>{item.label}</div>
                  </div>
                </SelectItem>
              )
            }
          },
          )
        }
      </SelectContent>
    </Select>
  )
}
