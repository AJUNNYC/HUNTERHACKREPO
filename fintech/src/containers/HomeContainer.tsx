// src/containers/HomeContainer.tsx
import { useState, useEffect } from 'react';
import HomeView from '../views/HomeView';
import BudgetView from '../views/BudgetView';
import { useAuth } from '../config/AuthUser';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

interface UserSettings {
  monthlyInvestment: number;
  years: number;
  selectedRate: string;
  customRate: number;
  lumpSums: Array<{ amount: number; year: number }>;
  totalGoal: number;
}

export default function HomeContainer() {
  const { userData } = useAuth();
  const [monthlyInvestment, setMonthlyInvestment] = useState(500);
  const [years, setYears] = useState(30);
  const [selectedRate, setSelectedRate] = useState("spy");
  const [customRate, setCustomRate] = useState(0.05);
  const [lumpSums, setLumpSums] = useState<Array<{ amount: number; year: number }>>([]);
  const [totalGoal, setTotalGoal] = useState(2000000);
  const [viewType, setViewType] = useState<'home' | 'budget' >('budget');

  // Load settings when user logs in
  useEffect(() => {
    const loadSettings = async () => {
      if (!userData) return;
      
      try {
        const userRef = doc(db, "users", userData.userId);
        const docSnap = await getDoc(userRef);
        
        if (docSnap.exists() && docSnap.data().settings) {
          const settings = docSnap.data().settings as UserSettings;
          setMonthlyInvestment(settings.monthlyInvestment);
          setYears(settings.years);
          setSelectedRate(settings.selectedRate);
          setCustomRate(settings.customRate);
          setLumpSums(settings.lumpSums);
          setTotalGoal(settings.totalGoal);
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    };

    loadSettings();
  }, [userData]);

  // Save settings to Firestore
  const saveSettings = async () => {
    if (!userData) return;
    
    try {
      const userRef = doc(db, "users", userData.userId);
      const settings: UserSettings = {
        monthlyInvestment,
        years,
        selectedRate,
        customRate,
        lumpSums,
        totalGoal,
      };
      
      await setDoc(userRef, { settings }, { merge: true });
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  const rates = {
    low: 0.04,
    real: 0.0637,
    spy: 0.1011,
    custom: customRate,
  };

  const calculateInvestment = () => {
    const rate = rates[selectedRate as keyof typeof rates];
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

  if (viewType == 'budget'){
    return (
      <BudgetView
        onSaveSettings={saveSettings}
      
      />
    )
  } else{
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
        onSaveSettings={saveSettings}
      />
    );
  }

}
