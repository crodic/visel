import { ContentSection } from '../components/content-section'
import WebsiteForm from './website-form'

export function SettingsWebsite() {
  return (
    <ContentSection title='Website' desc='Manage website system.'>
      <WebsiteForm />
    </ContentSection>
  )
}
