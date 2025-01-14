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
          <motion.div variants={fadeInUp} className="flex-1 mb-10 md:mb-0 md:mr-6">
            <img
              src="images/others/conference.jpg"
              alt="Conference Visual"
              className="rounded-xl shadow-lg transform transition duration-500"
            />
          </motion.div>

          {/* Right Section: Text */}
          <motion.div variants={fadeInUp} className="flex-1">
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
              Ενίσχυση της συμμετοχής γυναικών και μειονοτήτων στον χώρο της μηχανικής.
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
