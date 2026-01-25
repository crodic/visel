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
import { getActivitiesTableColumns } from './columns'
import { useDataLogOverview } from './queries'
import { type ActivityLogSchema, ColumnKey } from './schema'

const activitiesFilterParsers = {
  entityId: parseAsString.withDefault(''),
  entity: parseAsString.withDefault(''),
  action: parseAsArrayOf(parseAsString, ',').withDefault([]),
  userId: parseAsString.withDefault(''),
} as const

const ENABLE_SEARCH_BY_MODE = true

export function PageActivityLogOverview() {
  const navigate = useNavigate()

  const {
    page,
    perPage,
    sorting: sort,
    filter,
  } = useGetFilterParams<ActivityLogSchema, typeof activitiesFilterParsers>({
    allowedSorts: [ColumnKey.entityId, ColumnKey.createdAt],
    filterParsers: activitiesFilterParsers,
  })

  const builder = new PaginateQueryBuilder()
    .page(page)
    .limit(perPage)
    .ilike('entityId', filter.entityId)
    .ilike('entity', filter.entity)
    .eq('userId', filter.userId)
    .in('action', filter.action || [])
    .sortBy(sortParser(sort).sortBy, sortParser(sort).sortDirection)

  const { data, isFetching } = useDataLogOverview(builder.build())

  const columns = useMemo(
    () =>
      getActivitiesTableColumns({ actions: ['UPDATE', 'INSERT', 'DELETE'] }),
    []
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

  const handleRowClick = (log: ActivityLogSchema) => {
    navigate(`/logs/${log.id}/show`)
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

      <Main fluid className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Activity Log Overview
            </h2>
            <p className='text-muted-foreground'>
              Manage your activity log here.
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
          enableAdvancedColumnsFilter
          isDataLoading={isFetching}
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
