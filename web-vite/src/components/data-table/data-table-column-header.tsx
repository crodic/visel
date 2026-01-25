'use client'

import type { Column } from '@tanstack/react-table'
import { ChevronDown, ChevronsUpDown, ChevronUp, EyeOff, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DataTableColumnHeaderProps<
  TData,
  TValue,
> extends React.ComponentProps<typeof DropdownMenuTrigger> {
  column: Column<TData, TValue>
  label: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  label,
  className,
  ...props
}: DataTableColumnHeaderProps<TData, TValue>) {
  const canSort = column.getCanSort()
  const canHide = column.getCanHide()

  /* ---------------------------------------------------------
   * NO ACTIONS → PLAIN HEADER
   * --------------------------------------------------------- */
  if (!canSort && !canHide) {
    return (
      <div
        className={cn(
          'mt-0.5 flex h-8 items-center px-2 text-sm font-medium',
          className
        )}
      >
        {label}
      </div>
    )
  }

  /* ---------------------------------------------------------
   * WITH ACTIONS → DROPDOWN HEADER
   * --------------------------------------------------------- */
  return (
    <div className={cn('mt-0.5 ml-0.5 flex flex-col gap-1', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            '-ml-1.5 flex h-8 w-max items-center gap-1.5 rounded-md px-2 py-1.5',
            'hover:bg-accent focus:ring-ring focus:ring-1 focus:outline-none',
            'data-[state=open]:bg-accent',
            '[&_svg]:text-muted-foreground [&_svg]:size-4 [&_svg]:shrink-0'
          )}
          {...props}
        >
          {label}

          {canSort &&
            (column.getIsSorted() === 'desc' ? (
              <ChevronDown />
            ) : column.getIsSorted() === 'asc' ? (
              <ChevronUp />
            ) : (
              <ChevronsUpDown />
            ))}
        </DropdownMenuTrigger>

        <DropdownMenuContent align='start' className='w-28'>
          {/* SORT */}
          {canSort && (
            <>
              <DropdownMenuCheckboxItem
                className='relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto'
                checked={column.getIsSorted() === 'asc'}
                onClick={() => column.toggleSorting(false)}
              >
                <ChevronUp />
                Asc
              </DropdownMenuCheckboxItem>

              <DropdownMenuCheckboxItem
                className='relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto'
                checked={column.getIsSorted() === 'desc'}
                onClick={() => column.toggleSorting(true)}
              >
                <ChevronDown />
                Desc
              </DropdownMenuCheckboxItem>

              {column.getIsSorted() && (
                <DropdownMenuItem
                  className='pl-2'
                  onClick={() => column.clearSorting()}
                >
                  <X />
                  Reset
                </DropdownMenuItem>
              )}
            </>
          )}

          {/* VISIBILITY */}
          {canHide && (
            <DropdownMenuCheckboxItem
              className='relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto'
              checked={!column.getIsVisible()}
              onClick={() => column.toggleVisibility(false)}
            >
              <EyeOff />
              Hide
            </DropdownMenuCheckboxItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
