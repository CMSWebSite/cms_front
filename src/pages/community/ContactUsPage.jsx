import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import { publicSiteSettingsApi } from "../../api/public/siteSettings";
import { ApiError } from "../../api/client";

export default function ContactUsPage() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true); setError(null);
    publicSiteSettingsApi.all()
      .then((d) => mounted && setSettings(d ?? {}))
      .catch((err) => mounted && setError(err instanceof ApiError ? err.message : "불러오지 못했습니다."))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const email = settings["contact.email"];
  const phone = settings["contact.phone"];
  const address = settings["contact.address"];
  const mapUrl = settings["contact.mapUrl"];

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <Header />
      <main className="pt-[88px]">
        <section className="w-full bg-[#dddddd]">
          <div className="mx-auto max-w-[1280px] px-12">
            <div className="flex h-[56px] items-center gap-8">
              <Link to="/community/recent-news" className="pb-[4px] text-[18px] font-semibold leading-none text-black">Recent news</Link>
              <Link to="/community/gallery" className="pb-[4px] text-[18px] font-semibold leading-none text-black">Gallery</Link>
              <Link to="/community/contact-us" className="border-b border-black pb-[4px] text-[18px] font-semibold leading-none text-black">Contact us</Link>
              <Link to="/community/qna" className="pb-[4px] text-[18px] font-semibold leading-none text-black">Q&amp;A</Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-12 pt-[42px] pb-[140px]">
          <div className="mb-[40px] text-[14px] text-black">⌂ Community &gt; Contact us</div>
          <h1 className="mb-[60px] text-center text-[64px] font-bold leading-none text-black">Contact us</h1>

          {loading && <LoadingState />}
          {!loading && error && <ErrorState message={error} />}

          {!loading && !error && (
            <div className="mx-auto max-w-[860px] space-y-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="rounded-lg border border-black/10 bg-white p-6">
                  <div className="text-[12px] font-semibold uppercase tracking-wide text-black/55">Email</div>
                  <div className="mt-3 text-[16px] text-black break-all">
                    {email ? <a href={`mailto:${email}`} className="hover:underline">{email}</a> : <span className="text-black/40">미등록</span>}
                  </div>
                </div>
                <div className="rounded-lg border border-black/10 bg-white p-6">
                  <div className="text-[12px] font-semibold uppercase tracking-wide text-black/55">Phone</div>
                  <div className="mt-3 text-[16px] text-black">
                    {phone || <span className="text-black/40">미등록</span>}
                  </div>
                </div>
                <div className="rounded-lg border border-black/10 bg-white p-6">
                  <div className="text-[12px] font-semibold uppercase tracking-wide text-black/55">Address</div>
                  <div className="mt-3 text-[15px] leading-[1.6] text-black whitespace-pre-line">
                    {address || <span className="text-black/40">미등록</span>}
                  </div>
                </div>
              </div>

              {mapUrl && (
                <div className="overflow-hidden rounded-lg border border-black/10 bg-white">
                  <iframe
                    title="map"
                    src={mapUrl}
                    className="h-[420px] w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
