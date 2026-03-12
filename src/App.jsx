import { BrowserRouter, Routes, Route } from "react-router-dom";
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/research" element={<ResearchPage />} />
        <Route path="/research/achievements" element={<ResearchPage />} />
        <Route path="/research/projects" element={<ResearchPage />} />

        <Route path="/members/professor" element={<ProfessorPage />} />
        <Route path="/members/students" element={<StudentsPage />} />
        <Route path="/members/students/:slug" element={<StudentDetailPage />} />
        <Route path="/members/alumni" element={<AlumniPage />} />

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
  );
}
