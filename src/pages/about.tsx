import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-black text-white py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-10">Σχετικά με το ΣΦΗΜΜΥ</h1>

        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Left Section: Image */}
          <div className="flex-1 mb-10 md:mb-0 md:mr-6">
            <img
              src="images/others/conference.jpg"
              alt="Conference Visual"
              className="rounded-xl shadow-lg"
            />
          </div>

          {/* Right Section: Content */}
          <div className="flex-1">
            <p className="text-lg mb-6">
              Το Συνέδριο Φοιτητών Ηλεκτρολόγων Μηχανικών και Μηχανικών Υπολογιστών (ΣΦΗΜΜΥ) είναι
              ένας από τους μεγαλύτερους θεσμούς στον χώρο της τριτοβάθμιας εκπαίδευσης στην Ελλάδα.
              Ξεκίνησε το 2007 με την πρωτοβουλία φοιτητών που ήθελαν να δημιουργήσουν έναν χώρο
              συνάντησης για την ανταλλαγή ιδεών, γνώσεων, και εμπειριών.
            </p>
            <p className="text-lg mb-6">
              Το συνέδριο προσφέρει μια μοναδική πλατφόρμα για φοιτητές, επαγγελματίες, και
              ακαδημαϊκούς, προωθώντας την καινοτομία και τη συνεργασία σε τομείς όπως τα συστήματα
              ηλεκτρικής ενέργειας, τα ηλεκτρονικά, οι τηλεπικοινωνίες, και η τεχνολογία της
              πληροφορίας.
            </p>
            <p className="text-lg mb-6">
              Με πάνω από 1500 συμμετέχοντες κάθε χρόνο, το ΣΦΗΜΜΥ συνδυάζει διαλέξεις,
              παρουσιάσεις, workshops, και networking events για να εμπνεύσει και να προωθήσει το
              πάθος για την επιστήμη και την τεχνολογία.
            </p>
            <button className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600">
              Επισκεφτείτε το Πρόγραμμα
            </button>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Στόχοι του Συνεδρίου</h2>
          <ul className="list-disc list-inside space-y-4 text-lg text-gray-400">
            <li>Ενίσχυση της συνεργασίας μεταξύ φοιτητών και επαγγελματιών.</li>
            <li>Προώθηση της καινοτομίας σε κρίσιμους τομείς τεχνολογίας.</li>
            <li>Ενίσχυση της συμμετοχής γυναικών και μειονοτήτων στον χώρο της μηχανικής.</li>
            <li>Παροχή ευκαιριών networking για την ανάπτυξη καριέρας.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
