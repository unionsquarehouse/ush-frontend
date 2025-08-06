import { useState } from "react";
import { motion } from "framer-motion";
import { FaKey } from "react-icons/fa";

const MortgageCalculator = ({ priceValue, currency }) => {
  const [downPaymentPercentage, setDownPaymentPercentage] = useState(25);
  const [loanTerm, setLoanTerm] = useState(25);
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateMonthlyPayment = () => {
    const principal = priceValue - (priceValue * (downPaymentPercentage / 100));
    const interestRate = 0.04; // Assuming a fixed interest rate of 4%
    const numberOfPayments = loanTerm * 12;
    const monthlyInterestRate = interestRate / 12;

    const payment = (principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    setMonthlyPayment(payment);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "downPayment") {
      setDownPaymentPercentage(value);
    } else if (name === "loanTerm") {
      setLoanTerm(value);
    }
    // Reset monthly payment when inputs change
    setMonthlyPayment(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white  p-6 shadow-xl border border-[#D2CEB9] hover:shadow-2xl transition-shadow duration-300"
    >
      <h3 className="font-display text-2xl font-semibold mb-6 text-brand flex items-center">
        <FaKey className="mr-3 text-brand w-5 h-5" />
        Luxury Financing
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-lg font-montserrat font-medium text-earth-700 mb-2">Property Investment</label>
          <div className="bg-gradient-to-br from-earth-50 to-white border border-earth-200/50  px-4 py-3 shadow-sm">
            <span className="font-display font-semibold text-earth-900">{currency} {Number(priceValue).toLocaleString()}</span>
          </div>
        </div>
        <div>
          <label className="block text-lg font-montserrat font-medium text-earth-700 mb-2">Down Payment (%)</label>
          <input 
            type="number" 
            name="downPayment"
            value={downPaymentPercentage}
            onChange={handleInputChange}
            className="w-full bg-gradient-to-br text-black from-white to-earth-50 border border-earth-200/50  px-4 py-3 font-montserrat focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 transition-all duration-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-lg font-montserrat font-medium text-earth-700 mb-2">Loan Term (Years)</label>
          <select 
            name="loanTerm"
            value={loanTerm}
            onChange={handleInputChange}
            className="w-full text-black bg-gradient-to-br from-white to-earth-50 border border-earth-200/50  px-4 py-3 font-montserrat focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 transition-all duration-300 shadow-sm"
          >
            <option value={25}>25</option>
            <option value={20}>20</option>
            <option value={15}>15</option>
            <option value={10}>10</option>
          </select>
        </div>
        <button 
          onClick={calculateMonthlyPayment}
          className="w-full bg-gradient-to-r text-lg from-brand to-brand-hover text-white py-3  font-montserrat font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Calculate Premium Financing
        </button>

        {monthlyPayment !== null && (
          <div className="mt-4 p-4 bg-green-100 border border-green-300 ">
            <h4 className="font-semibold text-earth-900">Estimated Monthly Payment:</h4>
            <p className="text-lg font-display text-earth-900">{currency} {monthlyPayment.toFixed(2)}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MortgageCalculator;
