
import React from "react";
import { ArrowUpRight, ArrowDownLeft, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

type TransactionType = "income" | "expense" | "purchase";

interface TransactionItemProps {
  type: TransactionType;
  title: string;
  amount: number;
  date: string;
  category?: string;
  recipient?: string;
}

export const TransactionItem = ({
  type,
  title,
  amount,
  date,
  category,
  recipient
}: TransactionItemProps) => {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
  
  const getTypeStyles = () => {
    switch (type) {
      case "income":
        return {
          iconBg: "bg-green-50",
          textColor: "text-green-600",
          icon: ArrowDownLeft
        };
      case "expense":
        return {
          iconBg: "bg-red-50",
          textColor: "text-red-600",
          icon: ArrowUpRight
        };
      case "purchase":
        return {
          iconBg: "bg-blue-50",
          textColor: "text-blue-600",
          icon: CreditCard
        };
      default:
        return {
          iconBg: "bg-gray-50",
          textColor: "text-gray-600",
          icon: CreditCard
        };
    }
  };
  
  const { iconBg, textColor, icon: Icon } = getTypeStyles();
  
  return (
    <div className="p-4 border-b border-border last:border-0 hover:bg-bank-light/50 transition-colors duration-250">
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center mr-4`}>
          <Icon className={`${textColor}`} size={18} />
        </div>
        
        <div className="flex-1">
          <h4 className="font-medium">{title}</h4>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <span>{date}</span>
            {category && (
              <>
                <span className="mx-1.5">•</span>
                <span>{category}</span>
              </>
            )}
            {recipient && (
              <>
                <span className="mx-1.5">•</span>
                <span>To: {recipient}</span>
              </>
            )}
          </div>
        </div>
        
        <div className={cn(
          "font-medium",
          type === "income" ? "text-green-600" : "text-red-600"
        )}>
          {type === "income" ? "+" : "-"}{formattedAmount}
        </div>
      </div>
    </div>
  );
};
