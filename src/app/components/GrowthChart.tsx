import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { InvestmentData } from './InvestmentCalculator';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface GrowthChartProps {
  data: InvestmentData;
}

export function GrowthChart({ data }: GrowthChartProps) {
  const generateYearlyData = () => {
    const yearlyData = [];
    const { type, monthlyAmount, principal, interestRate, years } = data;

    for (let year = 0; year <= years; year++) {
      let invested = 0;
      let value = 0;

      if (type === 'sip') {
        const monthlyRate = interestRate / 12 / 100;
        const months = year * 12;
        if (months === 0) {
          invested = 0;
          value = 0;
        } else {
          invested = monthlyAmount * months;
          value = monthlyAmount * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
        }
      } else if (type === 'rd') {
        const monthlyRate = interestRate / 12 / 100;
        const months = year * 12;
        if (months === 0) {
          invested = 0;
          value = 0;
        } else {
          invested = monthlyAmount * months;
          value = monthlyAmount * months + monthlyAmount * ((months * (months + 1)) / 2) * monthlyRate;
        }
      } else if (type === 'fd' || type === 'lumpsum') {
        const rate = interestRate / 100;
        invested = year === 0 ? 0 : principal;
        value = year === 0 ? 0 : principal * Math.pow(1 + rate, year);
      }

      yearlyData.push({
        year: year,
        invested: Math.round(invested),
        value: Math.round(value),
        returns: Math.round(value - invested),
      });
    }

    return yearlyData;
  };

  const chartData = generateYearlyData();

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(1)}Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`;
    } else if (value >= 1000) {
      return `₹${(value / 1000).toFixed(1)}K`;
    }
    return `₹${value}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Growth Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year" 
              label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
            />
            <YAxis 
              tickFormatter={formatCurrency}
              label={{ value: 'Amount', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              formatter={(value: number) => formatCurrency(value)}
              labelFormatter={(label) => `Year ${label}`}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="invested"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorInvested)"
              name="Amount Invested"
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorValue)"
              name="Total Value"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
