import React from "react";
import { motion } from "framer-motion";
import { FaBolt, FaCogs, FaMicrochip, FaLaptop, FaSatelliteDish, FaBrain, FaNetworkWired, FaDatabase, FaLightbulb, FaWifi, FaHeartbeat, FaCalculator, FaCloud } from "react-icons/fa";

const SubjectsSection = () => {
  const subjects = [
    {
      title: "Συστήματα Ηλεκτρικής Ενέργειας",
      description: "Συζήτηση για τις ανανεώσιμες πηγές ενέργειας και τη διαχείριση δικτύου.",
      icon: <FaBolt className="text-yellow-400 text-4xl mb-4" />
    },
    {
      title: "Ηλεκτρικά και Ηλεκτρονικά Κυκλώματα",
      description: "Εξερεύνηση αυτοματισμών και εφαρμογών στα βιομηχανικά συστήματα.",
      icon: <FaCogs className="text-blue-400 text-4xl mb-4" />
    },
    {
      title: "Ηλεκτρικά Ισχύος",
      description: "Ανακαλύψτε τις νεότερες τάσεις στην ηλεκτρονική μηχανική.",
      icon: <FaMicrochip className="text-green-400 text-4xl mb-4" />
    },
    {
      title: "Μικροηλεκτρονική",
      description: "Συζήτηση για την ανάπτυξη λογισμικού και υλικού.",
      icon: <FaLaptop className="text-purple-400 text-4xl mb-4" />
    },
    {
      title: "Συστήματα Αυτομάτου Ελέγχου",
      description: "Οι τελευταίες εξελίξεις σε δίκτυα 5G και πέρα.",
      icon: <FaSatelliteDish className="text-red-400 text-4xl mb-4" />
    },
    {
      title: "Επεξεργασία Σήματος και Εικόνας",
      description: "Τεχνολογίες αιχμής όπως AI και Blockchain.",
      icon: <FaBrain className="text-pink-400 text-4xl mb-4" />
    },
    {
      title: "Μηχανική και Βαθιά Μάθηση",
      description: "Ανακαλύψτε τις νεότερες τάσεις στην μηχανική μάθηση και βαθιά μάθηση.",
      icon: <FaBrain className="text-blue-400 text-4xl mb-4" />
    },
    {
      title: "Δίκτυα Τηλεπικοινωνιών",
      description: "Οι τελευταίες εξελίξεις σε δίκτυα τηλεπικοινωνιών.",
      icon: <FaNetworkWired className="text-green-400 text-4xl mb-4" />
    },
    {
      title: "Βάσεις Δεδομένων",
      description: "Συζήτηση για την ανάπτυξη και διαχείριση βάσεων δεδομένων.",
      icon: <FaDatabase className="text-purple-400 text-4xl mb-4" />
    },
    {
      title: "Έξυπνα Δίκτυα Ενέργειας και Τηλεπικοινωνιών",
      description: "Οι τελευταίες εξελίξεις σε έξυπνα δίκτυα ενέργειας και τηλεπικοινωνιών.",
      icon: <FaLightbulb className="text-yellow-400 text-4xl mb-4" />
    },
    {
      title: "Ασύρματη Μετάδοση και Δίκτυα Προηγμένης Γενιάς",
      description: "Οι τελευταίες εξελίξεις σε ασύρματη μετάδοση και δίκτυα προηγμένης γενιάς.",
      icon: <FaWifi className="text-blue-400 text-4xl mb-4" />
    },
    {
      title: "Βιοϊατρική Τεχνολογία και Βιοπληροφορική",
      description: "Ανακαλύψτε τις νεότερες τάσεις στην βιοϊατρική τεχνολογία και βιοπληροφορική.",
      icon: <FaHeartbeat className="text-red-400 text-4xl mb-4" />
    },
    {
      title: "Επιστημονικοί Υπολογισμοί",
      description: "Συζήτηση για τις τελευταίες εξελίξεις στους επιστημονικούς υπολογισμούς.",
      icon: <FaCalculator className="text-green-400 text-4xl mb-4" />
    },
    {
      title: "Διαδίκτυο των Πραγμάτων",
      description: "Οι τελευταίες εξελίξεις στο διαδίκτυο των πραγμάτων.",
      icon: <FaCloud className="text-blue-400 text-4xl mb-4" />
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