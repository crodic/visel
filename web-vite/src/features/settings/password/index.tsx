import { ContentSection } from '../components/content-section'
import PasswordForm from './password-form'

export function SettingsPassword() {
  return (
    <ContentSection
      title='Password'
      desc="Update your password to ensure your account's security."
    >
      <PasswordForm />
    </ContentSection>
  )
}
