import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import HomePage from "./pages/Homepage";
import ResearchPage from "./pages/ResearchPage";
import JournalDetailPage from "./pages/JournalDetailPage";
import ConferenceDetailPage from "./pages/ConferenceDetailPage";
import PatentDetailPage from "./pages/PatentDetailPage";
import OthersDetailPage from "./pages/OthersDetailPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ProfessorPage from "./pages/members/ProfessorPage";
import StudentsPage from "./pages/members/StudentsPage";
import StudentDetailPage from "./pages/members/StudentDetailPage";
import AlumniPage from "./pages/members/AlumniPage";
import FacilitiesPage from "./pages/about/FacilitiesPage";
import VisionMissionPage from "./pages/about/VisionMissionPage";
import RecentNewsPage from "./pages/community/RecentNewsPage";
import GalleryPage from "./pages/community/GalleryPage";
import RecentNewsDetailPage from "./pages/community/RecentNewsDetailPage";
import GalleryDetailPage from "./pages/community/GalleryDetailPage";
import ContactUsPage from "./pages/community/ContactUsPage";
import QnAPage from "./pages/community/QnAPage";
import QnaDetailPage from "./pages/community/QnaDetailPage";
import QnaWritePage from "./pages/community/QnaWritePage";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import RequireAdmin from "./auth/RequireAdmin";
import AdminLayout from "./pages/admin/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import NewsListPage from "./pages/admin/news/NewsListPage";
import NewsEditPage from "./pages/admin/news/NewsEditPage";
import JournalsListPage from "./pages/admin/journals/JournalsListPage";
import JournalEditPage from "./pages/admin/journals/JournalEditPage";
import ConferencesListPage from "./pages/admin/conferences/ConferencesListPage";
import ConferenceEditPage from "./pages/admin/conferences/ConferenceEditPage";
import PatentsListPage from "./pages/admin/patents/PatentsListPage";
import PatentEditPage from "./pages/admin/patents/PatentEditPage";
import ProjectsListPage from "./pages/admin/projects/ProjectsListPage";
import ProjectEditPage from "./pages/admin/projects/ProjectEditPage";
import OthersListPage from "./pages/admin/others/OthersListPage";
import OtherEditPage from "./pages/admin/others/OtherEditPage";
import ProfessorEditPage from "./pages/admin/professor/ProfessorEditPage";
import FacilitiesListPage from "./pages/admin/facilities/FacilitiesListPage";
import FacilityEditPage from "./pages/admin/facilities/FacilityEditPage";
import VisionMissionListPage from "./pages/admin/visionMission/VisionMissionListPage";
import VisionMissionEditPage from "./pages/admin/visionMission/VisionMissionEditPage";
import GalleryListPage from "./pages/admin/gallery/GalleryListPage";
import GalleryEditPage from "./pages/admin/gallery/GalleryEditPage";
import QnaListPage from "./pages/admin/qna/QnaListPage";
import QnaEditPage from "./pages/admin/qna/QnaEditPage";
import PartnersListPage from "./pages/admin/partners/PartnersListPage";
import PartnerEditPage from "./pages/admin/partners/PartnerEditPage";
import SiteSettingsPage from "./pages/admin/siteSettings/SiteSettingsPage";
import StudentsListPage from "./pages/admin/students/StudentsListPage";
import StudentEditPage from "./pages/admin/students/StudentEditPage";
import UsersListPage from "./pages/admin/users/UsersListPage";

function ThemeRouteSync() {
  const { pathname } = useLocation();

  // main page: dark, others: light (per current product rule)
  const theme = pathname === "/" ? "dark" : "light";

  if (typeof document !== "undefined") {
    document.documentElement.dataset.theme = theme;
  }

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeRouteSync />
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/research" element={<ResearchPage />} />
        <Route path="/research/achievements" element={<ResearchPage />} />
        <Route path="/research/projects" element={<ResearchPage />} />

        <Route path="/members/professor" element={<ProfessorPage />} />
        <Route path="/members/students" element={<StudentsPage />} />
        <Route path="/members/students/:slug" element={<StudentDetailPage />} />
        <Route path="/members/alumni" element={<AlumniPage />} />

        <Route path="/about/facilities" element={<FacilitiesPage />} />
        <Route path="/about/vision" element={<VisionMissionPage />} />

        <Route path="/community/recent-news" element={<RecentNewsPage />} />
        <Route path="/community/recent-news/:id" element={<RecentNewsDetailPage />} />
        <Route path="/community/gallery" element={<GalleryPage />} />
        <Route path="/community/gallery/:id" element={<GalleryDetailPage />} />
        <Route path="/community/contact-us" element={<ContactUsPage />} />
        <Route path="/community/qna" element={<QnAPage />} />
        <Route path="/community/qna/:id" element={<QnaDetailPage />} />
        <Route path="/community/qna/write" element={<QnaWritePage />} />

        <Route
          path="/research/achievements/journals/:paperId"
          element={<JournalDetailPage />}
        />
        <Route
          path="/research/achievements/conferences/:paperId"
          element={<ConferenceDetailPage />}
        />
        <Route
          path="/research/achievements/patents/:paperId"
          element={<PatentDetailPage />}
        />
        <Route
          path="/research/achievements/others/:docId"
          element={<OthersDetailPage />}
        />
        <Route
          path="/research/projects/:projectId"
          element={<ProjectDetailPage />}
        />

        {/* 관리자 페이지 — ADMIN 권한 필요 */}
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="news" element={<NewsListPage />} />
          <Route path="news/:id" element={<NewsEditPage />} />
          <Route path="journals" element={<JournalsListPage />} />
          <Route path="journals/:id" element={<JournalEditPage />} />
          <Route path="conferences" element={<ConferencesListPage />} />
          <Route path="conferences/:id" element={<ConferenceEditPage />} />
          <Route path="patents" element={<PatentsListPage />} />
          <Route path="patents/:id" element={<PatentEditPage />} />
          <Route path="projects" element={<ProjectsListPage />} />
          <Route path="projects/:id" element={<ProjectEditPage />} />
          <Route path="others" element={<OthersListPage />} />
          <Route path="others/:id" element={<OtherEditPage />} />
          <Route path="professor" element={<ProfessorEditPage />} />
          <Route path="facilities" element={<FacilitiesListPage />} />
          <Route path="facilities/:id" element={<FacilityEditPage />} />
          <Route path="vision-mission" element={<VisionMissionListPage />} />
          <Route path="vision-mission/:id" element={<VisionMissionEditPage />} />
          <Route path="gallery" element={<GalleryListPage />} />
          <Route path="gallery/:id" element={<GalleryEditPage />} />
          <Route path="qna" element={<QnaListPage />} />
          <Route path="qna/:id" element={<QnaEditPage />} />
          <Route path="partners" element={<PartnersListPage />} />
          <Route path="partners/:id" element={<PartnerEditPage />} />
          <Route path="site-settings" element={<SiteSettingsPage />} />
          <Route path="students" element={<StudentsListPage />} />
          <Route path="students/:id" element={<StudentEditPage />} />
          <Route path="users" element={<UsersListPage />} />
        </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
