import React from "react";
import { useTheme } from "../utils/ThemeContext";

export default function CareerSFHMMY() {
  const { theme } = useTheme();
  const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-blue-900";

  const scheduleItems = [
    { title: 'Registration', time: '09:00 AM - 10:00 AM' },
    { title: 'Space Hellas & SingularLogic', time: '10:00 AM - 10:20 AM' },
    { title: 'OTS', time: '10:25 AM - 10:45 AM' },
    { title: 'Yodeck', time: '10:50 AM - 11:10 AM' },
    { title: 'EY', time: '11:15 AM - 11:35 AM' },
    { title: 'Coffee Break', time: '11:30 AM - 12:00 PM', subtitle: true },
    { title: 'Netcompany', time: '12:00 PM - 12:20 PM' },
    { title: 'Sidenor', time: '12:25 PM - 12:45 PM' },
    { title: 'Elvalhalcor', time: '12:50 PM - 01:10 PM' },
    { title: 'Hellenic Cables', time: '01:15 PM - 01:35 PM' },
    { title: 'ΑΔΜΗΕ', time: '01:35 PM - 02:00 PM' },
    { title: 'Archirodon', time: '02:05 PM - 02:20 PM' },
  ];

  return (
    <div className={backgroundColor}>
      <div className="max-w-7xl mx-auto px-6 pt-24 space-y-6">
        <h1 className={`${textColor} text-2xl font-extrabold tracking-tight`}>  
          Ανακάλυψε νέες επαγγελματικές ευκαιρίες στο <span className="text-indigo-600">Career@ΣΦΗΜΜΥ</span>!
        </h1>

        <p className={`${textColor} text-base leading-relaxed`}>
          Στο πλαίσιο του <strong>16ου Πανελλήνιου Συνεδρίου</strong> Φοιτητών Ηλεκτρολόγων Μηχανικών &amp; Μηχανικών Υπολογιστών – <strong>ΣΦΗΜΜΥ 16</strong>,
          διοργανώνουμε την <strong>Κυριακή 27 Απριλίου</strong> το <strong>Career@ΣΦΗΜΜΥ</strong>, μια ξεχωριστή ημέρα αφιερωμένη στη σύνδεση των φοιτητών με τον επαγγελματικό κόσμο.
        </p>

        <p className={`${textColor} text-base leading-relaxed`}>
          Κατά τη διάρκεια του event, μεγάλες και ανερχόμενες εταιρείες του κλάδου θα παρουσιάσουν το έργο, το όραμα και τις ευκαιρίες καριέρας που προσφέρουν, στην Αίθουσα Τελετών του ΑΠΘ. Παράλληλα, φοιτητές που θα επιλεγούν από τις ίδιες τις εταιρείες θα έχουν την ευκαιρία να συμμετάσχουν σε <strong>προσωπικές συνεντεύξεις ή σύντομες συναντήσεις γνωριμίας</strong>, ανοίγοντας έτσι την πόρτα για πρακτική άσκηση, συνεργασία ή ακόμα και την πρώτη τους επαγγελματική εμπειρία!
        </p>

        <h2 className={`${textColor} text-xl font-semibold`}>Γιατί να συμμετάσχεις στο Career@ΣΦΗΜΜΥ;</h2>
        <ul className="space-y-2">
          <li className={`${textColor} flex items-start`}>
            <span className="text-green-500 mr-2">✅</span>
            <span>Θα έρθεις σε άμεση επαφή με κορυφαίες εταιρείες του τομέα σου.</span>
          </li>
          <li className={`${textColor} flex items-start`}>
            <span className="text-green-500 mr-2">✅</span>
            <span>Θα γνωρίσεις τις ανάγκες και τις προοπτικές της αγοράς από πρώτο χέρι.</span>
          </li>
          <li className={`${textColor} flex items-start`}>
            <span className="text-green-500 mr-2">✅</span>
            <span>Θα έχεις την ευκαιρία να ξεχωρίσεις και να κάνεις ένα σημαντικό πρώτο βήμα προς την καριέρα που ονειρεύεσαι.</span>
          </li>
        </ul>

        <h2 className={`${textColor} text-xl font-semibold`}>Πού θα γίνει;</h2>
        <p className={`${textColor} text-base leading-relaxed`}>
          Οι ομιλίες θα λάβουν χώρα στην <strong>Αίθουσα Τελετών του ΑΠΘ</strong>.<br />
          Οι συνεντεύξεις/συναντήσεις γνωριμίας θα γίνουν στο <strong>ΚΕΔΕΑ</strong>.<br />
          Παράλληλα, καθ’ όλη τη διάρκεια του Συνεδρίου θα υπάρχουν stands εταιρειών στο φουαγιέ της Αίθουσας Τελετών για γνωριμία με τους συνέδρους.
        </p>

        <h2 className={`${textColor} text-xl font-semibold`}>Ακολουθεί η λίστα με τις παρουσιάσεις των εταιρειών στην Αίθουσα Τελετών:</h2>
        <div className="space-y-6 text-center">
          {scheduleItems.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <h3 className={`text-base font-semibold ${item.subtitle ? 'italic' : ''} ${textColor}`}>{item.title}</h3>
              <span className={`${textColor} text-sm block`}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
