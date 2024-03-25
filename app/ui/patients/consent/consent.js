"use client";
import React, { useState } from "react";
import styles from "../transactions/transactions.module.css";

const PatientConsent = () => {
  const [consentGiven, setConsentGiven] = useState(false);

  const handleConsent = () => {
    setConsentGiven(false);
  };

  return (
    <div className={styles.consentContainer}>
      <h2 className={styles.consentTitle}>Patient Consent Form</h2>
      <div className={styles.consentForm}>
        <p className={styles.consentText}>
          I hereby give my full consent to receive medical treatment and fully
          understand the risks involved.
        </p>
        <button
          className={styles.consentButton}
          onClick={handleConsent}
          disabled={consentGiven}
        >
          {consentGiven ? "Consent Given" : "Give Consent"}
        </button>
        {consentGiven && (
          <p className={styles.consentConfirmation}>
            Thank you for giving your consent.
          </p>
        )}
      </div>
    </div>
  );
};

export default PatientConsent;
