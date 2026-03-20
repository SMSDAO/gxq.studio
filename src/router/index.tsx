import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { DashboardLayout } from '@/components/layout/DashboardLayout'

// Public pages
import { Landing } from '@/pages/Landing'
import { Login } from '@/pages/Login'
import { NotFound } from '@/pages/NotFound'

// User pages
import { UserDashboard } from '@/pages/user/UserDashboard'
import { Profile } from '@/pages/user/Profile'
import { SwapInterface } from '@/pages/user/SwapInterface'
import { FlashLoans } from '@/pages/user/FlashLoans'
import { ContractBuilder } from '@/pages/user/ContractBuilder'
import { Templates } from '@/pages/user/Templates'

// Dev pages
import { DevDashboard } from '@/pages/dev/DevDashboard'
import { APIExplorer } from '@/pages/dev/APIExplorer'
import { WebhookManager } from '@/pages/dev/WebhookManager'
import { DeploymentStatus } from '@/pages/dev/DeploymentStatus'
import { Logs } from '@/pages/dev/Logs'

// Admin pages
import { AdminDashboard } from '@/pages/admin/AdminDashboard'
import { UserManagement } from '@/pages/admin/UserManagement'
import { RolePermissions } from '@/pages/admin/RolePermissions'
import { SystemSettings } from '@/pages/admin/SystemSettings'
import { AuditLog } from '@/pages/admin/AuditLog'

export default function AppRouter() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Authenticated — User + Dev + Admin */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/swap" element={<SwapInterface />} />
        <Route path="/flash-loans" element={<FlashLoans />} />
        <Route path="/contracts" element={<ContractBuilder />} />
        <Route path="/templates" element={<Templates />} />

        {/* Dev routes */}
        <Route path="/dev" element={<ProtectedRoute allowedRoles={['dev', 'admin']}><DevDashboard /></ProtectedRoute>} />
        <Route path="/dev/api" element={<ProtectedRoute allowedRoles={['dev', 'admin']}><APIExplorer /></ProtectedRoute>} />
        <Route path="/dev/webhooks" element={<ProtectedRoute allowedRoles={['dev', 'admin']}><WebhookManager /></ProtectedRoute>} />
        <Route path="/dev/deployments" element={<ProtectedRoute allowedRoles={['dev', 'admin']}><DeploymentStatus /></ProtectedRoute>} />
        <Route path="/dev/logs" element={<ProtectedRoute allowedRoles={['dev', 'admin']}><Logs /></ProtectedRoute>} />

        {/* Admin routes */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><UserManagement /></ProtectedRoute>} />
        <Route path="/admin/roles" element={<ProtectedRoute allowedRoles={['admin']}><RolePermissions /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><SystemSettings /></ProtectedRoute>} />
        <Route path="/admin/audit" element={<ProtectedRoute allowedRoles={['admin']}><AuditLog /></ProtectedRoute>} />
      </Route>

      {/* Redirects */}
      <Route path="/app" element={<Navigate to="/dashboard" replace />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
