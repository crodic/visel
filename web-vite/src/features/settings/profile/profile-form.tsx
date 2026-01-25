import { isAxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type User } from '@/types/auth.type'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import AvatarUploader from '@/components/forms/avatar-uploader'
import { apiUpdateMe } from '@/features/auth/queries'
import { profileFormSchema, type ProfileFormSchema } from '../schema'

export function ProfileForm({ user }: { user: User }) {
  const form = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: { bio: user?.bio, image: undefined },
    mode: 'onChange',
  })
  const queryClient = useQueryClient()

  const updateMeMutation = useMutation({
    mutationFn: apiUpdateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authenticated_user'] })
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message || 'Failed to update admin')
      }
    },
  })

  const onSubmit = (values: ProfileFormSchema) => {
    if (values.image === null) {
      values.removeAvatar = true
    }
    updateMeMutation.mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='image'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile photo</FormLabel>
              <FormControl>
                <AvatarUploader
                  viewportWidth={100}
                  viewportHeight={100}
                  field={field}
                  aspect={1}
                  cropShape='round'
                  defaultUri={user?.image}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Tell us a little bit about yourself'
                  className='resize-none'
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Update profile</Button>
      </form>
    </Form>
  )
}
