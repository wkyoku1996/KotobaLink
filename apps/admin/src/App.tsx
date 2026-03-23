import { Navigate, Route, Routes } from 'react-router-dom';

import { RequireAuth } from './auth/RequireAuth';
import { AppShell } from './components/AppShell';
import { ActivitiesPage } from './pages/ActivitiesPage';
import { AssignmentsPage } from './pages/AssignmentsPage';
import { ClassesPage } from './pages/ClassesPage';
import { ContentPage } from './pages/ContentPage';
import { CoursesPage } from './pages/CoursesPage';
import { DashboardPage } from './pages/DashboardPage';
import { DictionariesPage } from './pages/DictionariesPage';
import { LeaveAdjustmentsPage } from './pages/LeaveAdjustmentsPage';
import { LessonRecordsPage } from './pages/LessonRecordsPage';
import { MaterialAssetsPage } from './pages/MaterialAssetsPage';
import { MaterialDetailPage } from './pages/MaterialDetailPage';
import { MaterialLibraryPage } from './pages/MaterialLibraryPage';
import { MaterialPublishPage } from './pages/MaterialPublishPage';
import { MaterialUnitDetailPage } from './pages/MaterialUnitDetailPage';
import { MaterialUnitsPage } from './pages/MaterialUnitsPage';
import { MembershipsPage } from './pages/MembershipsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { OrdersPage } from './pages/OrdersPage';
import { PermissionsPage } from './pages/PermissionsPage';
import { SchedulePage } from './pages/SchedulePage';
import { SettingsPage } from './pages/SettingsPage';
import { StudentsPage } from './pages/StudentsPage';
import { SystemHealthPage } from './pages/SystemHealthPage';
import { TeachingMaterialsPage } from './pages/TeachingMaterialsPage';
import { TeachersPage } from './pages/TeachersPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { LoginPage } from './pages/LoginPage';


export default function App() {
  const allRoles = ['super_admin', 'ops_admin', 'teacher'];
  const opsRoles = ['super_admin', 'ops_admin'];

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        element={
          <RequireAuth>
            <AppShell />
          </RequireAuth>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="/workspace" element={<WorkspacePage />} />
        <Route
          path="/students"
          element={
            <RequireAuth allowedRoles={allRoles}>
              <StudentsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/teachers"
          element={
            <RequireAuth allowedRoles={opsRoles}>
              <TeachersPage />
            </RequireAuth>
          }
        />
        <Route
          path="/courses"
          element={
            <RequireAuth allowedRoles={allRoles}>
              <CoursesPage />
            </RequireAuth>
          }
        />
        <Route
          path="/classes"
          element={
            <RequireAuth allowedRoles={allRoles}>
              <ClassesPage />
            </RequireAuth>
          }
        />
        <Route
          path="/materials"
          element={
            <RequireAuth allowedRoles={allRoles}>
              <TeachingMaterialsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/materials/library"
          element={
            <RequireAuth allowedRoles={allRoles}>
              <MaterialLibraryPage />
            </RequireAuth>
          }
        />
        <Route
          path="/materials/library/:materialId"
          element={
            <RequireAuth allowedRoles={allRoles}>
              <MaterialDetailPage />
            </RequireAuth>
          }
        />
        <Route
          path="/materials/units"
          element={
            <RequireAuth allowedRoles={allRoles}>
              <MaterialUnitsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/materials/units/:unitId"
          element={
            <RequireAuth allowedRoles={allRoles}>
              <MaterialUnitDetailPage />
            </RequireAuth>
          }
        />
        <Route
          path="/materials/assets"
          element={
            <RequireAuth allowedRoles={opsRoles}>
              <MaterialAssetsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/materials/publish"
          element={
            <RequireAuth allowedRoles={opsRoles}>
              <MaterialPublishPage />
            </RequireAuth>
          }
        />
        <Route
          path="/schedule"
          element={
            <RequireAuth allowedRoles={opsRoles}>
              <SchedulePage />
            </RequireAuth>
          }
        />
        <Route
          path="/orders"
          element={
            <RequireAuth allowedRoles={opsRoles}>
              <OrdersPage />
            </RequireAuth>
          }
        />
        <Route
          path="/memberships"
          element={
            <RequireAuth allowedRoles={opsRoles}>
              <MembershipsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/activities"
          element={
            <RequireAuth allowedRoles={opsRoles}>
              <ActivitiesPage />
            </RequireAuth>
          }
        />
        <Route
          path="/notifications"
          element={
            <RequireAuth allowedRoles={allRoles}>
              <NotificationsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/assignments"
          element={
            <RequireAuth allowedRoles={['teacher']}>
              <AssignmentsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/leave-adjustments"
          element={
            <RequireAuth allowedRoles={['teacher']}>
              <LeaveAdjustmentsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/lesson-records"
          element={
            <RequireAuth allowedRoles={['teacher']}>
              <LessonRecordsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/content"
          element={
            <RequireAuth allowedRoles={opsRoles}>
              <ContentPage />
            </RequireAuth>
          }
        />
        <Route
          path="/settings"
          element={
            <RequireAuth allowedRoles={['super_admin']}>
              <SettingsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/permissions"
          element={
            <RequireAuth allowedRoles={['super_admin']}>
              <PermissionsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/dictionaries"
          element={
            <RequireAuth allowedRoles={['super_admin']}>
              <DictionariesPage />
            </RequireAuth>
          }
        />
        <Route
          path="/system-health"
          element={
            <RequireAuth allowedRoles={['super_admin']}>
              <SystemHealthPage />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
