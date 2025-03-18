
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui-custom/Card";
import { TransactionItem } from "@/components/ui-custom/TransactionItem";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Calendar } from "lucide-react";

// Mock data
const generateTransactions = () => {
  const types = ["income", "expense", "purchase"];
  const titles = [
    "Salary Deposit", "Grocery Shopping", "Netflix Subscription", 
    "Gas Station", "Rent Payment", "Freelance Work", 
    "Restaurant Bill", "Online Purchase", "ATM Withdrawal",
    "Utility Bill", "Mobile Phone Bill", "Income Tax Refund"
  ];
  const categories = [
    "Income", "Shopping", "Entertainment", 
    "Transportation", "Housing", "Work", 
    "Food", "Online", "Cash",
    "Utilities", "Phone", "Tax"
  ];
  
  const transactions = [];
  
  for (let i = 0; i < 20; i++) {
    const typeIndex = Math.floor(Math.random() * 3);
    const titleIndex = Math.floor(Math.random() * titles.length);
    const amount = Math.random() * 1000;
    
    // Generate a random date within the last 30 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    transactions.push({
      id: i + 1,
      type: types[typeIndex] as "income" | "expense" | "purchase",
      title: titles[titleIndex],
      amount: amount,
      date: i < 2 
        ? (i === 0 ? "Today" : "Yesterday") 
        : `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`,
      category: categories[titleIndex],
      recipient: typeIndex === 0 ? undefined : "John Doe"
    });
  }
  
  // Sort by date (assuming the most recent ones have "Today" or "Yesterday")
  return transactions.sort((a, b) => {
    if (a.date === "Today") return -1;
    if (b.date === "Today") return 1;
    if (a.date === "Yesterday") return -1;
    if (b.date === "Yesterday") return 1;
    return 0;
  });
};

const Transactions = () => {
  const allTransactions = generateTransactions();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [transactions, setTransactions] = useState(allTransactions);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterTransactions(value, typeFilter);
  };
  
  const handleTypeChange = (value: string) => {
    setTypeFilter(value);
    filterTransactions(searchTerm, value);
  };
  
  const filterTransactions = (search: string, type: string) => {
    let filtered = allTransactions;
    
    // Filter by search term
    if (search) {
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.category?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Filter by type
    if (type !== "all") {
      filtered = filtered.filter(t => t.type === type);
    }
    
    setTransactions(filtered);
  };
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Transaction History</h1>
        <p className="text-xl text-muted-foreground mt-2 max-w-2xl mx-auto">
          View and manage all your transactions
        </p>
      </div>
      
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search transactions..."
                className="pl-10"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <div className="flex gap-4">
              <Select value={typeFilter} onValueChange={handleTypeChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                    <SelectItem value="purchase">Purchase</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <button className="border rounded-md px-3 flex items-center gap-2 text-muted-foreground hover:bg-secondary transition-colors">
                <Calendar size={18} />
                <span className="hidden md:inline">Filter by Date</span>
              </button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          {transactions.length > 0 ? (
            <div className="divide-y divide-border">
              {transactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  type={transaction.type}
                  title={transaction.title}
                  amount={transaction.amount}
                  date={transaction.date}
                  category={transaction.category}
                  recipient={transaction.recipient}
                />
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No transactions found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;
