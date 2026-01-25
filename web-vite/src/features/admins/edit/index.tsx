import { Navigate, useParams } from 'react-router'
import { ConfigDrawer } from '@/components/config-drawer'
import DataLoader from '@/components/layout/data-loader'
import { Header } from '@/components/layout/header'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { useDataGetAdminEdit } from '../queries'
import { AdminEditForm } from './admin-edit-form'

export function PageAdminEdit() {
  const params = useParams()

  const { data, isFetching } = useDataGetAdminEdit(params.id as string)

  if (isFetching) return <DataLoader />

  if (!data) return <Navigate to='/errors/not-found' />

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

      <AdminEditForm data={data} />
    </>
  )
}
