import { useMemo } from 'react'
import { PlusIcon } from 'lucide-react'
import { parseAsArrayOf, parseAsInteger, parseAsString } from 'nuqs'
import { useNavigate } from 'react-router'
import { PaginateQueryBuilder } from '@/lib/queryBuilder'
import { normalizeDate, sortParser } from '@/lib/utils'
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
import { useDataUserOverview } from '../users/queries'
import { ColumnKey, type UserSchema } from '../users/schema'
import { getUsersTableColumns } from './columns'
import { UsersTableActionBar } from './users-table-action-bar'

const userFilterParsers = {
  [ColumnKey.email]: parseAsString,
  [ColumnKey.username]: parseAsString,
  [ColumnKey.createdAt]: parseAsArrayOf(parseAsInteger, ','),
  [ColumnKey.id]: parseAsString,
} as const

const ENABLE_SEARCH_BY_MODE = true

export function PageUserOverview() {
  const navigate = useNavigate()

  const handleRowClick = (row: UserSchema) => {
    navigate(`/users/${row.id}/show`)
  }

  const columns = useMemo(() => getUsersTableColumns(), [])

  const {
    page,
    perPage,
    sorting: sort,
    filter,
    search,
    searchBy,
  } = useGetFilterParams<UserSchema, typeof userFilterParsers>({
    allowedSorts: [ColumnKey.createdAt],
    filterParsers: userFilterParsers,
  })

  const createdFrom = normalizeDate(filter.createdAt?.[0])
  const createdTo = normalizeDate(filter.createdAt?.[1])

  const builder = new PaginateQueryBuilder()
    .page(page)
    .limit(perPage)
    .btw('createdAt', createdFrom, createdTo)
    .ilike('email', filter.email)
    .ilike('username', filter.username)
    .eq('id', filter.id)
    .sortBy(sortParser(sort).sortBy, sortParser(sort).sortDirection)
    .search(search)
    .addSearchBy(
      ENABLE_SEARCH_BY_MODE || search ? searchBy.split(',') : undefined,
      ENABLE_SEARCH_BY_MODE ? ['email', 'username'] : []
    )

  const { data, isFetching } = useDataUserOverview(builder.build())

  const { table, setGlobalSearch, globalSearch } = useDataTable({
    data: data?.data ?? [],
    columns,
    pageCount: data?.meta.totalPages ?? -1,
    initialState: {
      columnPinning: { right: ['actions'] },
    },
    getRowId: (originalRow) => originalRow.id,
    clearOnDefault: true,
  })

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
            <h2 className='text-2xl font-bold tracking-tight'>User Overview</h2>
            <p className='text-muted-foreground'>Manage your users here.</p>
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
          actionBar={<UsersTableActionBar table={table} />}
          onRowClick={handleRowClick}
          enableAdvancedColumnsFilter
          isDataLoading={isFetching}
        >
          <DataTableToolbar
            table={table}
            onSearchAll={setGlobalSearch}
            searchValue={globalSearch}
            enableAdvancedToolbarFilter
            enableSearchByMode={ENABLE_SEARCH_BY_MODE}
          >
            <DataTableSortList table={table} align='end' />
          </DataTableToolbar>
        </DataTable>
      </Main>
    </>
  )
}
