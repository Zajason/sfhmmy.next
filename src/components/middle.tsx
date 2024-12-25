import React from "react";

const Midle = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-black text-white py-20">
      <div className="flex w-4/5">
        {/* Left Side */}
        <div className="flex-1 relative transform transition-transform duration-1000 ease-out translate-x-[-100%] animate-transform-to-zero">
          <div className="absolute top-[-40px] left-[-40px] bg-blue-500 text-white w-32 h-32 flex items-center justify-center rounded-full transform transition-transform duration-1000 ease-out animate-transform-to-zero z-10">
            <div className="text-center">
              <p className="text-3xl font-bold">16ο</p>
              <p className="text-sm">Συνέδριο</p>
            </div>
          </div>
          <img
            src="images/others/conference.jpg"
            alt="Conference Visual"
            className="rounded-xl shadow-lg transform transition-transform duration-1000 ease-out animate-transform-to-zero z-0"
          />
        </div>
        {/* Right Side */}
        <div className="flex-1 pl-10">
          <h3 className="text-blue-400 text-lg font-semibold mb-4">Σχετικά</h3>
          <h1 className="text-4xl font-bold mb-6">Τι είναι το ΣΦΗΜΜΥ;</h1>
          <p className="text-lg mb-4">
            Το Συνέδριο Φοιτητών Ηλεκτρολόγων Μηχανικών και Μηχανικών Υπολογιστών (ΣΦΗΜΜΥ),
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
          <button className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600">
            Περισσότερα
          </button>
        </div>
      </div>
    </div>
  );
};

export default Midle;


