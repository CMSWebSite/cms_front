import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import LoadingState from "../../components/common/LoadingState";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";
import Pagination from "../../components/common/Pagination";
import { publicGalleryApi } from "../../api/public/gallery";
import { ApiError } from "../../api/client";

const PAGE_SIZE = 12;

export default function GalleryPage() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ items: [], totalPages: 0, totalItems: 0, page: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(() => {
    setLoading(true); setError(null);
    publicGalleryApi.list({ page, limit: PAGE_SIZE })
      .then(setData)
      .catch((err) => setError(err instanceof ApiError ? err.message : "불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, [page]);

  useEffect(() => { reload(); }, [reload]);

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <Header />
      <main className="pt-[88px]">
        <section className="w-full bg-[#dddddd]">
          <div className="mx-auto max-w-[1280px] px-12">
            <div className="flex h-[56px] items-center gap-8">
              <Link to="/community/recent-news" className="pb-[4px] text-[18px] font-semibold leading-none text-black">Recent news</Link>
              <Link to="/community/gallery" className="border-b border-black pb-[4px] text-[18px] font-semibold leading-none text-black">Gallery</Link>
              <Link to="/community/contact-us" className="pb-[4px] text-[18px] font-semibold leading-none text-black">Contact us</Link>
              <Link to="/community/qna" className="pb-[4px] text-[18px] font-semibold leading-none text-black">Q&amp;A</Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-12 pt-[42px] pb-[140px]">
          <div className="mb-[40px] text-[14px] text-black">⌂ Community &gt; Gallery</div>
          <h1 className="mb-[60px] text-center text-[64px] font-bold leading-none text-black">Gallery</h1>

          {loading && <LoadingState />}
          {!loading && error && <ErrorState message={error} onRetry={reload} />}

          {!loading && !error && (
            <>
              {data.items.length === 0 ? (
                <EmptyState title="아직 등록된 앨범이 없습니다." />
              ) : (
                <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
                  {data.items.map((album) => (
                    <Link key={album.id} to={`/community/gallery/${album.id}`} className="group block">
                      <div className="aspect-[4/3] w-full overflow-hidden rounded-md border border-black/10 bg-white">
                        {album.thumbnailImage ? (
                          <img src={album.thumbnailImage} alt={album.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-black/30">No Image</div>
                        )}
                      </div>
                      <div className="mt-4 text-[18px] font-semibold text-black group-hover:underline">{album.title}</div>
                      <div className="mt-1 text-[13px] text-black/55">
                        {album.eventDate}{album.imageCount > 0 && <> · {album.imageCount}장</>}
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {data.totalPages > 1 && (
                <div className="mt-12">
                  <Pagination page={data.page} totalPages={data.totalPages} onChange={setPage} />
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
