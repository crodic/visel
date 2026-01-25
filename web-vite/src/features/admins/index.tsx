import { useMemo } from 'react'
import { PlusIcon } from 'lucide-react'
import { parseAsArrayOf, parseAsString } from 'nuqs'
import { useNavigate } from 'react-router'
import { PaginateQueryBuilder } from '@/lib/queryBuilder'
import { sortParser } from '@/lib/utils'
import { useDataTable } from '@/hooks/use-data-table'
import useGetFilterParams from '@/hooks/use-get-filter-params'
import { Button } from '@/components/ui/button'
import { ConfigDrawer } from '@/components/config-drawer'
import { DataTable } from '@/components/data-table/data-table'
import { DataTableSortList } from '@/components/data-table/data-table-sort-list'
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { useDataRoleFormOptions } from '../roles/queries'
import { getAdminsTableColumns } from './columns'
import { useDataAdminOverview } from './queries'
import { type AdminSchema, ColumnKeys } from './schema'

const adminsFilterParsers = {
  email: parseAsString,
  fullName: parseAsString,
  role: parseAsArrayOf(parseAsString, ','),
} as const

const ENABLE_SEARCH_BY_MODE = true

export function PageAdminOverview() {
  const navigate = useNavigate()

  const {
    page,
    perPage,
    sorting: sort,
    filter,
  } = useGetFilterParams<AdminSchema, typeof adminsFilterParsers>({
    allowedSorts: [
      ColumnKeys.email,
      ColumnKeys.fullName,
      ColumnKeys.verifiedAt,
    ],
    filterParsers: adminsFilterParsers,
  })

  const builder = new PaginateQueryBuilder()
    .page(page)
    .limit(perPage)
    .ilike('email', filter.email)
    .ilike('fullName', filter.fullName)
    .in('role.id', filter.role || [])
    .sortBy(sortParser(sort).sortBy, sortParser(sort).sortDirection)

  const { data, isFetching } = useDataAdminOverview(builder.build())
  const { data: rolesData } = useDataRoleFormOptions()

  const columns = useMemo(
    () => getAdminsTableColumns({ roles: rolesData }),
    [rolesData]
  )

  const totalPages = data?.meta.totalPages ?? 0

  const { table } = useDataTable({
    data: data?.data ?? [],
    columns: columns,
    pageCount: totalPages,
    initialState: {
      columnPinning: { right: ['actions'] },
    },
    getRowId: (row) => row.id,
  })

  const handleRowClick = (admin: AdminSchema) => {
    navigate(`/admins/${admin.id}/show`)
  }

  return (
    <>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Admin Overview
            </h2>
            <p className='text-muted-foreground'>
              Manage your admins and their roles here.
            </p>
          </div>
          <div>
            <Button onClick={() => navigate('create')}>
              <PlusIcon />
              Create
            </Button>
          </div>
        </div>
        <DataTable
          table={table}
          onRowClick={handleRowClick}
          isDataLoading={isFetching}
          enableAdvancedColumnsFilter
        >
          <DataTableToolbar
            table={table}
            enableSearchByMode={ENABLE_SEARCH_BY_MODE}
          >
            <DataTableSortList table={table} />
          </DataTableToolbar>
        </DataTable>
      </Main>
    </>
  )
}
