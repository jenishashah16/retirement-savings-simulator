import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { Button } from './ui/button';
import { Target, TrendingUp, AlertCircle } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { motion } from 'motion/react';

export function GoalBasedCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [targetCorpus, setTargetCorpus] = useState(50000000); // 5 Crores
  const [currentSavings, setCurrentSavings] = useState(500000); // 5 Lakhs
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [showResult, setShowResult] = useState(false);

  const calculateRequiredInvestment = () => {
    const years = retirementAge - currentAge;
    const monthlyRate = expectedReturn / 12 / 100;
    const months = years * 12;

    // Future value of current savings
    const futureValueOfSavings = currentSavings * Math.pow(1 + expectedReturn / 100, years);

    // Remaining amount needed
    const remainingAmount = targetCorpus - futureValueOfSavings;

    // Monthly SIP required
    let monthlySIP = 0;
    if (remainingAmount > 0) {
      monthlySIP = (remainingAmount * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1);
    }

    // Calculate total invested
    const totalInvested = currentSavings + monthlySIP * months;

    return {
      monthlySIP: Math.max(0, monthlySIP),
      totalInvested,
      years,
      futureValueOfSavings,
      isAchievable: remainingAmount <= futureValueOfSavings,
    };
  };

  const result = calculateRequiredInvestment();
  const readinessScore = Math.min(100, (result.futureValueOfSavings / targetCorpus) * 100);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(2)} K`;
    }
    return `₹${amount.toFixed(0)}`;
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-lg">
            <Target className="size-6 text-white" />
          </div>
          <div>
            <CardTitle>Goal-Based Retirement Planner</CardTitle>
            <CardDescription>Set your retirement goal and we'll calculate what you need to invest</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-age">Current Age</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="current-age"
                  type="number"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(Number(e.target.value))}
                  min="18"
                  max="60"
                />
                <span className="text-muted-foreground whitespace-nowrap">years</span>
              </div>
              <Slider
                value={[currentAge]}
                onValueChange={(value) => setCurrentAge(value[0])}
                min={18}
                max={60}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="retirement-age">Retirement Age</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="retirement-age"
                  type="number"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(Number(e.target.value))}
                  min={currentAge + 1}
                  max="75"
                />
                <span className="text-muted-foreground whitespace-nowrap">years</span>
              </div>
              <Slider
                value={[retirementAge]}
                onValueChange={(value) => setRetirementAge(value[0])}
                min={currentAge + 1}
                max={75}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-corpus">Target Retirement Corpus</Label>
              <Input
                id="target-corpus"
                type="number"
                value={targetCorpus}
                onChange={(e) => setTargetCorpus(Number(e.target.value))}
                min="1000000"
                step="1000000"
              />
              <Slider
                value={[targetCorpus]}
                onValueChange={(value) => setTargetCorpus(value[0])}
                min={1000000}
                max={100000000}
                step={1000000}
              />
              <div className="flex justify-between">
                <span className="text-muted-foreground">₹10L</span>
                <span className="text-muted-foreground">₹10Cr</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-savings">Current Savings</Label>
              <Input
                id="current-savings"
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(Number(e.target.value))}
                min="0"
                step="100000"
              />
              <Slider
                value={[currentSavings]}
                onValueChange={(value) => setCurrentSavings(value[0])}
                min={0}
                max={50000000}
                step={100000}
              />
              <div className="flex justify-between">
                <span className="text-muted-foreground">₹0</span>
                <span className="text-muted-foreground">₹5Cr</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expected-return">Expected Returns (% p.a.)</Label>
              <Input
                id="expected-return"
                type="number"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                min="4"
                max="20"
                step="0.5"
              />
              <Slider
                value={[expectedReturn]}
                onValueChange={(value) => setExpectedReturn(value[0])}
                min={4}
                max={20}
                step={0.5}
              />
              <div className="flex justify-between">
                <span className="text-muted-foreground">4%</span>
                <span className="text-muted-foreground">20%</span>
              </div>
            </div>

            <Button
              onClick={() => setShowResult(true)}
              className="w-full mt-6"
              size="lg"
            >
              <TrendingUp className="size-4 mr-2" />
              Calculate My Plan
            </Button>
          </div>
        </div>

        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Readiness Score */}
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl border border-blue-200 dark:border-blue-900">
              <div className="text-center mb-4">
                <h3 className="mb-2">Retirement Readiness Score</h3>
                <div className="relative inline-block">
                  <svg className="size-32" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="10"
                      className="text-gray-200 dark:text-gray-700"
                    />
                    <motion.circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="10"
                      strokeLinecap="round"
                      className={
                        readinessScore >= 75
                          ? 'text-green-500'
                          : readinessScore >= 50
                          ? 'text-yellow-500'
                          : 'text-red-500'
                      }
                      strokeDasharray={`${2 * Math.PI * 50}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                      animate={{
                        strokeDashoffset: 2 * Math.PI * 50 * (1 - readinessScore / 100),
                      }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                      transform="rotate(-90 60 60)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-semibold">
                      <AnimatedCounter value={readinessScore} decimals={0} suffix="%" />
                    </span>
                  </div>
                </div>
              </div>

              {result.isAchievable ? (
                <div className="text-center text-green-700 dark:text-green-300">
                  <p>🎉 Great news! Your current savings alone will exceed your goal!</p>
                </div>
              ) : (
                <div className="text-center text-blue-700 dark:text-blue-300">
                  <p>You're on the right track! Follow the plan below to reach your goal.</p>
                </div>
              )}
            </div>

            {/* Results Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-900"
              >
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="size-5 text-purple-600" />
                  <span className="text-muted-foreground">Monthly SIP Required</span>
                </div>
                <p className="font-semibold text-purple-600">
                  <AnimatedCounter value={result.monthlySIP} prefix="₹" decimals={0} />
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Target className="size-5 text-green-600" />
                  <span className="text-muted-foreground">Time to Goal</span>
                </div>
                <p className="font-semibold text-green-600">
                  <AnimatedCounter value={result.years} suffix=" years" decimals={0} />
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-900"
              >
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="size-5 text-orange-600" />
                  <span className="text-muted-foreground">Total Investment</span>
                </div>
                <p className="font-semibold text-orange-600">{formatCurrency(result.totalInvested)}</p>
              </motion.div>
            </div>

            {/* Action Plan */}
            <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-xl border border-indigo-200 dark:border-indigo-900">
              <h4 className="mb-4">📋 Your Action Plan</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="size-6 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Start a Monthly SIP</p>
                    <p className="text-muted-foreground">
                      Invest ₹{Math.round(result.monthlySIP).toLocaleString('en-IN')} every month in a diversified mutual fund
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-6 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Review Annually</p>
                    <p className="text-muted-foreground">
                      Check your progress once a year and adjust for inflation (increase by 5-7%)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-6 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Stay Disciplined</p>
                    <p className="text-muted-foreground">
                      Continue investing through market ups and downs to benefit from rupee cost averaging
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
