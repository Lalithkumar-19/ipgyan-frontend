import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const DisclaimerModal = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Prevent scrolling on both html and body elements
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    
    // Cleanup function to re-enable scrolling when component unmounts
    return () => {
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto relative">
        <div className="sticky top-0 bg-white p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold text-gray-800">Disclaimer</h2>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            aria-label="Close disclaimer"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 text-gray-700">
          <p className="mb-4 font-ineria">
            Welcome to IPGYAN! Before you proceed, please take a moment to read the following important information:
          </p>
          <p className="mb-4">
            The content on this website is provided for general informational purposes only and does not constitute legal advice. The information provided on this site is not a substitute for professional legal consultation.
          </p>
          <p className="mb-4">
            While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
          </p>
          <p className="mb-4">
            Any reliance you place on such information is therefore strictly at your own risk. In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
          </p>
          <p className="mb-4">
            Through this website, you are able to link to other websites which are not under our control. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
          </p>
          <p className="mb-4">
            Every effort is made to keep the website up and running smoothly. However, IP Gyan takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.
          </p>
          <p>
            By clicking "I Agree" below, you acknowledge that you have read and understood this disclaimer and agree to be bound by its terms.
          </p>
        </div>
        <div className="p-4 bg-gray-50 flex justify-end">
          <button
            onClick={handleClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
          >
            I Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;
