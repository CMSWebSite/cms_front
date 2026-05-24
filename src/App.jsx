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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
