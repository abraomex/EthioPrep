import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout, DashboardLayout, ExamLayout, AdminLayout } from '../components/layout';
import { AdminRoute } from '../components/layout/AdminRoute';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';
import { LoadingState } from '../components/ui/LoadingState';

// Helper for lazy suspense wrapper
function Lazy({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingState variant="spinner" size="full-page" label="Loading page..." />}>
      {children}
    </Suspense>
  );
}

// Immediate load for fastest First Contentful Paint (FCP) on landing & auth
import { HomePage } from '../pages/HomePage';
import { SubjectCatalogPage } from '../pages/SubjectCatalogPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { NotFoundPage } from '../pages/NotFoundPage';

// Code-split pages: Low-Bandwidth optimization for Ethiopian mobile connections
const SubjectDetailPage = lazy(() => import('../pages/SubjectDetailPage').then(m => ({ default: m.SubjectDetailPage })));
const ResourceLibraryPage = lazy(() => import('../pages/ResourceLibraryPage').then(m => ({ default: m.ResourceLibraryPage })));
const AboutPage = lazy(() => import('../pages/AboutPage').then(m => ({ default: m.AboutPage })));
const LessonViewerPage = lazy(() => import('../pages/LessonViewerPage').then(m => ({ default: m.LessonViewerPage })));
const TopicPracticePage = lazy(() => import('../pages/TopicPracticePage').then(m => ({ default: m.TopicPracticePage })));
const ExamInstructionsPage = lazy(() => import('../pages/ExamInstructionsPage').then(m => ({ default: m.ExamInstructionsPage })));
const ActiveExamPage = lazy(() => import('../pages/ActiveExamPage').then(m => ({ default: m.ActiveExamPage })));
const ExamResultsPage = lazy(() => import('../pages/ExamResultsPage').then(m => ({ default: m.ExamResultsPage })));

// Student dashboard
const DashboardPage = lazy(() => import('../pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const BookmarksPage = lazy(() => import('../pages/BookmarksPage').then(m => ({ default: m.BookmarksPage })));
const HistoryPage = lazy(() => import('../pages/HistoryPage').then(m => ({ default: m.HistoryPage })));
const ProfilePage = lazy(() => import('../pages/ProfilePage').then(m => ({ default: m.ProfilePage })));

// Admin CMS pages (isolated chunk, zero bandwidth penalty for students)
const AdminOverviewPage = lazy(() => import('../pages/admin/AdminOverviewPage').then(m => ({ default: m.AdminOverviewPage })));
const AdminSubjectsPage = lazy(() => import('../pages/admin/AdminSubjectsPage').then(m => ({ default: m.AdminSubjectsPage })));
const AdminLessonsPage = lazy(() => import('../pages/admin/AdminLessonsPage').then(m => ({ default: m.AdminLessonsPage })));
const AdminQuestionsPage = lazy(() => import('../pages/admin/AdminQuestionsPage').then(m => ({ default: m.AdminQuestionsPage })));
const AdminExamsPage = lazy(() => import('../pages/admin/AdminExamsPage').then(m => ({ default: m.AdminExamsPage })));
const AdminResourcesPage = lazy(() => import('../pages/admin/AdminResourcesPage').then(m => ({ default: m.AdminResourcesPage })));

export const router = createBrowserRouter([
  // Public & Learning Routes (Header + Footer + MobileNav)
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/subjects', element: <SubjectCatalogPage /> },
      { path: '/subjects/:slug', element: <Lazy><SubjectDetailPage /></Lazy> },
      { path: '/resources', element: <Lazy><ResourceLibraryPage /></Lazy> },
      { path: '/about', element: <Lazy><AboutPage /></Lazy> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/lessons/:id', element: <Lazy><LessonViewerPage /></Lazy> },
      { path: '/practice/:topicId', element: <Lazy><TopicPracticePage /></Lazy> },
      { path: '/exams/:id/instructions', element: <Lazy><ExamInstructionsPage /></Lazy> },
      { path: '/attempts/:id/results', element: <Lazy><ExamResultsPage /></Lazy> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },

  // Student Dashboard Protected Routes (Header + Sidebar + Content + MobileNav)
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: '/dashboard', element: <Lazy><DashboardPage /></Lazy> },
          { path: '/bookmarks', element: <Lazy><BookmarksPage /></Lazy> },
          { path: '/history', element: <Lazy><HistoryPage /></Lazy> },
          { path: '/profile', element: <Lazy><ProfilePage /></Lazy> },
        ],
      },
    ],
  },

  // Active Exam Immersive Route (Zero navigation, full focus)
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <ExamLayout />,
        children: [
          { path: '/exams/:id/attempt', element: <Lazy><ActiveExamPage /></Lazy> },
        ],
      },
    ],
  },

  // Admin CMS Protected Routes (Admin Header + Admin Sidebar)
  {
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: '/admin', element: <Lazy><AdminOverviewPage /></Lazy> },
          { path: '/admin/subjects', element: <Lazy><AdminSubjectsPage /></Lazy> },
          { path: '/admin/lessons', element: <Lazy><AdminLessonsPage /></Lazy> },
          { path: '/admin/questions', element: <Lazy><AdminQuestionsPage /></Lazy> },
          { path: '/admin/exams', element: <Lazy><AdminExamsPage /></Lazy> },
          { path: '/admin/resources', element: <Lazy><AdminResourcesPage /></Lazy> },
        ],
      },
    ],
  },
]);
