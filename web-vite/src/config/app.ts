export default {
  name: 'shadcn-admin',
  description: 'Shadcn Admin Template',
  isSupperAdmin: (permissions: string[]) =>
    permissions
      .map((perm) => ({
        action: perm.split(':')[0],
        subject: perm.split(':')[1],
      }))
      .some((claim) => claim.subject === 'all' && claim.action === 'manage'),
}
