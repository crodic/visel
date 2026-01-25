import { useState } from 'react'
import { AxiosError } from 'axios'
import { format } from 'date-fns'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowLeftIcon, Edit2Icon, Trash2Icon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Navigate, useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DeleteAlertDialog } from '@/components/common/delete-alert-dialog'
import { DescriptionItem, Descriptions } from '@/components/common/descriptions'
import { ConfigDrawer } from '@/components/config-drawer'
import DataLoader from '@/components/layout/data-loader'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { apiDeleteRole, useDataRoleById } from '../queries'

export default function PageRoleShow() {
  const params = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const [isShowDeleteDialog, setIsShowDeleteDialog] = useState(false)

  const { data, isFetching } = useDataRoleById(params.id as string)

  const deleteRoleMutation = useMutation({
    mutationFn: apiDeleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['role_overview_key'],
      })
      toast.success('Role deleted successfully.')
      setIsShowDeleteDialog(false)
      navigate('/roles')
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    },
  })

  const handleDelete = () => {
    if (params.id) {
      deleteRoleMutation.mutate(params.id)
    }
  }

  const isSuperAdmin = data?.permissions
    .map((perm) => ({
      action: perm.split(':')[0],
      subject: perm.split(':')[1],
    }))
    .some((claim) => claim.subject === 'all' && claim.action === 'manage')

  if (isFetching) return <DataLoader />

  if (!data) {
    return <Navigate to='/errors/not-found' />
  }

  return (
    <>
      {isShowDeleteDialog && (
        <DeleteAlertDialog
          open={isShowDeleteDialog}
          onOpenChange={(open) => setIsShowDeleteDialog(open)}
          handleDelete={() => handleDelete()}
          isLoading={deleteRoleMutation.isPending}
        />
      )}
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
            <h1 className='text-2xl font-bold'>
              {t('page_role_detail.title')}
            </h1>
            <div className='flex items-center gap-2'>
              <Button onClick={() => navigate(-1)} variant='outline'>
                <ArrowLeftIcon size={16} />
                <span>{t('page_role_detail.button_back')}</span>
              </Button>
              <Button
                onClick={() => navigate(`/roles/${data.id}/edit`)}
                variant='default'
                disabled={isSuperAdmin}
              >
                <Edit2Icon size={16} />
                <span>{t('page_role_detail.button_edit')}</span>
              </Button>
              <Button
                variant='destructive'
                onClick={() => setIsShowDeleteDialog(true)}
                disabled={isSuperAdmin}
              >
                <Trash2Icon size={16} />
                <span>{t('page_role_detail.button_delete')}</span>
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Role Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Descriptions>
                <DescriptionItem
                  label={t('page_role_detail.id')}
                  value={data.id}
                />
                <DescriptionItem
                  label={t('page_role_detail.name')}
                  value={data.name}
                />
                <div className='col-span-3'>
                  <DescriptionItem
                    label={t('page_role_detail.permissions')}
                    value={
                      isSuperAdmin
                        ? 'SUPER ADMIN'
                        : data.permissions
                            .map((perm) => perm.toUpperCase())
                            .join(', ')
                    }
                  />
                </div>
                <div className='col-span-3'>
                  <DescriptionItem
                    label={t('page_role_detail.description')}
                    value={data.description}
                  />
                </div>
                <DescriptionItem
                  label={t('page_role_detail.created_at')}
                  value={format(data.createdAt, 'yyyy-MM-dd HH:mm aa')}
                />
                <DescriptionItem
                  label={t('page_role_detail.updated_at')}
                  value={format(data.updatedAt, 'yyyy-MM-dd HH:mm aa')}
                />
              </Descriptions>
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  )
}
