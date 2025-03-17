import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section id="middleSection" className="w-full bg-black text-white py-20">
      {/* Container for everything, centered with w-4/5 */}
      <div className="w-4/5 mx-auto">
        {/* Floated Image Container */}
        <motion.div
          className="relative md:float-left md:mr-6 md:mb-6 w-full md:w-1/3"
          initial={{ x: -140, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
        >
          {/* Badge in the corner */}
          <div className="absolute -top-10 -left-10 bg-blue-500 text-white w-32 h-32 flex items-center justify-center rounded-full z-10">
            <div className="text-center">
              <p className="text-3xl font-bold">16ο</p>
              <p className="text-sm">Συνέδριο</p>
            </div>
          </div>

          {/* Image itself */}
          <img
            src="images/others/conference.jpg"
            alt="Conference Visual"
            className="rounded-xl shadow-lg w-full h-auto"
          />
        </motion.div>

        {/* Main Text (will flow around the floated image) */}
        <motion.div
          initial={{ x: "9vw", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h3 className="text-blue-400 text-lg font-semibold mb-4">Σχετικά</h3>
          <h1 className="text-4xl font-bold mb-6">Τι είναι το ΣΦΗΜΜΥ;</h1>

          <p className="text-lg mb-4">
            Το ΣΦΗΜΜΥ (Συνέδριο Φοιτητών Ηλεκτρολόγων Μηχανικών και Μηχανικών
            Υπολογιστών) είναι το μεγαλύτερο φοιτητικό συνέδριο του κλάδου στην
            Ελλάδα. Διοργανώνεται κάθε χρόνο από φοιτητές για φοιτητές, με στόχο
            τη διάδοση της γνώσης, την ανταλλαγή ιδεών και τη δικτύωση των
            συμμετεχόντων.
          </p>
          <p className="text-lg mb-8">
            Ξεκίνησε το 2007 στην Αθήνα και, από τότε, έχει εξελιχθεί σε έναν
            σημαντικό θεσμό που εδώ και πάνω από 15 χρόνια φέρνει κοντά
            φοιτητές, ακαδημαϊκούς και επαγγελματίες του χώρου. Κατά τη διάρκεια
            του συνεδρίου, οι συμμετέχοντες έχουν την ευκαιρία να
            παρακολουθήσουν ομιλίες, workshops, παρουσιάσεις ερευνητικών
            εργασιών (papers), καθώς και να συμμετάσχουν σε διαγωνισμούς και
            άλλες παράλληλες δράσεις. Παράλληλα, διεξάγεται το PreΣΦΗΜΜΥ 9, ένα
            Hackathon με θέμα την επίλυση προβλημάτων σε κυβερνοφυσικά
            συστήματα, τη διοργάνωση του οποίου έχει αναλάβει το ISSEL Group
            (Intelligent Systems and Software Engineering Labgroup). Επιπλέον,
            στο Career@ΣΦΗΜΜΥ, οι συμμετέχοντες θα έχουν τη δυνατότητα να έρθουν
            σε επαφή με εταιρείες του κλάδου μέσα από παρουσιάσεις, εταιρικά
            stands και συνεντεύξεις, στέλνοντας το βιογραφικό τους και
            διεκδικώντας ευκαιρίες καριέρας.
          </p>
          <p className="text-lg mb-4">
            Φέτος, το ΣΦΗΜΜΥ θα διεξαχθεί για 5η φορά στη Θεσσαλονίκη, υπό την
            αιγίδα του Τμήματος Ηλεκτρολόγων Μηχανικών & Μηχανικών Υπολογιστών
            του ΑΠΘ και της Περιφέρειας Κεντρικής Μακεδονίας, φιλοξενώντας τις
            δραστηριότητές του σε διάφορους χώρους του Αριστοτελείου
            Πανεπιστημίου Θεσσαλονίκης.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
