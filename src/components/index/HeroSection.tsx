import React from "react";
import { useTheme } from "../../utils/ThemeContext";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/others/eng.jpg')" }}
        aria-label="Background Image"
      ></div>

      {/* Overlay for content */}
      <div className="absolute inset-0 flex items-center justify-center md:justify-start  pl-0 md:pl-20 bg-black bg-opacity-70 text-white px-4">
        <div className="max-w-4xl text-center md:text-left w-full lg:w-1/2 pl-0 md:pl-20 ">
          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            ΣΦΗΜΜΥ 16
          </h1>

          {/* Υπότιτλος */}
          <h2 className="text-2xl md:text-4xl mt-4">
            16ο Συνέδριο Φοιτητών Ηλεκτρολόγων Μηχανικών και Μηχανικών
            Υπολογιστών
          </h2>

          {/* Περιγραφή */}
          <p className="text-lg md:text-xl mt-6 leading-relaxed">
            Φέτος, το ΣΦΗΜΜΥ θα διεξαχθεί στη Θεσσαλονίκη, το τριήμερο 25 με 27
            Απριλίου, συγκεντρώνοντας φοιτητές, ακαδημαϊκούς και επαγγελματίες
            σε ένα περιβάλλον γνώσης, καινοτομίας και networking!
          </p>

          {/* Κουμπί Πρόσκλησης */}
          <div className="mt-8">
            <Link href="/about">
              <button className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded-lg shadow-lg transition">
                Μάθετε Περισσότερα
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
