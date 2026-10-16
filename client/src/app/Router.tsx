import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout, DashboardLayout, ExamLayout, AdminLayout } from '../components/layout';

// Public pages
import { HomePage } from '../pages/HomePage';
import { SubjectCatalogPage } from '../pages/SubjectCatalogPage';
import { SubjectDetailPage } from '../pages/SubjectDetailPage';
import { ResourceLibraryPage } from '../pages/ResourceLibraryPage';
import { AboutPage } from '../pages/AboutPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { NotFoundPage } from '../pages/NotFoundPage';

// Student & Learning pages
import { DashboardPage } from '../pages/DashboardPage';
import { LessonViewerPage } from '../pages/LessonViewerPage';
import { TopicPracticePage } from '../pages/TopicPracticePage';
import { ExamInstructionsPage } from '../pages/ExamInstructionsPage';
import { ActiveExamPage } from '../pages/ActiveExamPage';
import { ExamResultsPage } from '../pages/ExamResultsPage';
import { BookmarksPage } from '../pages/BookmarksPage';
import { HistoryPage } from '../pages/HistoryPage';
import { ProfilePage } from '../pages/ProfilePage';

// Admin pages
import { AdminOverviewPage } from '../pages/admin/AdminOverviewPage';
import { AdminSubjectsPage } from '../pages/admin/AdminSubjectsPage';
import { AdminLessonsPage } from '../pages/admin/AdminLessonsPage';
import { AdminQuestionsPage } from '../pages/admin/AdminQuestionsPage';
import { AdminExamsPage } from '../pages/admin/AdminExamsPage';
import { AdminResourcesPage } from '../pages/admin/AdminResourcesPage';

export const router = createBrowserRouter([
  // Public & Learning Routes (Header + Footer + MobileNav)
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/subjects', element: <SubjectCatalogPage /> },
      { path: '/subjects/:slug', element: <SubjectDetailPage /> },
      { path: '/resources', element: <ResourceLibraryPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/lessons/:id', element: <LessonViewerPage /> },
      { path: '/practice/:topicId', element: <TopicPracticePage /> },
      { path: '/exams/:id/instructions', element: <ExamInstructionsPage /> },
      { path: '/attempts/:id/results', element: <ExamResultsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },

  // Student Dashboard Protected Routes (Header + Sidebar + Content + MobileNav)
  {
    element: <DashboardLayout />,
    children: [
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/bookmarks', element: <BookmarksPage /> },
      { path: '/history', element: <HistoryPage /> },
      { path: '/profile', element: <ProfilePage /> },
    ],
  },

  // Active Exam Immersive Route (Zero navigation, full focus)
  {
    element: <ExamLayout />,
    children: [
      { path: '/exams/:id/attempt', element: <ActiveExamPage /> },
    ],
  },

  // Admin CMS Protected Routes (Admin Header + Admin Sidebar)
  {
    element: <AdminLayout />,
    children: [
      { path: '/admin', element: <AdminOverviewPage /> },
      { path: '/admin/subjects', element: <AdminSubjectsPage /> },
      { path: '/admin/lessons', element: <AdminLessonsPage /> },
      { path: '/admin/questions', element: <AdminQuestionsPage /> },
      { path: '/admin/exams', element: <AdminExamsPage /> },
      { path: '/admin/resources', element: <AdminResourcesPage /> },
    ],
  },
]);

