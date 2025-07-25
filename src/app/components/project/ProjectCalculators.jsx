// components/project/ProjectCalculators.jsx
import { useMemo } from "react";

export default function ProjectCalculators({ pricing }) {
  const salePrice = pricing?.amounts?.sale || 0;
  const downPayment = 0.2 * salePrice;
  const mortgageYears = 25;
  const interestRate = 0.05;

  const monthlyPayment = useMemo(() => {
    const loanAmount = salePrice - downPayment;
    const monthlyRate = interestRate / 12;
    const totalMonths = mortgageYears * 12;

    if (!loanAmount || !monthlyRate || !totalMonths) return 0;

    return (
      (loanAmount * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -totalMonths))
    );
  }, [salePrice]);

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Mortgage Calculator</h2>
        <ul className="text-gray-700 space-y-1">
          <li><strong>Sale Price:</strong> AED {salePrice.toLocaleString()}</li>
          <li><strong>Down Payment (20%):</strong> AED {downPayment.toLocaleString()}</li>
          <li><strong>Loan Amount:</strong> AED {(salePrice - downPayment).toLocaleString()}</li>
          <li><strong>Interest Rate:</strong> 5%</li>
          <li><strong>Term:</strong> 25 years</li>
          <li><strong>Estimated Monthly Payment:</strong> AED {Math.round(monthlyPayment).toLocaleString()}</li>
        </ul>
      </div>

      {/* Optional Rental Yield (if annual rental price provided) */}
      {/* Replace with actual rent data if available */}
      {/* <div>
        <h3 className="text-xl font-semibold mb-2">Rental Yield</h3>
        <ul className="text-gray-700 space-y-1">
          <li><strong>Annual Rent:</strong> AED 320,000</li>
          <li><strong>Yield:</strong> {(320000 / salePrice * 100).toFixed(2)}%</li>
        </ul>
      </div> */}
    </section>
  );
}
