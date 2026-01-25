'use client'

import * as React from 'react'
import type { Column, Table } from '@tanstack/react-table'
import { X } from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { DataTableDateFilter } from '@/components/data-table/data-table-date-filter'
import { DataTableFacetedFilter } from '@/components/data-table/data-table-faceted-filter'
import { DataTableSliderFilter } from '@/components/data-table/data-table-slider-filter'
import { DataTableTextSearch } from '@/components/data-table/data-table-text-search'
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options'

interface DataTableToolbarProps<TData> extends React.ComponentProps<'div'> {
  table: Table<TData>
  onSearchAll?: (value: string) => void
  searchValue?: string
  enableSearchByMode?: boolean
  enableAdvancedToolbarFilter?: boolean
}

export function DataTableToolbar<TData>({
  table,
  children,
  className,
  onSearchAll,
  searchValue,
  enableAdvancedToolbarFilter,
  enableSearchByMode = false,
  ...props
}: DataTableToolbarProps<TData>) {
  const [localSearch, setLocalSearch] = React.useState(searchValue ?? '')
  const isFiltered = table.getState().columnFilters.length > 0
  const isSorted = table.getState().sorting.length > 0

  const filterColumns = React.useMemo(
    () =>
      table
        .getAllColumns()
        .filter(
          (column) =>
            column.getCanFilter() && column.columnDef.meta?.variant !== 'text'
        ),
    [table]
  )

  const searchColumns = React.useMemo(
    () =>
      table
        .getAllColumns()
        .filter(
          (column) =>
            column.columnDef.meta?.variant === 'text' && column.getCanFilter()
        ),
    [table]
  )

  const [_searchBy, setSearchBy] = useQueryState(
    'searchBy',
    parseAsString.withDefault(searchColumns[0]?.id ?? '').withOptions({
      clearOnDefault: onSearchAll ? true : false,
      history: 'replace',
    })
  )

  const onReset = React.useCallback(() => {
    if (onSearchAll) onSearchAll('')

    table.resetColumnFilters()
    table.resetSorting()
    if (searchColumns.length > 0) {
      setSearchBy(searchColumns[0]?.id ?? '')
    }
  }, [table, onSearchAll, setSearchBy, searchColumns])

  React.useEffect(() => {
    setLocalSearch(searchValue ?? '')
  }, [searchValue])

  return (
    <div
      role='toolbar'
      aria-orientation='horizontal'
      className={cn(
        'flex w-full items-start justify-between gap-2 p-1',
        className
      )}
      {...props}
    >
      <div className='flex flex-1 flex-wrap items-center gap-2'>
        {enableAdvancedToolbarFilter && (
          <>
            {/* SINGLE text search */}
            {(onSearchAll || searchColumns.length > 0) && (
              <DataTableTextSearch
                table={table}
                onSearchAll={onSearchAll}
                searchValue={searchValue}
                enableSearchByMode={enableSearchByMode}
              />
            )}

            {/* Other filters */}
            {filterColumns.map((column) => (
              <DataTableToolbarFilter key={column.id} column={column} />
            ))}

            {(isFiltered || localSearch || isSorted) && (
              <Button
                aria-label='Reset filters'
                variant='outline'
                size='sm'
                className='border-dashed'
                onClick={onReset}
              >
                <X />
                Reset
              </Button>
            )}
          </>
        )}
      </div>

      <div className='flex items-center gap-2'>
        {children}
        <DataTableViewOptions table={table} align='end' />
      </div>
    </div>
  )
}

interface DataTableToolbarFilterProps<TData> {
  column: Column<TData>
}

function DataTableToolbarFilter<TData>({
  column,
}: DataTableToolbarFilterProps<TData>) {
  const columnMeta = column.columnDef.meta

  if (!columnMeta?.variant) return null

  switch (columnMeta.variant) {
    case 'number':
      return (
        <div className='relative'>
          <input
            type='number'
            value={(column.getFilterValue() as string) ?? ''}
            onChange={(e) => column.setFilterValue(e.target.value)}
            className='h-8 w-30 rounded-md border px-2'
          />
        </div>
      )

    case 'range':
      return (
        <DataTableSliderFilter
          column={column}
          title={columnMeta.label ?? column.id}
        />
      )

    case 'date':
    case 'dateRange':
      return (
        <DataTableDateFilter
          column={column}
          title={columnMeta.label ?? column.id}
          multiple={columnMeta.variant === 'dateRange'}
        />
      )

    case 'select':
    case 'multiSelect':
      return (
        <DataTableFacetedFilter
          column={column}
          title={columnMeta.label ?? column.id}
          options={columnMeta.options ?? []}
          multiple={columnMeta.variant === 'multiSelect'}
        />
      )

    default:
      return null
  }
}
