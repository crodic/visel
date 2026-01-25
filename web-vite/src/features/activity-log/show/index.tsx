import { format } from 'date-fns'
import { ArrowLeftIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Navigate, useNavigate, useParams } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DescriptionItem, Descriptions } from '@/components/common/descriptions'
import { ConfigDrawer } from '@/components/config-drawer'
import DataLoader from '@/components/layout/data-loader'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { useDataGetLogDetail } from '../queries'
import LogTable from './log-table'

export default function PageActivityLogShow() {
  const { t } = useTranslation()
  const params = useParams()
  const navigate = useNavigate()

  const { data, isFetching } = useDataGetLogDetail(params.id as string)

  if (isFetching) return <DataLoader />

  if (!data) {
    return <Navigate to='/errors/not-found' />
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

      <Main>
        <div className='space-y-8'>
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-bold'>{t('page_log_detail.title')}</h1>
            <div className='flex items-center gap-2'>
              <Button onClick={() => navigate(-1)} variant='outline'>
                <ArrowLeftIcon size={16} />
                <span>{t('page_log_detail.button_back')}</span>
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t('page_log_detail.card_title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Descriptions>
                <DescriptionItem
                  label={t('page_log_detail.id')}
                  value={data.id}
                />
                <DescriptionItem
                  label={t('page_log_detail.actor')}
                  value={data.userId || '-'}
                />
                <DescriptionItem
                  label={t('page_log_detail.action')}
                  value={data.action || ''}
                />
                <DescriptionItem
                  label={t('page_log_detail.entity')}
                  value={data.entity}
                />
                <DescriptionItem
                  label={t('page_log_detail.timestamp')}
                  value={format(data.createdAt, 'yyyy-MM-dd HH:mm aa')}
                />

                <div className='col-span-1 sm:col-span-2 md:col-span-3'>
                  <LogTable
                    oldValue={data.oldValue ?? undefined}
                    newValue={data.newValue ?? undefined}
                  />
                </div>
              </Descriptions>
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  )
}
