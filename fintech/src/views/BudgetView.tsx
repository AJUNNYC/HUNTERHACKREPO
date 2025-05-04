import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthView } from "@/config/auth";

interface BudgetViewProps {
  onSaveSettings: () => void;
  setViewType: (view: 'home' | 'budget') => void;
}

export default function BudgetView({
  onSaveSettings,
  setViewType,
}: BudgetViewProps) {

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-500">Investment Calculator</h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setViewType('home')}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
            >
              Future Value
            </button>
            <button 
              onClick={() => setViewType('budget')}
              className="px-4 py-2 rounded-lg bg-green-500 text-black font-medium"
            >
              Budget
            </button>
            <AuthView onSaveSettings={onSaveSettings} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 bg-zinc-900 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-500">Budget Parameters</CardTitle>
              <CardDescription className="text-zinc-400">Adjust your budgeting strategy</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Make an input so people can add things to their budget like rent, food, etc */
              /* You can make this part into a sepaerate component file*/}
            </CardContent>
          
          </Card>

          <Card className="lg:col-span-2 bg-zinc-900 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-500">Budget Overview</CardTitle>
              <CardDescription className="text-zinc-400">
                {/* Use a circle and some other stuff to display the budget and show some other "smart" 
                information or strategies, can be done in a seprate component file */}
              </CardDescription>
            </CardHeader>
            <CardContent>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}