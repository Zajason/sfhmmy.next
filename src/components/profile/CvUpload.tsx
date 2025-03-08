import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { ThemeColors } from "./types";

interface CvUploadProps {
  themeColors: ThemeColors;
  theme: string;
}

const CvUpload: React.FC<CvUploadProps> = ({ themeColors, theme }) => {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvUploaded, setCvUploaded] = useState(false);
  const [isUploadingCV, setIsUploadingCV] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { textColor, borderColor, accentColor } = themeColors;

  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type (PDF only)
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setCvFile(file);
    setIsUploadingCV(true);

    try {
      // Waiting here connection with the backend
      // const formData = new FormData();
      // formData.append('cv', file);
      // await fetch('/api/user/cv', { method: 'POST', body: formData });

      // Mock successful upload
      setTimeout(() => {
        setCvUploaded(true);
        setIsUploadingCV(false);
        toast.success('CV uploaded successfully!');
      }, 1500);
    } catch (error) {
      toast.error(`Error uploading CV: ${error.message}`);
      setIsUploadingCV(false);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      // Reset the value before clicking to fix re-upload issue
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleRemoveCV = async () => {
    if (!window.confirm('Are you sure you want to remove your CV?')) return;

    try {
      // In a real app, call API to delete the CV
      // await fetch('/api/user/cv', { method: 'DELETE' });
      
      // Mock successful deletion
      setCvUploaded(false);
      setCvFile(null);
      
      // Clear the file input value so the same file can be re-uploaded
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      toast.success('CV removed successfully');
    } catch (error) {
      toast.error(`Error removing CV: ${error.message}`);
    }
  };

  return (
    <div className="mb-8">
      <h2 className={`${textColor} text-xl font-bold mb-4 border-b ${borderColor} pb-2`}>
        CV / Resume Management
      </h2>
      
      <div className="mt-6">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleCVUpload}
          className="hidden"
          accept="application/pdf"
          id="cv-upload"
        />
        
        {cvUploaded ? (
          <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"} mb-4`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <svg className="w-8 h-8 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className={`${textColor} font-medium`}>{cvFile?.name || "Your_CV.pdf"}</p>
                  <p className="text-sm text-gray-500">
                    Uploaded on {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => window.open('/path/to/cv.pdf', '_blank')} 
                  className={`p-2 ${theme === "dark" ? "bg-blue-700" : "bg-blue-100"} rounded-md hover:opacity-80`}
                  title="View CV"
                >
                  <svg className={`w-4 h-4 ${theme === "dark" ? "text-blue-300" : "text-blue-700"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                
                <button 
                  onClick={handleRemoveCV}
                  className={`p-2 ${theme === "dark" ? "bg-red-900" : "bg-red-100"} rounded-md hover:opacity-80`}
                  title="Delete CV"
                >
                  <svg className={`w-4 h-4 ${theme === "dark" ? "text-red-300" : "text-red-700"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={`border-2 border-dashed ${theme === "dark" ? "border-gray-700" : "border-gray-300"} p-6 rounded-lg text-center`}>
            <svg className={`w-12 h-12 mx-auto ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            
            <p className={`${textColor} mt-4`}>No CV uploaded yet</p>
            <p className="text-sm text-gray-500 mb-6">PDF format, max 5MB</p>
            
            <label
              htmlFor="cv-upload"
              className={`${accentColor} text-white py-2 px-4 rounded-lg hover:opacity-90 transition flex items-center justify-center mx-auto cursor-pointer inline-block`}
            >
              {isUploadingCV ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Upload CV
                </>
              )}
            </label>
          </div>
        )}
        
        <div className="mt-4">
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Your CV will be shared with sponsors for potential job opportunities at the event.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CvUpload;