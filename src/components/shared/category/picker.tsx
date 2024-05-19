'use client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Control, useController, useWatch } from 'react-hook-form'
import { TransactionType } from '../transaction-dialog/schema'
import { Button } from '@/components/ui/button'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import CreateCategoryDialog from './create'
import DisplayCategory from './display'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { cn } from '@/lib/utils'
import { Id } from '../../../../convex/_generated/dataModel'

interface CategoryPickerProps {
  control: Control<TransactionType>
}

interface SelectedCategory {
  _id: Id<'categories'>
  _creationTime: number
  name: string
  type: string
  icon: string
  couple: Id<'couples'>
}

export default function CategoryPicker({ control }: CategoryPickerProps) {
  const [open, setOpen] = useState(false)
  const type = useWatch({ control, name: 'type' })
  const coupleId = useWatch({ control, name: 'coupleId' })
  const {
    field: { onChange, value }
  } = useController({ control, name: 'category' })
  const categories = useQuery(api.category.getCategoriesList, { coupleId })
  const selectedCategory = useMemo(() => {
    if (!categories) return
    return categories.find((category) => `${category._id}` === value)
  }, [value, categories])
  // const [selectedCategory, setSelectedCategory] = useState<SelectedCategory>()
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedCategory ? (
            <DisplayCategory
              name={selectedCategory.name}
              icon={selectedCategory.icon}
            />
          ) : (
            'Select category'
          )}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <CommandInput placeholder="Search category..." />
          <CreateCategoryDialog type={type} coupleId={coupleId} />
          <CommandEmpty>
            <p>Category not found</p>
            <p className="text-xs text-muted-foreground">
              Tip: Create a new category
            </p>
          </CommandEmpty>
          <CommandGroup>
            <CommandList>
              {categories &&
                categories.map((category) => (
                  <CommandItem
                    key={category._id}
                    onSelect={() => {
                      onChange({ target: { value: category._id } })
                      setOpen((prev) => !prev)
                    }}
                    className="cursor-pointer"
                  >
                    <DisplayCategory
                      key={category._id}
                      name={category.name}
                      icon={category.icon}
                    />
                    <CheckIcon
                      className={cn(
                        'mr-2 w-4 h-4 opacity-0',
                        selectedCategory?._id === category._id && 'opacity-100'
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
