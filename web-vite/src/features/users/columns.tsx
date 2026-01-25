import { format } from 'date-fns'
import type { ColumnDef } from '@tanstack/react-table'
import { Calendar, MailIcon, UserIcon, UserRoundCheckIcon } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { ColumnKey, type UserSchema } from '../users/schema'
import ComponentTableRowActions from './component-table-row-action'

export function getUsersTableColumns(): ColumnDef<UserSchema>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          aria-label='Select all'
          className='translate-y-0.5'
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          aria-label='Select row'
          className='translate-y-0.5'
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
      enableHiding: false,
      enableSorting: false,
      size: 40,
      minSize: 40,
    },
    {
      id: ColumnKey.id,
      accessorFn: (row) => row.id,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label='ID' />
      ),
      cell: ({ row }) => <p className='truncate'>{row.original.id}</p>,
      meta: {
        label: 'ID',
        placeholder: 'Search by ID...',
        variant: 'text',
        icon: UserRoundCheckIcon,
      },
      enableColumnFilter: true,
      enableHiding: false,
      enableSorting: false,
      minSize: 100,
    },
    {
      id: ColumnKey.email,
      accessorFn: (row) => row.email,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label='Email' />
      ),
      cell: ({ row }) => <div className='truncate'>{row.original.email}</div>,
      meta: {
        label: 'Email',
        placeholder: 'Search by email...',
        variant: 'text',
        icon: MailIcon,
      },
      enableSorting: false,
      enableColumnFilter: true,
      enableHiding: false,
    },
    {
      id: ColumnKey.username,
      accessorFn: (row) => row.username,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label='Username' />
      ),
      cell: ({ row }) => <p className='truncate'>{row.original.username}</p>,
      meta: {
        label: 'Username',
        placeholder: 'Search by username...',
        variant: 'text',
        icon: UserIcon,
      },
      enableColumnFilter: true,
      enableHiding: false,
      enableSorting: false,
      minSize: 170,
    },
    {
      id: ColumnKey.createdAt,
      accessorFn: (row) => row.createdAt,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label='Created At' />
      ),
      meta: {
        label: 'Created At',
        variant: 'dateRange',
        icon: Calendar,
      },
      cell: ({ row }) => (
        <p>{format(row.original.createdAt, 'dd/MM/yyyy HH:mm aa')}</p>
      ),
      enableColumnFilter: true,
    },
    {
      id: 'actions',
      accessorKey: 'actions',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label='Actions' />
      ),
      cell: ({ row }) => <ComponentTableRowActions row={row} />,
      meta: {
        variant: 'reset',
      },
      size: 40,
      enableColumnFilter: true,
      enableHiding: false,
      enableSorting: false,
    },
  ]
}
