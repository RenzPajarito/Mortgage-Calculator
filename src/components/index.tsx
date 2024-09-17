import { useState } from 'react'
import IconCalc from '../assets/images/icon-calculator.svg'
import Illustration from '../assets/images/illustration-empty.svg'

const MortgageCalculator: React.FC = () => {
  // Define states for input values
  const [mortgageAmount, setMortgageAmount] = useState<number | null>(null)
  const [mortgageTerm, setMortgageTerm] = useState<number | null>(null)
  const [interestRate, setInterestRate] = useState<number | null>(null)
  const [mortgageType, setMortgageType] = useState<string>('repayment') // Default type
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null)
  
  // Function to handle calculation logic
  const calculateRepayment = (e: React.FormEvent) => {
    e.preventDefault() // Prevent the form from refreshing the page

    if (mortgageAmount && mortgageTerm && interestRate) {
      const monthlyInterestRate = interestRate / 100 / 12
      const totalPayments = mortgageTerm * 12

      let payment

      if (mortgageType === 'repayment') {
        // Calculate monthly payment for repayment mortgage
        payment =
          (mortgageAmount * monthlyInterestRate) /
          (1 - Math.pow(1 + monthlyInterestRate, -totalPayments))
      } else {
        // Interest-only mortgage
        payment = (mortgageAmount * monthlyInterestRate)
      }

      setMonthlyPayment(payment)
    }
  }

  return (
    <div className="container w-screen h-screen bg-blue-100 flex justify-center items-center p-2">
      <div className="wrapper grid sm:grid-cols-2 sm:grid-rows-1 grid-rows-2 rounded-2xl overflow-hidden shadow-lg bg-gray-100">
        <div className="calculator w-auto h-auto py-10 bg-gray-100">
          <form className="w-full h-full" onSubmit={calculateRepayment}>
            <div className="flex justify-between px-8 py-4">
              <h1 className="text-xl font-semibold">Mortgage Calculator</h1>
              <button
                type="button"
                className="text-sm text-slate-500 underline"
                onClick={() => {
                  setMortgageAmount(null);
                  setMortgageTerm(null);
                  setInterestRate(null);
                  setMortgageType('repayment');
                  setMonthlyPayment(null);
                }}
              >
                Clear All
              </button>
            </div>
            <div className="input-fields">
              <div className="flex flex-col px-8">
                <label className="text-slate-600 text-sm mb-1">Mortgage Amount</label>
                <div className="relative">
                  <input
                    type="number"
                    value={mortgageAmount || ''}
                    onChange={(e) => setMortgageAmount(Number(e.target.value))}
                    className="
                    focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500
                   disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                   invalid:border-slate-500 invalid:text-slate-600
                   focus:invalid:border-yellow-500 focus:invalid:ring-yellow-500
                    w-full h-10 border border-slate-400 text-slate-700 rounded-md pl-12 font-semibold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    required
                  />
                  <p className="absolute top-0 left-0 w-10 h-full border border-slate-400 bg-blue-200 rounded-l-md flex justify-center items-center text-lg font-semibold text-slate-500">$</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 px-8 pt-4">
                <div className="flex flex-col">
                  <label className="text-slate-600 text-sm mb-1">Mortgage Term</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={mortgageTerm || ''}
                      onChange={(e) => setMortgageTerm(Number(e.target.value))}
                      className="
                      focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-slate-500 invalid:text-slate-600
                    focus:invalid:border-yellow-500 focus:invalid:ring-yellow-500
                      w-full h-10 border border-slate-400 text-slate-700 rounded-md pl-2 font-semibold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      required
                    />
                    <p className="absolute top-0 right-0 border border-slate-400 w-auto h-full bg-blue-200 rounded-r-md flex justify-center items-center text-md font-semibold text-slate-500 p-2">years</p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-slate-600 text-sm mb-1">Interest Rate</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={interestRate || ''}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="
                      focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-slate-500 invalid:text-slate-600
                    focus:invalid:border-yellow-500 focus:invalid:ring-yellow-500
                      w-full h-10 border border-slate-400 text-slate-700 rounded-md pl-2 font-semibold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      required
                    />
                    <p className="absolute top-0 right-0 w-10 h-full border border-slate-400 bg-blue-200 rounded-r-md flex justify-center items-center text-md font-semibold text-slate-500">%</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col px-8 pt-4">
                <label className="text-slate-600 text-sm mb-1">Mortgage Type</label>
                <div className="flex gap-5 border border-slate-400 px-3 py-2 mb-1 rounded-md">
                  <input
                    type="radio"
                    name="type"
                    value="repayment"
                    checked={mortgageType === 'repayment'}
                    onChange={(e) => setMortgageType(e.target.value)}
                    required
                  />
                  <p className="text-md font-medium text-slate-700">Repayment</p>
                </div>
                <div className="flex gap-5 border border-slate-400 px-3 py-2 rounded-md">
                  <input
                    type="radio"
                    name="type"
                    value="interest-only"
                    checked={mortgageType === 'interest-only'}
                    onChange={(e) => setMortgageType(e.target.value)}
                    required
                  />
                  <p className="text-md font-medium text-slate-700">Interest Only</p>
                </div>
              </div>
              <div className="px-8 mt-4">
                <button className="px-6 py-2 flex gap-2 rounded-full bg-yellow-300 text-md font-medium text-slate-800 hover:opacity-90">
                  <img src={IconCalc} alt="Icon Calculator" />
                  Calculate Repayments
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="result w-auto h-auto bg-slate-700 rounded-bl-3xl p-6">
          
          {monthlyPayment !== null ? (
            <div className=''>
                <h1 className="text-lg font-bold text-slate-100">Your results</h1>
                <p className='text-sm font-normal text-slate-200 py-4'>Your results are shown below based on the information you provided. To adjust the results,
                    edit the form and click the "calculate repayments" again.
                </p>
                <div className='w-full h-full bg-slate-900 p-4 rounded-md'>
                    <p className='text-sm text-slate-400 py-1'>Your monthly repayments</p>
                    <p className="text-4xl font-semibold text-yellow-300">${monthlyPayment.toFixed(2)}</p>
                </div>
            </div>
          ) : (
            <div className='relative h-full flex justify-center items-center flex-col'>
                <img src={Illustration} alt="Illustration" />
                <h1 className="text-lg font-bold text-slate-100">Result shown here</h1>
                <p className="text-sm font-normal text-slate-200 text-center">Complete the form and click "Calculate Repayments" to see what your monthly repayments would be.</p>
                <p className='absolute bottom-0 text-slate-400'>©2024 ZernCodes. All rights reserved</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MortgageCalculator