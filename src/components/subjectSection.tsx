import React from "react";
import { motion } from "framer-motion";
import { FaBolt, FaCogs, FaMicrochip, FaLaptop, FaSatelliteDish, FaBrain } from "react-icons/fa";

const SubjectsSection = () => {
  const subjects = [
    {
      title: "Ηλεκτρική Ενέργεια",
      description: "Συζήτηση για τις ανανεώσιμες πηγές ενέργειας και τη διαχείριση δικτύου.",
      icon: <FaBolt className="text-yellow-400 text-4xl mb-4" />
    },
    {
      title: "Συστήματα Ελέγχου",
      description: "Εξερεύνηση αυτοματισμών και εφαρμογών στα βιομηχανικά συστήματα.",
      icon: <FaCogs className="text-blue-400 text-4xl mb-4" />
    },
    {
      title: "Ηλεκτρονικά",
      description: "Ανακαλύψτε τις νεότερες τάσεις στην ηλεκτρονική μηχανική.",
      icon: <FaMicrochip className="text-green-400 text-4xl mb-4" />
    },
    {
      title: "Υπολογιστές",
      description: "Συζήτηση για την ανάπτυξη λογισμικού και υλικού.",
      icon: <FaLaptop className="text-purple-400 text-4xl mb-4" />
    },
    {
      title: "Τηλεπικοινωνίες",
      description: "Οι τελευταίες εξελίξεις σε δίκτυα 5G και πέρα.",
      icon: <FaSatelliteDish className="text-red-400 text-4xl mb-4" />
    },
    {
      title: "Τεχνολογία Πληροφορίας",
      description: "Τεχνολογίες αιχμής όπως AI και Blockchain.",
      icon: <FaBrain className="text-pink-400 text-4xl mb-4" />
    },
  ];

  return (
    <div className="bg-black text-white py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-10">Θέματα Συνεδρίου</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((subject, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex flex-col items-center">
                {subject.icon}
                <h3 className="text-xl font-semibold text-blue-400 mb-4">
                  {subject.title}
                </h3>
                <p className="text-gray-300 text-center">{subject.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectsSection;
