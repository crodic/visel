import { format } from 'date-fns'
import type { ColumnDef } from '@tanstack/react-table'
import { Text, TextIcon } from 'lucide-react'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { ColumnKey, type ActivityLogSchema } from './schema'

export function getActivitiesTableColumns({
  actions = [],
}: {
  actions: string[]
}): ColumnDef<ActivityLogSchema>[] {
  return [
    {
      id: ColumnKey.entityId,
      accessorFn: (row) => row.entityId,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label='Email' />
      ),
      meta: {
        variant: 'text',
        placeholder: 'Entity ID',
        label: 'Entity ID',
        icon: Text,
      },
      cell: ({ row }) => (
        <p className='truncate overflow-hidden'>{row.original.entityId}</p>
      ),
      enableColumnFilter: true,
    },
    {
      id: ColumnKey.entity,
      accessorFn: (row) => row.entity,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label='Entity' />
      ),
      cell: ({ row }) => (
        <p className='truncate overflow-hidden'>{row.original.entity}</p>
      ),
      meta: {
        variant: 'text',
        placeholder: 'Entity',
        label: 'Entity',
        icon: TextIcon,
      },
      enableHiding: false,
      enableSorting: false,
      enableColumnFilter: true,
    },
    {
      id: ColumnKey.action,
      accessorFn: (row) => row.action,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label='Action' />
      ),
      meta: {
        variant: 'multiSelect',
        label: 'Action',
        options: actions.map((action) => ({ value: action, label: action })),
      },
      cell: ({ row }) => <p>{row.original.action}</p>,
      enableColumnFilter: true,
      enableHiding: false,
      enableSorting: false,
    },
    {
      id: ColumnKey.userId,
      accessorFn: (row) => row.userId,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label='User ID' />
      ),
      cell: ({ row }) => (
        <p className='truncate overflow-hidden'>{row.original.userId}</p>
      ),
      meta: {
        variant: 'text',
        placeholder: 'User ID',
        label: 'User ID',
        icon: TextIcon,
      },
      enableHiding: false,
      enableSorting: false,
    },
    {
      id: ColumnKey.createdAt,
      accessorFn: (row) => row.createdAt,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label='Created At' />
      ),
      cell: ({ row }) => (
        <p className='truncate overflow-hidden'>
          {format(row.original.createdAt, 'dd/MM/yyyy HH:mm aa')}
        </p>
      ),
      enableColumnFilter: false,
      enableSorting: true,
    },
  ]
}
