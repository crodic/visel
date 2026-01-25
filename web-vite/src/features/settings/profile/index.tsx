import { useQuery } from '@tanstack/react-query'
import { Navigate } from 'react-router'
import DataLoader from '@/components/layout/data-loader'
import { apiGetMe } from '@/features/auth/queries'
import { ContentSection } from '../components/content-section'
import { ProfileForm } from './profile-form'

export function SettingsProfile() {
  const { data: currentUser, isFetching } = useQuery({
    queryKey: ['authenticated_user'],
    queryFn: apiGetMe,
  })

  if (isFetching) return <DataLoader />

  if (!currentUser) return <Navigate to='/errors/not-found' />

  return (
    <ContentSection
      title='Profile'
      desc='This is how others will see you on the site.'
    >
      <ProfileForm user={currentUser} />
    </ContentSection>
  )
}
