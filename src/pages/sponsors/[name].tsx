import React from "react";
import { useRouter } from "next/router";
import { sponsorsData } from "../../data/SponsorsData";
import { Meteors } from "../../components/meteorAnimation";

const SponsorPage = () => {
  const router = useRouter();
  const { name } = router.query;

  const sponsor = sponsorsData.find(
    (s) => s.name.toLowerCase().replace(/\s+/g, "") === name
  );

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
        <div className="flex items-center justify-start gap-6 mb-10">
          <img
            src={sponsor.image}
            alt={sponsor.name}
            className="h-28 w-28 object-contain"
          />
          <h1 className="text-5xl font-bold">{sponsor.name}</h1>
        </div>

        {/* Greek Description */}
        {sponsor.description_gr && sponsor.description_gr.trim() !== "" && (
          <>
            <h2 className="text-2xl font-semibold underline mb-2">Περιγραφή:</h2>
            <p className="mb-8 whitespace-pre-line">{sponsor.description_gr}</p>
          </>
        )}

        {/* English Description */}
        {sponsor.description_eng && sponsor.description_eng.trim() !== "" && (
          <>
            <h2 className="text-2xl font-semibold underline mb-2">Description:</h2>
            <p className="mb-8 whitespace-pre-line">{sponsor.description_eng}</p>
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
