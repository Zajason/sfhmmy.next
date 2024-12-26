import React from "react";

const SubjectsSection = () => {
  const subjects = [
    { title: "Ηλεκτρική Ενέργεια", description: "Συζήτηση για τις ανανεώσιμες πηγές ενέργειας και τη διαχείριση δικτύου." },
    { title: "Συστήματα Ελέγχου", description: "Εξερεύνηση αυτοματισμών και εφαρμογών στα βιομηχανικά συστήματα." },
    { title: "Ηλεκτρονικά", description: "Ανακαλύψτε τις νεότερες τάσεις στην ηλεκτρονική μηχανική." },
    { title: "Υπολογιστές", description: "Συζήτηση για την ανάπτυξη λογισμικού και υλικού." },
    { title: "Τηλεπικοινωνίες", description: "Οι τελευταίες εξελίξεις σε δίκτυα 5G και πέρα." },
    { title: "Τεχνολογία Πληροφορίας", description: "Τεχνολογίες αιχμής όπως AI και Blockchain." },
  ];

  return (
    <div className="bg-black text-white py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-10">Θέματα Συνεδρίου</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((subject, index) => (
            <div
              key={index}
              className="bg-gray-900 p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-blue-400 mb-4">
                {subject.title}
              </h3>
              <p className="text-gray-300">{subject.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectsSection;
