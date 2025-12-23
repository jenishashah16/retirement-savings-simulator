import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface ComparisonData {
  type: string;
  invested: number;
  returns: number;
  total: number;
}

interface ComparisonChartProps {
  comparisons: ComparisonData[];
}

const COLORS = {
  sip: '#3b82f6',
  rd: '#10b981',
  fd: '#f97316',
  lumpsum: '#a855f7',
};

export function ComparisonChart({ comparisons }: ComparisonChartProps) {
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

  const data = comparisons.map((comp) => ({
    name: comp.type.toUpperCase(),
    'Amount Invested': comp.invested,
    'Returns': comp.returns,
    'Total Value': comp.total,
    type: comp.type,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Comparison</CardTitle>
        <CardDescription>
          Compare returns across different investment instruments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={formatCurrency} />
            <Tooltip 
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid #ccc' }}
            />
            <Legend />
            <Bar dataKey="Amount Invested" stackId="a" fill="#94a3b8" />
            <Bar dataKey="Returns" stackId="a">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.type as keyof typeof COLORS]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {comparisons.map((comp) => (
            <div key={comp.type} className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="size-3 rounded-full" 
                  style={{ backgroundColor: COLORS[comp.type as keyof typeof COLORS] }}
                />
                <span className="uppercase">{comp.type}</span>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">ROI:</p>
                <p className="font-semibold text-green-600">
                  {((comp.returns / comp.invested) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
