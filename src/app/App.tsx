import { useState } from 'react';
import { InvestmentCalculator, InvestmentData, InvestmentType } from './components/InvestmentCalculator';
import { InvestmentResults } from './components/InvestmentResults';
import { GrowthChart } from './components/GrowthChart';
import { ComparisonChart } from './components/ComparisonChart';
import { EducationPanel } from './components/EducationPanel';
import { RetirementGoals } from './components/RetirementGoals';
import { GoalBasedCalculator } from './components/GoalBasedCalculator';
import { PresetScenarios } from './components/PresetScenarios';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Calculator, BarChart3, BookOpen, TrendingUp, Target } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [selectedType, setSelectedType] = useState<InvestmentType>('sip');
  const [investmentData, setInvestmentData] = useState<InvestmentData | null>(null);
  const [allInvestments, setAllInvestments] = useState<Record<InvestmentType, InvestmentData | null>>({
    sip: null,
    rd: null,
    fd: null,
    lumpsum: null,
  });

  const handleCalculate = (data: InvestmentData) => {
    setInvestmentData(data);
    setAllInvestments((prev) => ({
      ...prev,
      [data.type]: data,
    }));
  };

  const getComparisonData = () => {
    const comparisons = [];
    for (const [type, data] of Object.entries(allInvestments)) {
      if (data) {
        comparisons.push({
          type,
          invested: data.totalInvested,
          returns: data.totalReturns,
          total: data.maturityAmount,
        });
      }
    }
    return comparisons;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
              <TrendingUp className="size-8 text-white" />
            </div>
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Retirement & Investment Simulator
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visualize how your savings grow over time with different investment instruments. 
            Make informed decisions for your financial future.
          </p>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="calculator" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="size-4" />
              <span className="hidden sm:inline">Calculate</span>
            </TabsTrigger>
            <TabsTrigger value="goal" className="flex items-center gap-2">
              <Target className="size-4" />
              <span className="hidden sm:inline">Goal</span>
            </TabsTrigger>
            <TabsTrigger value="compare" className="flex items-center gap-2">
              <BarChart3 className="size-4" />
              <span className="hidden sm:inline">Compare</span>
            </TabsTrigger>
            <TabsTrigger value="learn" className="flex items-center gap-2">
              <BookOpen className="size-4" />
              <span className="hidden sm:inline">Learn</span>
            </TabsTrigger>
          </TabsList>

          {/* Calculator Tab */}
          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
              {(['sip', 'rd', 'fd', 'lumpsum'] as InvestmentType[]).map((type, index) => (
                <motion.button
                  key={type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedType(type)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedType === type
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/20 shadow-md'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                  }`}
                >
                  <div className="uppercase font-semibold">{type}</div>
                  {allInvestments[type] && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-green-600 mt-1"
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <InvestmentCalculator
                key={selectedType}
                type={selectedType}
                onCalculate={handleCalculate}
              />

              {investmentData && investmentData.type === selectedType && (
                <InvestmentResults data={investmentData} />
              )}
            </div>

            {investmentData && investmentData.type === selectedType && (
              <GrowthChart data={investmentData} />
            )}
          </TabsContent>

          {/* Goal-Based Calculator Tab */}
          <TabsContent value="goal" className="space-y-6">
            <GoalBasedCalculator />
          </TabsContent>

          {/* Compare Tab */}
          <TabsContent value="compare" className="space-y-6">
            <div className="text-center mb-6">
              <h2>Compare All Investments</h2>
              <p className="text-muted-foreground">
                Calculate each investment type in the Calculator tab to see comparisons here
              </p>
            </div>

            {getComparisonData().length > 0 ? (
              <>
                <ComparisonChart comparisons={getComparisonData()} />
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(allInvestments).map(([type, data]) => {
                    if (!data) return null;
                    return (
                      <div key={type} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <h3 className="uppercase mb-3">{type}</h3>
                        <div className="space-y-2">
                          <div>
                            <p className="text-muted-foreground">Invested</p>
                            <p className="font-semibold">
                              ₹{data.totalInvested.toLocaleString('en-IN')}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Maturity</p>
                            <p className="font-semibold text-green-600">
                              ₹{Math.round(data.maturityAmount).toLocaleString('en-IN')}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Returns</p>
                            <p className="font-semibold text-blue-600">
                              {((data.totalReturns / data.totalInvested) * 100).toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
                <BarChart3 className="size-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-gray-600 dark:text-gray-400 mb-2">No Data to Compare</h3>
                <p className="text-muted-foreground">
                  Switch to the Calculator tab and calculate different investment types to see comparisons
                </p>
              </div>
            )}
          </TabsContent>

          {/* Learn Tab */}
          <TabsContent value="learn">
            <div className="space-y-6">
              <EducationPanel />
              <RetirementGoals />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}