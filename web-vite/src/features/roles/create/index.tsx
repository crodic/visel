/* eslint-disable @typescript-eslint/no-unused-expressions */
import { isAxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowLeftIcon, SaveIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { groupPermission } from '@/lib/permissions'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { apiCreateRole } from '../queries'
import { roleFormSchema, type RoleFormSchema } from '../schema'

export default function PageRoleCreate() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const form = useForm<RoleFormSchema>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      permissions: [],
    },
  })

  const createRoleMutate = useMutation({
    mutationFn: apiCreateRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['role_overview_key'] })
      toast.success('Role created successfully')
      navigate('/roles')
    },
    onError: (error) => {
      if (isAxiosError(error)) toast.error(error.response?.data.message)
    },
  })

  const onSubmit = (values: RoleFormSchema) => {
    createRoleMutate.mutate(values)
  }

  const selectedPermissions = form.watch('permissions')
  const permissionKey = (action: string, subject: string) =>
    `${action}:${subject}`

  const handleParentChange = (group: string, checked: boolean) => {
    const perms =
      groupPermission.find((g) => g.group === group)?.permissions || []
    const current = new Set(selectedPermissions)

    perms.forEach((action) => {
      const key = permissionKey(action, group)
      checked ? current.add(key) : current.delete(key)
    })

    form.setValue('permissions', Array.from(current))
  }

  const handleChildChange = (group: string, perm: string, checked: boolean) => {
    const key = permissionKey(perm, group)
    const current = new Set(selectedPermissions)
    checked ? current.add(key) : current.delete(key)
    form.setValue('permissions', Array.from(current))
  }

  const isGroupChecked = (group: string) => {
    const perms =
      groupPermission.find((g) => g.group === group)?.permissions || []
    return perms.every((action) =>
      selectedPermissions.includes(permissionKey(action, group))
    )
  }

  const isPermissionChecked = (subject: string, action: string) => {
    return selectedPermissions.includes(permissionKey(action, subject))
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='flex items-center justify-between'>
              <h3 className='text-2xl font-bold'>
                {t('page_role_create.title')}
              </h3>
              <div className='flex items-center gap-2'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => navigate(-1)}
                >
                  <ArrowLeftIcon size={16} />
                  {t('page_role_create.button_cancel')}
                </Button>
                <Button type='submit'>
                  <SaveIcon size={16} />
                  {t('page_role_create.button_save')}
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className='grid grid-cols-1 items-start gap-8 md:grid-cols-3'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='md:col-span-3'>
                      <FormLabel required>
                        {t('page_role_create.create_name')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t('page_role_create.create_name')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='col-span-3'>
                  <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t('page_role_create.create_name')}
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            value={field.value || undefined}
                            onChange={field.onChange}
                            placeholder='Enter description for this role'
                            className='min-h-24'
                          ></Textarea>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='col-span-3 space-y-2'>
                  <h6
                    className={cn(
                      form.formState.errors.permissions && 'text-destructive',
                      'font-semibold'
                    )}
                  >
                    {t('page_role_create.create_permissions')}
                  </h6>
                  <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
                    {groupPermission
                      .filter((gr) => gr.group !== 'manage')
                      .map((group) => (
                        <div
                          key={group.group}
                          className='space-y-2 rounded-md border p-4'
                        >
                          <FormItem className='flex items-center space-x-2'>
                            <Checkbox
                              checked={isGroupChecked(group.group)}
                              onCheckedChange={(checked) =>
                                handleParentChange(
                                  group.group,
                                  Boolean(checked)
                                )
                              }
                            />
                            <label className='font-semibold'>
                              {group.group}
                            </label>
                          </FormItem>

                          <div className='space-y-2 pl-6'>
                            {group.permissions.map((perm) => (
                              <FormItem
                                key={`${group.group}:${perm}`}
                                className='flex items-center space-x-2'
                              >
                                <Checkbox
                                  checked={isPermissionChecked(
                                    group.group,
                                    perm
                                  )}
                                  onCheckedChange={(checked) =>
                                    handleChildChange(
                                      group.group,
                                      perm,
                                      Boolean(checked)
                                    )
                                  }
                                />
                                <label>{perm.toUpperCase()}</label>
                              </FormItem>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                  {form.formState.errors.permissions && (
                    <p className='text-sm text-red-500'>
                      {form.formState.errors.permissions.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </Main>
    </>
  )
}
