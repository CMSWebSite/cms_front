import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publicNewsApi } from "../../api/public/news";

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;
}

function NewsCard({ id, title, date, image }) {
  return (
    <Link
      to={`/community/recent-news/${id}`}
      className="group relative"
      style={{ width: 420 }}
    >
      <div className="mb-4">
        <div
          className="whitespace-pre-line line-clamp-2"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 18,
            lineHeight: "28px",
            fontWeight: 600,
            color: "#FFFFFF",
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 10,
            fontFamily: "Inter, sans-serif",
            fontSize: 12,
            lineHeight: "16px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          {date}
        </div>
      </div>

      <div
        className="relative overflow-hidden"
        style={{ width: "100%", height: 165, borderRadius: 0 }}
      >
        {image ? (
          <img
            src={image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 bg-white/5" />
        )}
        <div className="absolute inset-0 bg-black/15" />
      </div>
    </Link>
  );
}

export default function NewsSection() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    let mounted = true;
    publicNewsApi.list()
      .then((d) => mounted && setItems(Array.isArray(d) ? d.slice(0, 2) : []))
      .catch(() => mounted && setItems([]));
    return () => { mounted = false; };
  }, []);

  return (
    <section className="w-full bg-[#0D0D0D] py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex items-baseline justify-between">
          <Link
            to="/community/recent-news"
            className="inline-flex items-center gap-2"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 15,
              fontWeight: 500,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            view more
            <span className="inline-block translate-y-[1px]">→</span>
          </Link>

          <h2
            style={{
              fontFamily: '"Tiro Devanagari Sanskrit", serif',
              fontSize: 60,
              lineHeight: "60px",
              letterSpacing: "-0.02em",
              background: "linear-gradient(90deg, #8FACEA 24%, #FFF490 73%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            News
          </h2>
        </div>

        <div className="relative mt-10" style={{ height: 260 }}>
          {items === null && (
            <div className="text-[14px] text-white/40">불러오는 중…</div>
          )}
          {items && items.length === 0 && (
            <div className="text-[14px] text-white/40">아직 등록된 뉴스가 없습니다.</div>
          )}
          {items && items[0] && (
            <div style={{ position: "absolute", left: 0 }}>
              <NewsCard
                id={items[0].id}
                title={items[0].title}
                date={formatDate(items[0].publishedAt)}
                image={items[0].coverImageUrl}
              />
            </div>
          )}
          {items && items[1] && (
            <div style={{ position: "absolute", left: 420 + 96 }}>
              <NewsCard
                id={items[1].id}
                title={items[1].title}
                date={formatDate(items[1].publishedAt)}
                image={items[1].coverImageUrl}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
