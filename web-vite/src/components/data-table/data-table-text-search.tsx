'use client'

import * as React from 'react'
import type { Table } from '@tanstack/react-table'
import { Search, X } from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '../ui/button'

export function DataTableTextSearch<TData>({
  table,
  onSearchAll,
  searchValue,
  enableSearchByMode = false,
}: {
  table: Table<TData>
  onSearchAll?: (value: string) => void
  searchValue?: string
  enableSearchByMode?: boolean
}) {
  const textColumns = React.useMemo(
    () =>
      table
        .getAllColumns()
        .filter(
          (column) =>
            column.getCanFilter() && column.columnDef.meta?.variant === 'text'
        ),
    [table]
  )

  const [searchBy, setSearchBy] = useQueryState(
    'searchBy',
    parseAsString
      .withDefault(onSearchAll ? 'ALL' : (textColumns[0]?.id ?? ''))
      .withOptions({
        clearOnDefault: onSearchAll ? true : false,
        history: 'replace',
      })
  )

  const activeColumn = React.useMemo(
    () => textColumns.find((c) => c.id === searchBy),
    [searchBy, textColumns]
  )

  const [localAllSearch, setLocalAllSearch] = React.useState(searchValue ?? '')

  React.useEffect(() => {
    setLocalAllSearch(searchValue ?? '')
  }, [searchValue])

  const onColumnChange = (columnId: string) => {
    table.setColumnFilters((prev) =>
      prev.filter((f) => !textColumns.some((col) => col.id === f.id))
    )
    if (onSearchAll && searchValue) {
      setLocalAllSearch('')
      onSearchAll('')
    }

    setSearchBy(columnId)
  }

  const onResetInput = () => {
    if (activeColumn) {
      activeColumn.setFilterValue(undefined)
    }

    if (onSearchAll && searchValue) {
      setLocalAllSearch('')
      onSearchAll('')
    }
  }

  return (
    <div className='flex items-center gap-2'>
      <Select value={searchBy} onValueChange={onColumnChange}>
        <SelectTrigger className='h-8 w-40'>
          <SelectValue placeholder='Select field' />
        </SelectTrigger>

        <SelectContent>
          {onSearchAll && <SelectItem value='ALL'>All</SelectItem>}

          {textColumns.map((column) => (
            <SelectItem key={column.id} value={column.id}>
              {column.columnDef.meta?.label ?? column.id}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className='relative'>
        <Search className='text-muted-foreground absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2' />
        <Input
          className='w-48 pr-6 pl-8 md:w-56'
          placeholder={
            searchBy === 'ALL'
              ? 'Search all columns...'
              : (activeColumn?.columnDef.meta?.placeholder ??
                activeColumn?.columnDef.meta?.label)
          }
          value={
            searchBy === 'ALL' || enableSearchByMode
              ? localAllSearch
              : ((activeColumn?.getFilterValue() as string) ?? '')
          }
          onChange={(e) => {
            const value = e.target.value

            if (searchBy === 'ALL' || enableSearchByMode) {
              setLocalAllSearch(value)
              onSearchAll?.(value)
            } else {
              activeColumn?.setFilterValue(value)
            }

            setSearchBy(searchBy)
          }}
        />
        {(searchValue || (activeColumn?.getFilterValue() as string)) && (
          <Button
            variant='ghost'
            size='icon'
            onClick={onResetInput}
            className='absolute top-1/2 right-1 h-6 w-6 -translate-y-1/2'
          >
            <X className='h-4 w-4' />
          </Button>
        )}
      </div>
    </div>
  )
}
