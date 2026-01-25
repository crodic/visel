import { useQuery } from '@tanstack/react-query'
import { Navigate } from 'react-router'
import DataLoader from '@/components/layout/data-loader'
import { apiGetMe } from '@/features/auth/queries'
import { ContentSection } from '../components/content-section'
import { AccountForm } from './account-form'
import DeleteAccount from './delete-account'

export function SettingsAccount() {
  const { data: currentUser, isFetching } = useQuery({
    queryKey: ['authenticated_user'],
    queryFn: apiGetMe,
  })

  if (isFetching) return <DataLoader />

  if (!currentUser) return <Navigate to='/errors/not-found' />

  return (
    <ContentSection
      title='Account'
      desc='Update your account settings. Set your preferred language and
          timezone.'
    >
      <div className='space-y-8'>
        <AccountForm user={currentUser} />
        <DeleteAccount />
      </div>
    </ContentSection>
  )
}
