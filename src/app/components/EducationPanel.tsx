import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Lightbulb, TrendingUp, Shield, PiggyBank } from 'lucide-react';

export function EducationPanel() {
  const tips = [
    {
      icon: <TrendingUp className="size-5" />,
      title: 'Power of Compounding',
      description: 'Start early to maximize returns. Even small regular investments can grow significantly over time due to compound interest.',
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-950/20',
    },
    {
      icon: <Shield className="size-5" />,
      title: 'Diversification is Key',
      description: 'Don\'t put all eggs in one basket. Mix different investment types - SIP for growth, FD for stability, and RD for discipline.',
      color: 'text-green-600',
      bg: 'bg-green-50 dark:bg-green-950/20',
    },
    {
      icon: <PiggyBank className="size-5" />,
      title: 'Start Retirement Planning Early',
      description: 'The earlier you start, the less you need to invest monthly. A 25-year-old needs to invest much less than a 40-year-old for the same retirement corpus.',
      color: 'text-purple-600',
      bg: 'bg-purple-50 dark:bg-purple-950/20',
    },
    {
      icon: <Lightbulb className="size-5" />,
      title: 'Review and Rebalance',
      description: 'Regularly review your investments. As you grow older, shift from high-risk to low-risk instruments to protect your capital.',
      color: 'text-orange-600',
      bg: 'bg-orange-50 dark:bg-orange-950/20',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="size-5" />
          Investment Education
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((tip, index) => (
            <div key={index} className={`${tip.bg} p-4 rounded-lg`}>
              <div className={`flex items-center gap-2 mb-2 ${tip.color}`}>
                {tip.icon}
                <h4 className="font-semibold">{tip.title}</h4>
              </div>
              <p className="text-muted-foreground">{tip.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-900">
          <p className="text-yellow-800 dark:text-yellow-200">
            <strong>Disclaimer:</strong> These calculations are for illustrative purposes only. Actual returns may vary based on market conditions, fees, and other factors. Please consult a financial advisor for personalized advice.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
