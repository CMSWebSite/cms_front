// 사이트 통합 검색 인덱스.
// - SITE_PAGES: 정적인 페이지(네비게이션 대상) 목록. 클라이언트에서 즉시 필터링한다.
// - searchContent(): 공개 API 를 질의해 게시글/구성원 등 동적 콘텐츠를 검색한다.
//
// 각 결과 항목의 공통 형태: { key, title, subtitle, category, path }

import { publicNewsApi } from "../api/public/news";
import { publicJournalsApi } from "../api/public/journals";
import { publicConferencesApi } from "../api/public/conferences";
import { publicPatentsApi } from "../api/public/patents";
import { publicOthersApi } from "../api/public/others";
import { publicProjectsApi } from "../api/public/projects";
import { publicGalleryApi } from "../api/public/gallery";
import { publicQnaApi } from "../api/public/qna";
import { publicStudentsApi } from "../api/public/students";

// 정적 페이지 — keywords 에 한/영 별칭을 넣어 어느 쪽으로 쳐도 잡히게 한다.
export const SITE_PAGES = [
  { title: "Home", category: "페이지", path: "/", keywords: "home 홈 메인 main" },
  { title: "Research topics", category: "페이지", path: "/research", keywords: "research topics 연구 연구주제 리서치" },
  { title: "Achievements", category: "페이지", path: "/research/achievements", keywords: "achievements 연구성과 성과 논문 특허" },
  { title: "Projects", category: "페이지", path: "/research/projects", keywords: "projects 프로젝트 과제" },
  { title: "Professor", category: "페이지", path: "/members/professor", keywords: "professor 교수 members 구성원" },
  { title: "Students", category: "페이지", path: "/members/students", keywords: "students 학생 재학생 members 구성원" },
  { title: "Alumni", category: "페이지", path: "/members/alumni", keywords: "alumni 졸업생 members 구성원" },
  { title: "Facilities", category: "페이지", path: "/about/facilities", keywords: "facilities 시설 장비 about 소개" },
  { title: "Vision & Mission", category: "페이지", path: "/about/vision", keywords: "vision mission 비전 미션 about 소개" },
  { title: "Recent news", category: "페이지", path: "/community/recent-news", keywords: "recent news 뉴스 소식 community 커뮤니티" },
  { title: "Gallery", category: "페이지", path: "/community/gallery", keywords: "gallery 갤러리 사진 community 커뮤니티" },
  { title: "Contact us", category: "페이지", path: "/community/contact-us", keywords: "contact us 연락처 오시는길 문의 community 커뮤니티" },
  { title: "Q&A", category: "페이지", path: "/community/qna", keywords: "qna q&a 질문 문의 community 커뮤니티" },
];

/** 정적 페이지에서 검색어를 포함하는 항목을 반환한다. */
export function searchPages(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return SITE_PAGES.filter(
    (p) => p.title.toLowerCase().includes(q) || p.keywords.includes(q),
  ).map((p) => ({
    key: `page:${p.path}`,
    title: p.title,
    subtitle: p.category,
    category: p.category,
    path: p.path,
  }));
}

// PageResponse({items}) 또는 배열 응답을 배열로 정규화한다.
function toArray(res) {
  if (Array.isArray(res)) return res;
  if (res && Array.isArray(res.items)) return res.items;
  return [];
}

function includesQ(text, q) {
  return typeof text === "string" && text.toLowerCase().includes(q);
}

// 콘텐츠 소스 정의 — 각 소스는 목록을 불러와 검색어로 필터링/매핑한다.
const CONTENT_SOURCES = [
  {
    category: "News",
    fetch: () => publicNewsApi.list(),
    // News 목록 API 는 keyword 를 지원하지 않아 클라이언트에서 필터링한다.
    filter: (r, q) => includesQ(r.title, q),
    map: (r) => ({ key: `news:${r.id}`, title: r.title, path: `/community/recent-news/${r.id}` }),
  },
  {
    category: "Journals",
    fetch: (q) => publicJournalsApi.list({ keyword: q, limit: 5 }),
    map: (r) => ({
      key: `journal:${r.id}`,
      title: r.title1 || r.title2 || "(제목 없음)",
      path: `/research/achievements/journals/${r.id}`,
    }),
  },
  {
    category: "Conferences",
    fetch: (q) => publicConferencesApi.list({ keyword: q, limit: 5 }),
    map: (r) => ({
      key: `conf:${r.id}`,
      title: r.title,
      path: `/research/achievements/conferences/${r.id}`,
    }),
  },
  {
    category: "Patents",
    fetch: (q) => publicPatentsApi.list({ keyword: q, limit: 5 }),
    map: (r) => ({ key: `patent:${r.id}`, title: r.title, path: `/research/achievements/patents/${r.id}` }),
  },
  {
    category: "Others",
    fetch: (q) => publicOthersApi.list({ keyword: q, limit: 5 }),
    map: (r) => ({ key: `other:${r.id}`, title: r.title, path: `/research/achievements/others/${r.id}` }),
  },
  {
    category: "Projects",
    fetch: (q) => publicProjectsApi.list({ keyword: q, limit: 5 }),
    map: (r) => ({ key: `project:${r.id}`, title: r.title, path: `/research/projects/${r.id}` }),
  },
  {
    category: "Gallery",
    fetch: (q) => publicGalleryApi.list({ keyword: q, limit: 5 }),
    map: (r) => ({ key: `gallery:${r.id}`, title: r.title, path: `/community/gallery/${r.id}` }),
  },
  {
    category: "Q&A",
    fetch: (q) => publicQnaApi.list({ keyword: q, limit: 5 }),
    map: (r) => ({ key: `qna:${r.id}`, title: r.title, path: `/community/qna/${r.id}` }),
  },
  {
    category: "Students",
    fetch: (q) => publicStudentsApi.list({ keyword: q, limit: 5 }),
    map: (r) => ({
      key: `student:${r.slug}`,
      title: r.koreanName || r.englishName || "(이름 없음)",
      path: `/members/students/${r.slug}`,
    }),
  },
];

/**
 * 공개 콘텐츠를 검색한다. 각 소스별 최대 5건씩.
 * 실패한 소스는 조용히 무시하고 나머지 결과를 반환한다.
 */
export async function searchContent(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results = await Promise.all(
    CONTENT_SOURCES.map(async (src) => {
      try {
        const rows = toArray(await src.fetch(q));
        const filtered = src.filter ? rows.filter((r) => src.filter(r, q)) : rows;
        return filtered.slice(0, 5).map((r) => ({
          ...src.map(r),
          category: src.category,
          subtitle: src.category,
        }));
      } catch {
        return [];
      }
    }),
  );

  return results.flat().filter((r) => r.title);
}
