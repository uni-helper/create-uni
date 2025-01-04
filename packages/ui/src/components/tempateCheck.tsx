import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Link } from 'lucide-react'

export function TemplateCheck() {
  const templateList = window.create_uni_data.templateList
  console.log(templateList)
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Theme" />
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
                <SelectItem value={item.value}>
                  <div>
                    <div>{item.label}</div>
                    <Link />
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
