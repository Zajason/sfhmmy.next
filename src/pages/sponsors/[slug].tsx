import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { sponsorsData } from "../../data/SponsorsData";
import { Meteors } from "../../components/meteorAnimation";

type Sponsor = {
  name: string;
  image: string;
  link: string;
  link2?: string;
  link3?: string;
  level: string;
  slug: string;
  description_gr: string;
  description_eng: string;
};

const SponsorPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [sponsor, setSponsor] = useState<Sponsor | null>(null);

  useEffect(() => {
    if (slug && typeof slug === "string") {
      const found = sponsorsData.find((s) => s.slug === slug);
      setSponsor(found || null);
    }
  }, [slug]);

  if (!sponsor) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-bold text-xl">
        Sponsor not found.
      </div>
    );
  }

  const links = [sponsor.link, sponsor.link2, sponsor.link3].filter(Boolean);

  return (
    <div className="relative min-h-screen bg-black text-white px-8 pt-16">
      {/* Background Meteors */}
      <div className="absolute inset-0 z-0">
        <Meteors number={30} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header: Logo + Name */}
        <div className="flex flex-wrap items-center justify-start gap-6 mb-10">
          <img
            src={sponsor.image}
            alt={sponsor.name}
            className="h-28 w-28 object-contain"
          />
          <h1 className="text-5xl font-bold break-words w-full sm:w-auto">
            {sponsor.name}
          </h1>
        </div>

        {/* Greek Description */}
        {sponsor.description_gr?.trim() && (
          <>
            <h2 className="text-2xl font-semibold underline mb-2">Περιγραφή:</h2>
            <p className="mb-8 whitespace-pre-line">{sponsor.description_gr}</p>
          </>
        )}

        {/* Links */}
        {links.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold underline mb-4">Links:</h2>
            <ul className="space-y-2">
              {links.map((url, idx) => (
                <li key={idx}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline break-words"
                  >
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default SponsorPage;
