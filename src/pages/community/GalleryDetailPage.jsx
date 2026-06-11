import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import { publicGalleryApi } from "../../api/public/gallery";
import { ApiError } from "../../api/client";

export default function GalleryDetailPage() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true); setNotFound(false); setError(null);
    publicGalleryApi.get(id)
      .then((d) => mounted && setAlbum(d))
      .catch((err) => {
        if (!mounted) return;
        if (err instanceof ApiError && err.status === 404) setNotFound(true);
        else setError(err instanceof ApiError ? err.message : "불러오지 못했습니다.");
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [id]);

  if (loading || notFound || error) {
    return (
      <div className="min-h-screen bg-[#f3f3f3]">
        <Header />
        <main className="pt-[88px]">
          <section className="mx-auto max-w-[1280px] px-12 py-[120px] text-center">
            {loading && <LoadingState />}
            {error && <ErrorState message={error} />}
            {notFound && (
              <>
                <h1 className="mb-6 text-[40px] font-bold">앨범이 없습니다.</h1>
                <Link to="/community/gallery" className="inline-block border border-black px-6 py-3 text-[16px]">목록으로</Link>
              </>
            )}
          </section>
        </main>
        <Footer />
      </div>
    );
  }

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
          <div className="mb-[40px] text-[14px] text-black">
            ⌂ Community &gt; <Link to="/community/gallery" className="hover:underline">Gallery</Link> &gt; {album.title}
          </div>
          <h1 className="mb-4 text-center text-[48px] font-bold leading-none text-black">{album.title}</h1>
          <div className="mb-[40px] text-center text-[14px] text-black/60">{album.eventDate}</div>

          {album.description && (
            <p className="mx-auto mb-12 max-w-[860px] whitespace-pre-line text-center text-[16px] leading-[1.7] text-black/80">
              {album.description}
            </p>
          )}

          {(album.images ?? []).length === 0 ? (
            <div className="py-12 text-center text-[14px] text-black/50">앨범에 사진이 없습니다.</div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {album.images.map((img) => (
                <figure key={img.id} className="overflow-hidden rounded-md border border-black/10 bg-white">
                  <img src={img.imageUrl} alt={img.caption || album.title} className="aspect-[4/3] w-full object-cover" />
                  {img.caption && (
                    <figcaption className="px-3 py-2 text-[13px] text-black/70">{img.caption}</figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}

          <div className="mt-16 flex justify-center">
            <Link to="/community/gallery" className="inline-flex h-[48px] items-center justify-center border border-black px-8 text-[16px] font-medium text-black">
              목록으로
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
