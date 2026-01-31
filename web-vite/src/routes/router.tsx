import * as Sentry from '@sentry/react'
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router'
import { ComingSoon } from '@/components/coming-soon'
import { PageActivityLogOverview } from '@/features/activity-log'
import PageActivityLogShow from '@/features/activity-log/show'
import { PageAdminOverview } from '@/features/admins'
import { PageAdminCreate } from '@/features/admins/create'
import { PageAdminEdit } from '@/features/admins/edit'
import { PageAdminShow } from '@/features/admins/show'
import { Apps } from '@/features/apps'
import { ForgotPassword } from '@/features/auth/forgot-password'
import { Otp } from '@/features/auth/otp'
import { ResetPassword } from '@/features/auth/reset-password'
import { SignIn } from '@/features/auth/sign-in'
import { SignIn2 } from '@/features/auth/sign-in/sign-in-2'
import { SignUp } from '@/features/auth/sign-up'
import { Chats } from '@/features/chats'
import { Dashboard } from '@/features/dashboard'
import { ForbiddenError } from '@/features/errors/forbidden'
import { GeneralError } from '@/features/errors/general-error'
import { MaintenanceError } from '@/features/errors/maintenance-error'
import { NotFoundError } from '@/features/errors/not-found-error'
import { UnauthorizedError } from '@/features/errors/unauthorized-error'
import { PageRoleOverview } from '@/features/roles'
import PageRoleCreate from '@/features/roles/create'
import { PageRoleEdit } from '@/features/roles/edit'
import PageRoleShow from '@/features/roles/show'
import { Settings } from '@/features/settings'
import { SettingsAccount } from '@/features/settings/account'
import { SettingsAppearance } from '@/features/settings/appearance'
import { SettingsDisplay } from '@/features/settings/display'
import { SettingsNotifications } from '@/features/settings/notifications'
import { SettingsPassword } from '@/features/settings/password'
import { SettingsProfile } from '@/features/settings/profile'
import { SettingsWebsite } from '@/features/settings/website'
import { PageUserOverview } from '@/features/users'
import { PageUserCreate } from '@/features/users/create'
import { PageUserEdit } from '@/features/users/edit'
import { PageUserShow } from '@/features/users/show'
import ProtectedRoutes from './protected-route'
import { RouteAuthorize } from './route-authorized'

const routes: RouteObject[] = [
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/sign-in-2',
    element: <SignIn2 />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/otp',
    element: <Otp />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/',
    element: <ProtectedRoutes />,
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        element: (
          <RouteAuthorize action='read' subject='ADMIN'>
            <Dashboard />
          </RouteAuthorize>
        ),
      },
      {
        path: '/apps',
        element: (
          <RouteAuthorize action='read' subject='ADMIN'>
            <Apps />
          </RouteAuthorize>
        ),
      },
      {
        path: '/chats',
        element: (
          <RouteAuthorize action='read' subject='ADMIN'>
            <Chats />
          </RouteAuthorize>
        ),
      },
      {
        path: '/admins',
        children: [
          {
            index: true,
            element: (
              <RouteAuthorize action='read' subject='ADMIN'>
                <PageAdminOverview />
              </RouteAuthorize>
            ),
          },
          {
            path: 'create',
            element: (
              <RouteAuthorize action='create' subject='ADMIN'>
                <PageAdminCreate />
              </RouteAuthorize>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <RouteAuthorize action='update' subject='ADMIN'>
                <PageAdminEdit />
              </RouteAuthorize>
            ),
          },
          {
            path: ':id/show',
            element: (
              <RouteAuthorize action='read' subject='ADMIN'>
                <PageAdminShow />
              </RouteAuthorize>
            ),
          },
        ],
      },
      {
        path: '/roles',
        children: [
          {
            index: true,
            element: (
              <RouteAuthorize action='read' subject='ROLE'>
                <PageRoleOverview />
              </RouteAuthorize>
            ),
          },
          {
            path: ':id/show',
            element: (
              <RouteAuthorize action='read' subject='ROLE'>
                <PageRoleShow />
              </RouteAuthorize>
            ),
          },
          {
            path: 'create',
            element: (
              <RouteAuthorize action='create' subject='ROLE'>
                <PageRoleCreate />
              </RouteAuthorize>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <RouteAuthorize action='update' subject='ROLE'>
                <PageRoleEdit />
              </RouteAuthorize>
            ),
          },
        ],
      },
      {
        path: '/settings',
        element: <Settings />,
        children: [
          {
            index: true,
            element: (
              <RouteAuthorize isAnyPermission>
                <SettingsProfile />
              </RouteAuthorize>
            ),
          },
          {
            path: 'account',
            element: (
              <RouteAuthorize isAnyPermission>
                <SettingsAccount />
              </RouteAuthorize>
            ),
          },
          {
            path: 'password',
            element: (
              <RouteAuthorize isAnyPermission>
                <SettingsPassword />
              </RouteAuthorize>
            ),
          },
          {
            path: 'appearance',
            element: (
              <RouteAuthorize isAnyPermission>
                <SettingsAppearance />
              </RouteAuthorize>
            ),
          },
          {
            path: 'notifications',
            element: (
              <RouteAuthorize isAnyPermission>
                <SettingsNotifications />
              </RouteAuthorize>
            ),
          },
          {
            path: 'display',
            element: (
              <RouteAuthorize isAnyPermission>
                <SettingsDisplay />
              </RouteAuthorize>
            ),
          },
          {
            path: 'website',
            element: (
              <RouteAuthorize isAnyPermission>
                <SettingsWebsite />
              </RouteAuthorize>
            ),
          },
        ],
      },
      {
        path: '/users',
        children: [
          {
            index: true,
            element: (
              <RouteAuthorize action='read' subject='USER'>
                <PageUserOverview />
              </RouteAuthorize>
            ),
          },
          {
            path: 'create',
            element: (
              <RouteAuthorize action='create' subject='USER'>
                <PageUserCreate />
              </RouteAuthorize>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <RouteAuthorize action='update' subject='USER'>
                <PageUserEdit />
              </RouteAuthorize>
            ),
          },
          {
            path: ':id/show',
            element: (
              <RouteAuthorize action='read' subject='ADMIN'>
                <PageUserShow />
              </RouteAuthorize>
            ),
          },
        ],
      },
      {
        path: 'logs',
        children: [
          {
            index: true,
            element: (
              <RouteAuthorize action='read' subject='LOG'>
                <PageActivityLogOverview />
              </RouteAuthorize>
            ),
          },
          {
            path: ':id/show',
            element: (
              <RouteAuthorize action='read' subject='LOG'>
                <PageActivityLogShow />
              </RouteAuthorize>
            ),
          },
        ],
      },
      {
        path: '/errors',
        children: [
          {
            path: 'not-found',
            element: <NotFoundError />,
          },
          {
            path: 'internal-server-error',
            element: <GeneralError />,
          },
          {
            path: 'unauthorized',
            element: <UnauthorizedError />,
          },
          {
            path: 'forbidden',
            element: <ForbiddenError />,
          },
          {
            path: 'maintenance-error',
            element: <MaintenanceError />,
          },
        ],
      },
      {
        path: 'help-center',
        element: <ComingSoon />,
      },
      {
        path: '*',
        element: <NotFoundError />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundError />,
  },
]

const sentryCreateBrowserRouter =
  Sentry.wrapCreateBrowserRouterV7(createBrowserRouter)

const router = sentryCreateBrowserRouter(routes)

const AppRouter = () => {
  return <RouterProvider router={router} />
}

export default AppRouter
