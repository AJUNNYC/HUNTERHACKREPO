// src/containers/HomeContainer.tsx
import { useState } from 'react';
import HomeView from '../views/HomeView';

export default function HomeContainer() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(500);
  const [years, setYears] = useState(30);
  const [selectedRate, setSelectedRate] = useState("spy");
  const [customRate, setCustomRate] = useState(0.05);
  const [lumpSums, setLumpSums] = useState<Array<{ amount: number; year: number }>>([]);
  const [totalGoal, setTotalGoal] = useState(2000000);

  const rates = {
    low: 0.04,
    real: 0.0637,
    spy: 0.1011,
    custom: customRate,
  };

  const calculateInvestment = () => {
    const rate = rates[selectedRate as keyof typeof rates];
    const months = years * 12;
    let totalInvested = 0;
    let finalValue = 0;
    const yearlyData = [];

    for (let year = 1; year <= years; year++) {
      let yearValue = finalValue;
      for (let month = 1; month <= 12; month++) {
        yearValue = yearValue * (1 + rate / 12) + monthlyInvestment;
        totalInvested += monthlyInvestment;
      }
      const yearLumpSums = lumpSums.filter((ls) => ls.year === year);
      for (const ls of yearLumpSums) {
        yearValue += ls.amount;
        totalInvested += ls.amount;
      }
      finalValue = yearValue;
      yearlyData.push({ year, value: Math.round(yearValue), invested: Math.round(totalInvested) });
    }

    return {
      totalInvested,
      finalValue,
      additionalValue: finalValue - totalInvested,
      yearlyData,
    };
  };

  const results = calculateInvestment();
  const percentageOfGoal = Math.min(100, (results.finalValue / totalGoal) * 100);
  const estimatedYearsToGoal = results.finalValue >= totalGoal
    ? years
    : Math.ceil(Math.log(totalGoal / results.finalValue) / Math.log(1 + rates[selectedRate as keyof typeof rates]) + years);

  return (
    <HomeView
      monthlyInvestment={monthlyInvestment}
      setMonthlyInvestment={setMonthlyInvestment}
      years={years}
      setYears={setYears}
      selectedRate={selectedRate}
      setSelectedRate={setSelectedRate}
      customRate={customRate}
      setCustomRate={setCustomRate}
      lumpSums={lumpSums}
      setLumpSums={setLumpSums}
      totalGoal={totalGoal}
      setTotalGoal={setTotalGoal}
      results={results}
      percentageOfGoal={percentageOfGoal}
      estimatedYearsToGoal={estimatedYearsToGoal}
    />
  );
}
