import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { InvestmentData } from './InvestmentCalculator';
import { TrendingUp, Wallet, Award } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { motion } from 'motion/react';

interface InvestmentResultsProps {
  data: InvestmentData;
}

export function InvestmentResults({ data }: InvestmentResultsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="size-5 text-blue-600" />
              <span className="text-muted-foreground">Total Invested</span>
            </div>
            <p className="font-semibold text-blue-600">
              <AnimatedCounter value={data.totalInvested} prefix="₹" decimals={0} />
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="size-5 text-green-600" />
              <span className="text-muted-foreground">Estimated Returns</span>
            </div>
            <p className="font-semibold text-green-600">
              <AnimatedCounter value={data.totalReturns} prefix="₹" decimals={0} />
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-2">
              <Award className="size-5 text-purple-600" />
              <span className="text-muted-foreground">Maturity Value</span>
            </div>
            <p className="font-semibold text-purple-600">
              <AnimatedCounter value={data.maturityAmount} prefix="₹" decimals={0} />
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-2 pt-4 border-t"
        >
          <div className="flex justify-between">
            <span className="text-muted-foreground">Investment Type</span>
            <span className="font-medium uppercase">{data.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Interest Rate</span>
            <span className="font-medium">{data.interestRate}% p.a.</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Time Period</span>
            <span className="font-medium">{data.years} Years</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Return on Investment</span>
            <span className="font-medium text-green-600">
              {((data.totalReturns / data.totalInvested) * 100).toFixed(2)}%
            </span>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}