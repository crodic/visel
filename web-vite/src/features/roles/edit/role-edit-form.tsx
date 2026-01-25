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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Main } from '@/components/layout/main'
import { apiEditRole } from '@/features/roles/queries'
import { roleFormSchema, type RoleFormSchema, type RoleSchema } from '../schema'

export function RoleEditForm({ data }: { data: RoleSchema }) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const form = useForm<RoleFormSchema>({
    defaultValues: {
      name: data.name,
      description: data.description,
      permissions: data.permissions || [],
    },
    resolver: zodResolver(roleFormSchema),
  })

  const editRoleMutation = useMutation({
    mutationFn: apiEditRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['role_detail_key'] })
      queryClient.invalidateQueries({ queryKey: ['role_edit_key'] })
      toast.success('Role updated successfully')
      navigate(-1)
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message || 'Failed to update role')
      }
    },
  })

  const onSubmit = (values: RoleFormSchema) => {
    if (data.id) {
      editRoleMutation.mutate({ id: data.id, data: values })
    }
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

  const isSystemRole = data.permissions.includes('manage:all')

  return (
    <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='mb-2 flex flex-col items-baseline justify-between space-y-2 sm:flex-row sm:items-center'>
            <h2 className='text-2xl font-bold tracking-tight'>
              {t('page_role_edit.title')}
            </h2>
            <div className='flex w-full flex-wrap justify-end gap-2 sm:block sm:w-auto sm:justify-normal sm:space-x-2'>
              <Button
                variant='outline'
                type='button'
                onClick={() => navigate(-1)}
              >
                <ArrowLeftIcon className='h-4 w-4' />
                {t('button.cancel')}
              </Button>
              <Button type='submit' disabled={isSystemRole}>
                <SaveIcon className='h-4 w-4' />
                {t('button.save')}
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Role Information</CardTitle>
              <CardDescription>
                Fill in the details to update this role.
              </CardDescription>
            </CardHeader>
            <CardContent className='mt-4 flex flex-col gap-4 sm:gap-8 md:grid md:grid-cols-3'>
              {/* Name */}
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
                        disabled={isSystemRole}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <div className='col-span-3'>
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          value={field.value || undefined}
                          onChange={field.onChange}
                          placeholder='Enter description for this role'
                          className='min-h-24'
                          disabled={isSystemRole}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Permissions */}
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
                              handleParentChange(group.group, Boolean(checked))
                            }
                            disabled={isSystemRole}
                          />
                          <label className='font-semibold'>{group.group}</label>
                        </FormItem>

                        <div className='space-y-2 pl-6'>
                          {group.permissions.map((perm) => (
                            <FormItem
                              key={`${group.group}:${perm}`}
                              className='flex items-center space-x-2'
                            >
                              <Checkbox
                                checked={isPermissionChecked(group.group, perm)}
                                onCheckedChange={(checked) =>
                                  handleChildChange(
                                    group.group,
                                    perm,
                                    Boolean(checked)
                                  )
                                }
                                disabled={isSystemRole}
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
  )
}
