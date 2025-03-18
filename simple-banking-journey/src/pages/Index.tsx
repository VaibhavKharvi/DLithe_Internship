
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui-custom/Card";
import { Button } from "@/components/ui/button";
import { TransactionItem } from "@/components/ui-custom/TransactionItem";
import { ArrowRight, CreditCard, PiggyBank, ShieldCheck, Send } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [balance, setBalance] = useState(5842.15);
  
  // Sample recent transactions
  const recentTransactions = [
    {
      id: 1,
      type: "expense" as const,
      title: "Grocery Shopping",
      amount: 82.45,
      date: "Today",
      category: "Shopping"
    },
    {
      id: 2,
      type: "income" as const,
      title: "Salary Deposit",
      amount: 3500.00,
      date: "Yesterday",
      category: "Income"
    },
    {
      id: 3,
      type: "purchase" as const,
      title: "Netflix Subscription",
      amount: 15.99,
      date: "Apr 15, 2023",
      category: "Entertainment"
    }
  ];
  
  // Quick action buttons
  const quickActions = [
    {
      title: "Send Money",
      icon: Send,
      color: "bg-blue-50 text-blue-600",
      path: "/services"
    },
    {
      title: "Cards",
      icon: CreditCard,
      color: "bg-purple-50 text-purple-600",
      path: "/services"
    },
    {
      title: "Savings",
      icon: PiggyBank,
      color: "bg-green-50 text-green-600",
      path: "/services"
    },
    {
      title: "Insurance",
      icon: ShieldCheck,
      color: "bg-amber-50 text-amber-600",
      path: "/services"
    }
  ];
  
  return (
    <div className="space-y-8">
      <section className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to BankApp</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your simple and secure banking solution
        </p>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Balance Card */}
        <Card className="bg-gradient-to-br from-bank-accent to-sky-500 text-white border-0">
          <CardHeader>
            <CardTitle className="text-white">Account Balance</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-3xl font-bold mb-4">
              ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm opacity-90">Main Account</span>
              <Button variant="secondary" size="sm">
                <span className="mr-1">View Details</span>
                <ArrowRight size={14} />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Link 
                  key={index} 
                  to={action.path}
                  className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-secondary transition-colors duration-250"
                >
                  <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center mb-2`}>
                    <action.icon size={20} />
                  </div>
                  <span className="text-sm font-medium">{action.title}</span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* Recent Transactions */}
      <section>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Recent Transactions</CardTitle>
            <Link 
              to="/transactions" 
              className="text-sm text-bank-accent font-medium hover:underline flex items-center"
            >
              <span>View All</span>
              <ArrowRight size={14} className="ml-1" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border">
              {recentTransactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  type={transaction.type}
                  title={transaction.title}
                  amount={transaction.amount}
                  date={transaction.date}
                  category={transaction.category}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
