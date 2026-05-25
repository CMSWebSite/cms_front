import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import LoadingState from "../../components/common/LoadingState";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";
import { publicFacilitiesApi } from "../../api/public/facilities";
import { ApiError } from "../../api/client";

export default function FacilitiesPage() {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true); setError(null);
    publicFacilitiesApi.list()
      .then((d) => mounted && setItems(d))
      .catch((err) => mounted && setError(err instanceof ApiError ? err.message : "불러오지 못했습니다."))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  // 카테고리별 그룹핑 (sortOrder 유지)
  const groups = (items ?? []).reduce((acc, it) => {
    const cat = it.category || "기타";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(it);
    return acc;
  }, {});
  const categories = Object.keys(groups);

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-black">
      <Header />

      <main className="pt-[88px]">
        <section className="w-full bg-[#dddddd]">
          <div className="mx-auto max-w-[1280px] px-12">
            <div className="flex h-[72px] items-center gap-[48px]">
              <Link to="/about/facilities" className="border-b-2 border-black pb-1 text-[18px] font-semibold leading-none">Facilities</Link>
              <Link to="/about/vision" className="pb-1 text-[18px] font-semibold leading-none text-black">Vision & Mission</Link>
            </div>
          </div>
        </section>

        <section className="mx-auto min-h-[calc(100vh-96px-72px)] max-w-[1280px] px-12 pt-4 pb-24">
          <div className="mb-10 flex items-center gap-2 text-[18px] text-black/85">
            <span className="text-[16px]">⌂</span>
            <span>About us &gt; Facilities</span>
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-center text-[64px] font-extrabold leading-none tracking-tight">
              Facilities
            </h1>
          </div>

          {loading && <LoadingState className="mt-20" />}
          {!loading && error && <ErrorState className="mt-20" message={error} />}

          {!loading && !error && (items?.length === 0) && (
            <EmptyState className="mt-20" title="아직 등록된 장비가 없습니다." />
          )}

          {!loading && !error && categories.map((cat) => (
            <div key={cat} className="mt-16">
              <div className="flex justify-center">
                <div className="flex h-[68px] min-w-[200px] items-center justify-center rounded-full bg-black px-8 text-[28px] font-bold text-white">
                  {cat}
                </div>
              </div>

              <div className="mx-auto mt-12 grid max-w-[1100px] grid-cols-1 gap-y-16 md:grid-cols-2">
                {groups[cat].map((it) => (
                  <div key={it.id} className="flex flex-col items-center">
                    <div className="flex h-[260px] w-[360px] items-center justify-center">
                      {it.image ? (
                        <img src={it.image} alt={it.name} className="max-h-full max-w-full object-contain" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center rounded-xl border-2 border-dashed border-black/15 text-[14px] text-black/40">
                          이미지 없음
                        </div>
                      )}
                    </div>
                    <h2 className="mt-10 text-center text-[32px] font-extrabold leading-tight tracking-tight">
                      {it.name}
                      {it.quantity > 1 && <span className="ml-2 text-[24px] text-black/65">(x{it.quantity})</span>}
                    </h2>
                    {it.description && (
                      <p className="mt-3 max-w-[380px] text-center text-[14px] text-black/65 whitespace-pre-line">
                        {it.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
