// import React, { useRef, useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { ThemeColors } from "./types";
// import { uploadCV, getCV, deleteCV } from "../../apis/services/fileService";

// interface CvUploadProps {
//   themeColors: ThemeColors;
//   theme: string;
// }

// const CvUpload: React.FC<CvUploadProps> = ({ themeColors, theme }) => {
//   const [cvUploaded, setCvUploaded] = useState(false);
//   const [cvUrl, setCvUrl] = useState<string | null>(null);
//   const [cvFileName, setCvFileName] = useState<string>("No CV uploaded");
//   const [isUploadingCV, setIsUploadingCV] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   // Removed uploadDate state
//   const fileInputRef = useRef<HTMLInputElement>(null);
  
//   const { textColor, borderColor, accentColor } = themeColors;

//   useEffect(() => {
//     fetchCV();
//   }, []);

//   const fetchCV = async () => {
//     setIsLoading(true);
//     try {
//       const result = await getCV();
//       console.log("result", result)
//       if (result && typeof result === 'object' && result.exists == true) {
//         // CV exists and we got back valid data
//         setCvUrl(result.url);
//         setCvFileName(result.filename || "My CV");
//         setCvUploaded(true);
//       } else {
//         // No CV found - returned object with null values
//         setCvUrl(null);
//         setCvFileName("No CV uploaded");
//         setCvUploaded(false);
//       }
//     } catch (error) {
//       // Error handling remains the same
//       console.error('Unexpected error loading CV:', error);
//       toast.error("Could not load CV. Please try again later.");
//       setCvFileName("Error loading CV");
//       setCvUploaded(false);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // Validate file type (PDF only)
//     if (file.type !== 'application/pdf') {
//       toast.error('Please upload a PDF file');
//       return;
//     }

//     // Validate file size (max 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       toast.error('File size must be less than 5MB');
//       return;
//     }

//     setIsUploadingCV(true);

//     try {
//       // Call the uploadCV function from AuthApi.js
//       await uploadCV(file);
      
//       // Update state with new CV info
//       setCvUploaded(true);
//       setCvFileName(file.name);
//       // Removed setUploadDate
      
//       // Re-fetch CV to get the URL from backend
//       await fetchCV();
      
//     } catch (error) {
//       const errorMessage = error instanceof Error 
//         ? error.message 
//         : 'Unknown error occurred';
//       toast.error(`Error uploading CV: ${errorMessage}`);
//     } finally {
//       setIsUploadingCV(false);
//     }
//   };

//   const handleRemoveCV = async () => {
//     if (!window.confirm('Are you sure you want to remove your CV?')) return;

//     setIsLoading(true);
//     try {
//       // Call the deleteCV function from AuthApi.js
//       await deleteCV();
      
//       setCvUploaded(false);
//       setCvUrl(null);
//       setCvFileName("No CV uploaded");
//       // Removed setUploadDate
      
//       // Clear the file input value so the same file can be re-uploaded
//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }
      
//     } catch (error) {
//       const errorMessage = error instanceof Error 
//         ? error.message 
//         : 'Unknown error occurred';
//       toast.error(`Error removing CV: ${errorMessage}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleViewCV = () => {
//     if (cvUrl) {
//       window.open(cvUrl, '_blank');
//     } else {
//       toast.error('CV preview is not available');
//     }
//   };

//   return (
//     <div className="mb-8">
//       <h2 className={`${textColor} text-xl font-bold mb-4 border-b ${borderColor} pb-2`}>
//         CV / Resume Management
//       </h2>
      
//       <div className="mt-6">
//         <input
//           type="file"
//           ref={fileInputRef}
//           onChange={handleCVUpload}
//           className="hidden"
//           accept="application/pdf"
//           id="cv-upload"
//         />
        
//         {isLoading ? (
//           // Loading state
//           <div className="flex justify-center items-center p-8">
//             <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//             <span className="ml-2 text-sm text-gray-500">Loading CV status...</span>
//           </div>
//         ) : cvUploaded ? (
//           // CV exists view
//           <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"} mb-4`}>
//             <div className="flex items-start justify-between">
//               <div className="flex items-center max-w-[calc(100%-80px)]"> {/* Set max width to leave room for buttons */}
//                 <svg className="w-8 h-8 text-red-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                   <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
//                 </svg>
//                 <div className="min-w-0"> {/* This ensures the div can shrink below its content size */}
//                   <p className={`${textColor} font-medium truncate`} title={cvFileName || "Your_CV.pdf"}>
//                     {cvFileName || "Your_CV.pdf"}
//                   </p>
//                 </div>
//               </div>
              
//               <div className="flex space-x-2 flex-shrink-0"> {/* Prevent buttons from shrinking */}
//                 <button 
//                   onClick={handleViewCV}
//                   disabled={!cvUrl}
//                   className={`p-2 ${theme === "dark" ? "bg-blue-700" : "bg-blue-100"} rounded-md hover:opacity-80 ${!cvUrl ? 'opacity-50 cursor-not-allowed' : ''}`}
//                   title="View CV"
//                 >
//                   <svg className={`w-4 h-4 ${theme === "dark" ? "text-blue-300" : "text-blue-700"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                   </svg>
//                 </button>
                
//                 <button 
//                   onClick={handleRemoveCV}
//                   className={`p-2 ${theme === "dark" ? "bg-red-900" : "bg-red-100"} rounded-md hover:opacity-80`}
//                   title="Delete CV"
//                 >
//                   <svg className={`w-4 h-4 ${theme === "dark" ? "text-red-300" : "text-red-700"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         ) : (
//           // No CV uploaded view
//           <div className={`border-2 border-dashed ${theme === "dark" ? "border-gray-700" : "border-gray-300"} p-6 rounded-lg text-center`}>
//             <svg className={`w-12 h-12 mx-auto ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//             </svg>
            
//             <p className={`${textColor} mt-4`}>No CV uploaded yet</p>
//             <p className="text-sm text-gray-500 mb-6">PDF format, max 5MB</p>
            
//             <label
//               htmlFor="cv-upload"
//               className={`${accentColor} text-white py-2 px-4 rounded-lg hover:opacity-90 transition flex items-center justify-center mx-auto cursor-pointer inline-block`}
//             >
//               {isUploadingCV ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Uploading...
//                 </>
//               ) : (
//                 <>
//                   <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                   </svg>
//                   Upload CV
//                 </>
//               )}
//             </label>
//           </div>
//         )}
        
//         <div className="mt-4">
//           <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
//             Your CV will be shared with sponsors for potential job opportunities at the event.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CvUpload;