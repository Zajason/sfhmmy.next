import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section
      id="middleSection"
      className="flex flex-col items-center justify-center w-full bg-black text-white py-20"
    >
      <div className="flex flex-col md:flex-row w-4/5">
        {/* Left Side */}
        <motion.div
          className="flex-1 relative mb-10 md:mb-0 md:pr-10"
          initial={{ x: -140, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
        >
          <div className="absolute -top-10 -left-10 bg-blue-500 text-white w-32 h-32 flex items-center justify-center rounded-full z-10">
            <div className="text-center">
              <p className="text-3xl font-bold">16ο</p>
              <p className="text-sm">Συνέδριο</p>
            </div>
          </div>
          <img
            src="images/others/conference.jpg"
            alt="Conference Visual"
            className="rounded-xl shadow-lg w-full h-auto"
          />
        </motion.div>

        {/* Right Side */}
        <motion.div
          className="flex-1 pl-0 md:pl-10"
          initial={{ x: 140, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
        >
          <h3 className="text-blue-400 text-lg font-semibold mb-4">Σχετικά</h3>
          <h1 className="text-4xl font-bold mb-6">Τι είναι το ΣΦΗΜΜΥ;</h1>
          <p className="text-lg mb-4">
            Το Συνέδριο Φοιτητών Ηλεκτρολόγων Μηχανικών και Μηχανικών Υπολογιστών (ΣΦΗΜΜΥ)
            ξεκίνησε το 2007 στην Αθήνα. Οι συμμετέχοντες είναι Έλληνες μελλοντικοί μηχανικοί
            που μελετούν τα συστήματα ηλεκτρικής ενέργειας, τα συστήματα ελέγχου, τα
            ηλεκτρονικά και τους υπολογιστές, τις τηλεπικοινωνίες και την τεχνολογία της
            πληροφορίας.
          </p>
          <p className="text-lg mb-8">
            Κάθε χρόνο, το ΣΦΗΜΜΥ ξεπερνά τους 1500 συμμετέχοντες, ενώ δημιουργεί τρεις ημέρες
            γεμάτες δραστηριότητες, οι οποίες στοχεύουν να φέρουν πιο κοντά φοιτητές από όλη
            την Ελλάδα, οι οποίοι μοιράζονται το πάθος τους για την ηλεκτρολογία και τη
            Μηχανική Υπολογιστών και επιθυμούν να καλύψουν την πρόσφατη ανάπτυξη!
          </p>
          <button className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300">
            Περισσότερα
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
