import { useLocation, useNavigate } from 'react-router'
import { useAuthStore } from '@/stores/auth-store'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { apiSignOut } from '@/features/auth/queries'

interface SignOutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout, meta } = useAuthStore()

  const handleSignOut = async () => {
    await apiSignOut(meta.refreshToken)
    logout()

    const currentPath = location.pathname
    navigate(`/sign-in${currentPath ? `?redirect=${currentPath}` : ''}`, {
      replace: true,
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Sign out'
      desc='Are you sure you want to sign out? You will need to sign in again to access your account.'
      confirmText='Sign out'
      destructive
      handleConfirm={handleSignOut}
      className='sm:max-w-sm'
    />
  )
}
