import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import ResearchPage from "./pages/ResearchPage";
import JournalDetailPage from "./pages/JournalDetailPage";
import ConferenceDetailPage from "./pages/ConferenceDetailPage";
import PatentDetailPage from "./pages/PatentDetailPage";
import OthersDetailPage from "./pages/OthersDetailPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/research" element={<ResearchPage />} />
        <Route path="/research/achievements" element={<ResearchPage />} />
        <Route path="/research/projects" element={<ResearchPage />} />

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
