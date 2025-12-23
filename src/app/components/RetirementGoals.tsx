import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Target, Calendar, TrendingUp } from 'lucide-react';

export function RetirementGoals() {
  const milestones = [
    {
      age: 25,
      goal: 'Start Your Investment Journey',
      description: 'Begin with a small SIP. Time is your biggest advantage.',
      amount: '₹5,000/month',
      icon: <Calendar className="size-5" />,
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-950/20',
    },
    {
      age: 30,
      goal: 'Build Emergency Fund',
      description: 'Save 6-12 months of expenses in FD or liquid funds.',
      amount: '₹5-10 Lakhs',
      icon: <Target className="size-5" />,
      color: 'text-green-600',
      bg: 'bg-green-50 dark:bg-green-950/20',
    },
    {
      age: 40,
      goal: 'Accelerate Investments',
      description: 'Increase SIP amounts. Diversify across equity and debt.',
      amount: '₹25,000/month',
      icon: <TrendingUp className="size-5" />,
      color: 'text-purple-600',
      bg: 'bg-purple-50 dark:bg-purple-950/20',
    },
    {
      age: 50,
      goal: 'Secure & Rebalance',
      description: 'Shift from high-risk to stable instruments. Focus on capital preservation.',
      amount: '₹50 Lakhs+ corpus',
      icon: <Target className="size-5" />,
      color: 'text-orange-600',
      bg: 'bg-orange-50 dark:bg-orange-950/20',
    },
    {
      age: 60,
      goal: 'Retirement Corpus',
      description: 'Target corpus for comfortable retirement with regular income.',
      amount: '₹2-5 Crores',
      icon: <TrendingUp className="size-5" />,
      color: 'text-red-600',
      bg: 'bg-red-50 dark:bg-red-950/20',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Retirement Planning Milestones</CardTitle>
        <CardDescription>
          Age-wise financial goals to help you plan your retirement journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`${milestone.bg} ${milestone.color} p-3 rounded-full`}>
                  {milestone.icon}
                </div>
                {index < milestones.length - 1 && (
                  <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 my-2" />
                )}
              </div>
              <div className="flex-1 pb-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`${milestone.color} font-semibold`}>Age {milestone.age}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-muted-foreground">{milestone.amount}</span>
                </div>
                <h4 className="mb-1">{milestone.goal}</h4>
                <p className="text-muted-foreground">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
          <h4 className="text-blue-800 dark:text-blue-200 mb-2">💡 Pro Tip</h4>
          <p className="text-blue-700 dark:text-blue-300">
            The earlier you start, the less you need to invest monthly. A 25-year-old investing ₹5,000/month 
            can build a larger corpus than a 35-year-old investing ₹15,000/month due to the power of compounding!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
