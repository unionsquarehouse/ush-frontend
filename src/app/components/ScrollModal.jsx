'use client'

import { useState, useEffect } from "react";
import ContactModal from "./ContactModal";

export default function ScrollModal() {
  const [showModal, setShowModal] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);

  useEffect(() => {
    // Check if the form was previously submitted
    const checkPreviousSubmission = () => {
      if (typeof window !== 'undefined') {
        const lastSubmission = localStorage.getItem('formSubmissionDate');
        
        if (lastSubmission) {
          const lastSubmissionDate = new Date(parseInt(lastSubmission));
          const currentDate = new Date();
          
          // Calculate difference in days
          const diffTime = currentDate - lastSubmissionDate;
          const diffDays = diffTime / (1000 * 60 * 60 * 24);
          
          // If less than 10 days have passed, don't show the modal
          if (diffDays < 10) {
            setHasShownModal(true);
            return true;
          }
        }
        
        // Also check if the modal was shown but not submitted in this session
        const sessionShown = sessionStorage.getItem('modalShown');
        if (sessionShown) {
          setHasShownModal(true);
          return true;
        }
        
        return false;
      }
      return false;
    };

    // Only set up scroll listener if no previous submission
    if (!checkPreviousSubmission()) {
      const handleScroll = () => {
        // Calculate scroll percentage
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        
        // Show modal when scrolled to 40% and hasn't been shown yet
        if (scrollPercent >= 40 && !hasShownModal) {
          setShowModal(true);
          setHasShownModal(true);
          // Remember that we've shown the modal in this session
          sessionStorage.setItem('modalShown', 'true');
        }
      };

      window.addEventListener('scroll', handleScroll);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [hasShownModal]);

  // Handle form submission
  const handleFormSubmit = () => {
    // Store the current timestamp in localStorage
    localStorage.setItem('formSubmissionDate', Date.now().toString());
    // Close the modal
    setShowModal(false);
  };

  return (
    <ContactModal 
      isOpen={showModal} 
      onClose={() => setShowModal(false)} 
      onSubmit={handleFormSubmit}
    />
  );
}

