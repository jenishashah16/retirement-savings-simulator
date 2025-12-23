import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { Calculator, TrendingUp } from 'lucide-react';

export type InvestmentType = 'sip' | 'rd' | 'fd' | 'lumpsum';

interface InvestmentCalculatorProps {
  type: InvestmentType;
  onCalculate: (data: InvestmentData) => void;
}

export interface InvestmentData {
  type: InvestmentType;
  principal: number;
  monthlyAmount: number;
  interestRate: number;
  years: number;
  maturityAmount: number;
  totalInvested: number;
  totalReturns: number;
}

const investmentInfo = {
  sip: {
    title: 'SIP Calculator',
    description: 'Systematic Investment Plan - Invest regularly in mutual funds',
    icon: <TrendingUp className="size-5" />,
    color: 'text-blue-600',
  },
  rd: {
    title: 'RD Calculator',
    description: 'Recurring Deposit - Fixed monthly deposits with guaranteed returns',
    icon: <Calculator className="size-5" />,
    color: 'text-green-600',
  },
  fd: {
    title: 'FD Calculator',
    description: 'Fixed Deposit - One-time investment with fixed returns',
    icon: <Calculator className="size-5" />,
    color: 'text-orange-600',
  },
  lumpsum: {
    title: 'Lumpsum Calculator',
    description: 'One-time investment in mutual funds',
    icon: <TrendingUp className="size-5" />,
    color: 'text-purple-600',
  },
};

export function InvestmentCalculator({ type, onCalculate }: InvestmentCalculatorProps) {
  const [monthlyAmount, setMonthlyAmount] = useState(5000);
  const [principal, setPrincipal] = useState(100000);
  const [interestRate, setInterestRate] = useState(type === 'sip' || type === 'lumpsum' ? 12 : 7);
  const [years, setYears] = useState(10);

  const calculateReturns = () => {
    let maturityAmount = 0;
    let totalInvested = 0;

    if (type === 'sip') {
      // SIP calculation using compound interest formula
      const monthlyRate = interestRate / 12 / 100;
      const months = years * 12;
      maturityAmount =
        monthlyAmount * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
      totalInvested = monthlyAmount * months;
    } else if (type === 'rd') {
      // RD calculation
      const monthlyRate = interestRate / 12 / 100;
      const months = years * 12;
      maturityAmount =
        monthlyAmount * months + monthlyAmount * ((months * (months + 1)) / 2) * monthlyRate;
      totalInvested = monthlyAmount * months;
    } else if (type === 'fd') {
      // FD calculation with quarterly compounding
      const rate = interestRate / 100;
      const compoundingFrequency = 4; // Quarterly
      maturityAmount = principal * Math.pow(1 + rate / compoundingFrequency, compoundingFrequency * years);
      totalInvested = principal;
    } else if (type === 'lumpsum') {
      // Lumpsum calculation with annual compounding
      const rate = interestRate / 100;
      maturityAmount = principal * Math.pow(1 + rate, years);
      totalInvested = principal;
    }

    const totalReturns = maturityAmount - totalInvested;

    onCalculate({
      type,
      principal,
      monthlyAmount,
      interestRate,
      years,
      maturityAmount,
      totalInvested,
      totalReturns,
    });
  };

  // Recalculate whenever values change
  useEffect(() => {
    calculateReturns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthlyAmount, principal, interestRate, years]);

  const info = investmentInfo[type];
  const isRecurring = type === 'sip' || type === 'rd';

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className={info.color}>{info.icon}</div>
          <div>
            <CardTitle>{info.title}</CardTitle>
            <CardDescription>{info.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {isRecurring ? (
          <div className="space-y-2">
            <Label htmlFor={`${type}-monthly`}>Monthly Investment</Label>
            <Input
              id={`${type}-monthly`}
              type="number"
              value={monthlyAmount}
              onChange={(e) => setMonthlyAmount(Number(e.target.value))}
              min="500"
              step="500"
            />
            <Slider
              value={[monthlyAmount]}
              onValueChange={(value) => setMonthlyAmount(value[0])}
              min={500}
              max={100000}
              step={500}
            />
            <div className="flex justify-between">
              <span className="text-muted-foreground">₹500</span>
              <span className="text-muted-foreground">₹1,00,000</span>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor={`${type}-principal`}>Investment Amount</Label>
            <Input
              id={`${type}-principal`}
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              min="10000"
              step="10000"
            />
            <Slider
              value={[principal]}
              onValueChange={(value) => setPrincipal(value[0])}
              min={10000}
              max={10000000}
              step={10000}
            />
            <div className="flex justify-between">
              <span className="text-muted-foreground">₹10,000</span>
              <span className="text-muted-foreground">₹1,00,00,000</span>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor={`${type}-rate`}>Expected Returns (% p.a.)</Label>
          <Input
            id={`${type}-rate`}
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            min="1"
            max="30"
            step="0.5"
          />
          <Slider
            value={[interestRate]}
            onValueChange={(value) => setInterestRate(value[0])}
            min={1}
            max={30}
            step={0.5}
          />
          <div className="flex justify-between">
            <span className="text-muted-foreground">1%</span>
            <span className="text-muted-foreground">30%</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${type}-years`}>Time Period (Years)</Label>
          <Input
            id={`${type}-years`}
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            min="1"
            max="40"
          />
          <Slider
            value={[years]}
            onValueChange={(value) => setYears(value[0])}
            min={1}
            max={40}
            step={1}
          />
          <div className="flex justify-between">
            <span className="text-muted-foreground">1 Year</span>
            <span className="text-muted-foreground">40 Years</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}