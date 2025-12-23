import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Shield, TrendingUp, Zap, Target } from 'lucide-react';
import { motion } from 'motion/react';

interface Scenario {
  name: string;
  description: string;
  icon: React.ReactNode;
  allocation: {
    equity: number;
    debt: number;
    gold: number;
  };
  expectedReturn: number;
  risk: 'Low' | 'Medium' | 'High';
  color: string;
  gradient: string;
}

interface PresetScenariosProps {
  onSelectScenario: (scenario: Scenario) => void;
}

export function PresetScenarios({ onSelectScenario }: PresetScenariosProps) {
  const scenarios: Scenario[] = [
    {
      name: 'Conservative',
      description: 'Low risk, stable returns. Ideal for those nearing retirement.',
      icon: <Shield className="size-6" />,
      allocation: { equity: 20, debt: 70, gold: 10 },
      expectedReturn: 7,
      risk: 'Low',
      color: 'text-green-600',
      gradient: 'from-green-400 to-emerald-500',
    },
    {
      name: 'Moderate',
      description: 'Balanced approach with moderate risk and returns.',
      icon: <Target className="size-6" />,
      allocation: { equity: 50, debt: 40, gold: 10 },
      expectedReturn: 10,
      risk: 'Medium',
      color: 'text-blue-600',
      gradient: 'from-blue-400 to-cyan-500',
    },
    {
      name: 'Aggressive',
      description: 'High risk, high returns. Best for young investors.',
      icon: <TrendingUp className="size-6" />,
      allocation: { equity: 80, debt: 15, gold: 5 },
      expectedReturn: 14,
      risk: 'High',
      color: 'text-orange-600',
      gradient: 'from-orange-400 to-red-500',
    },
    {
      name: 'Wealth Creator',
      description: 'Maximum equity exposure for long-term wealth creation.',
      icon: <Zap className="size-6" />,
      allocation: { equity: 95, debt: 0, gold: 5 },
      expectedReturn: 16,
      risk: 'High',
      color: 'text-purple-600',
      gradient: 'from-purple-400 to-pink-500',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Scenarios</CardTitle>
        <CardDescription>Choose a preset portfolio based on your risk appetite</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {scenarios.map((scenario, index) => (
            <motion.button
              key={scenario.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectScenario(scenario)}
              className="text-left p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all bg-white dark:bg-gray-800 hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${scenario.gradient} text-white shadow-lg`}>
                  {scenario.icon}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-white ${
                    scenario.risk === 'Low'
                      ? 'bg-green-500'
                      : scenario.risk === 'Medium'
                      ? 'bg-blue-500'
                      : 'bg-red-500'
                  }`}
                >
                  {scenario.risk} Risk
                </span>
              </div>

              <h4 className="mb-2">{scenario.name}</h4>
              <p className="text-muted-foreground mb-4">{scenario.description}</p>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-muted-foreground">Expected Return</span>
                    <span className={`${scenario.color} font-semibold`}>{scenario.expectedReturn}% p.a.</span>
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground mb-2">Asset Allocation</p>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Equity</span>
                        <span>{scenario.allocation.equity}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${scenario.allocation.equity}%` }}
                          transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Debt</span>
                        <span>{scenario.allocation.debt}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${scenario.allocation.debt}%` }}
                          transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Gold</span>
                        <span>{scenario.allocation.gold}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${scenario.allocation.gold}%` }}
                          transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                          className="h-full bg-gradient-to-r from-yellow-500 to-amber-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
