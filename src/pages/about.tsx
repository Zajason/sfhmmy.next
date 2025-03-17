import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const AboutPage = () => {
  // Animation variants for smoother transitions
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  return (
    <div className="bg-black text-white py-20">
      <div className="container mx-auto px-6">
        {/* Page Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-10">
            Σχετικά με το ΣΦΗΜΜΥ
          </h1>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Left Section: Image */}
          <motion.div
            variants={fadeInUp}
            className="flex-1 mb-10 md:mb-0 md:mr-6"
          >
            <img
              src="images/others/conference.jpg"
              alt="Conference Visual"
              className="rounded-xl shadow-lg transform transition duration-500"
            />
          </motion.div>

          {/* Right Section: Text */}
          <motion.div variants={fadeInUp} className="flex-1">
            <p className="text-lg mb-6">
              Το ΣΦΗΜΜΥ (Συνέδριο Φοιτητών Ηλεκτρολόγων Μηχανικών και Μηχανικών
              Υπολογιστών) είναι το μεγαλύτερο φοιτητικό συνέδριο του κλάδου
              στην Ελλάδα. Διοργανώνεται κάθε χρόνο από φοιτητές για φοιτητές,
              με στόχο τη διάδοση της γνώσης, την ανταλλαγή ιδεών και τη
              δικτύωση των συμμετεχόντων.
            </p>
            <p className="text-lg mb-6">
              Ξεκίνησε το 2007 στην Αθήνα και, από τότε, έχει εξελιχθεί σε έναν
              σημαντικό θεσμό που εδώ και πάνω από 15 χρόνια φέρνει κοντά
              φοιτητές, ακαδημαϊκούς και επαγγελματίες του χώρου. Κατά τη
              διάρκεια του συνεδρίου, οι συμμετέχοντες έχουν την ευκαιρία να
              παρακολουθήσουν ομιλίες, workshops, παρουσιάσεις ερευνητικών
              εργασιών (papers), καθώς και να συμμετάσχουν σε διαγωνισμούς και
              άλλες παράλληλες δράσεις. Παράλληλα, διεξάγεται το PreΣΦΗΜΜΥ 9,
              ένα Hackathon με θέμα την επίλυση προβλημάτων σε κυβερνοφυσικά
              συστήματα, τη διοργάνωση του οποίου έχει αναλάβει το ISSEL Group
              (Intelligent Systems and Software Engineering Labgroup). Επιπλέον,
              στο Career@ΣΦΗΜΜΥ, οι συμμετέχοντες θα έχουν τη δυνατότητα να
              έρθουν σε επαφή με εταιρείες του κλάδου μέσα από παρουσιάσεις,
              εταιρικά stands και συνεντεύξεις, στέλνοντας το βιογραφικό τους
              και διεκδικώντας ευκαιρίες καριέρας.
            </p>
            <p className="text-lg mb-6">
              Φέτος, το ΣΦΗΜΜΥ θα διεξαχθεί για 5η φορά στη Θεσσαλονίκη, υπό την
              αιγίδα του Τμήματος Ηλεκτρολόγων Μηχανικών & Μηχανικών Υπολογιστών
              του ΑΠΘ και της Περιφέρειας Κεντρικής Μακεδονίας, φιλοξενώντας τις
              δραστηριότητές του σε διάφορους χώρους του Αριστοτελείου
              Πανεπιστημίου Θεσσαλονίκης.
            </p>
            <Link href="/agenda" passHref>
              <motion.a
                variants={fadeInUp}
                className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 shadow-lg transform hover:scale-105 transition duration-300 inline-block text-center"
              >
                Επισκεφτείτε το Πρόγραμμα
              </motion.a>
            </Link>
          </motion.div>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          className="mt-16"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            Στόχοι του Συνεδρίου
          </h2>
          <ul className="list-disc list-inside space-y-4 text-lg text-gray-400">
            <motion.li
              variants={fadeInUp}
              className="hover:text-gray-200 transition duration-300"
            >
              Ενίσχυση της συνεργασίας μεταξύ φοιτητών και επαγγελματιών.
            </motion.li>
            <motion.li
              variants={fadeInUp}
              className="hover:text-gray-200 transition duration-300"
            >
              Προώθηση της καινοτομίας σε κρίσιμους τομείς τεχνολογίας.
            </motion.li>
            <motion.li
              variants={fadeInUp}
              className="hover:text-gray-200 transition duration-300"
            >
              Ενίσχυση της συμμετοχής γυναικών και μειονοτήτων στον χώρο της
              μηχανικής.
            </motion.li>
            <motion.li
              variants={fadeInUp}
              className="hover:text-gray-200 transition duration-300"
            >
              Παροχή ευκαιριών networking για την ανάπτυξη καριέρας.
            </motion.li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
