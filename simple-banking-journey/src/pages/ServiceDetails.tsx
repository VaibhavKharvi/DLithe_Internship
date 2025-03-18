
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Info, CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui-custom/Card";
import { useToast } from "@/hooks/use-toast";

// This would typically come from an API
const getServiceDetails = (serviceId: string) => {
  const serviceMap: Record<string, any> = {
    "money-transfer": {
      title: "Money Transfer",
      description: "Send money to anyone, anywhere, anytime with our secure and fast money transfer service.",
      color: "text-blue-600 bg-blue-50",
      features: [
        "Instant transfers to bank accounts",
        "International transfers at competitive rates",
        "Schedule recurring transfers",
        "Track your transfers in real-time"
      ]
    },
    "card-management": {
      title: "Card Management",
      description: "Manage all your debit and credit cards in one place with our comprehensive card management tools.",
      color: "text-purple-600 bg-purple-50",
      features: [
        "View all your cards in one place",
        "Set spending limits for each card",
        "Freeze/unfreeze cards instantly",
        "Report lost or stolen cards"
      ]
    },
    "savings-goals": {
      title: "Savings Goals",
      description: "Set and track your savings goals with our easy-to-use tools and stay on top of your financial future.",
      color: "text-green-600 bg-green-50",
      features: [
        "Create multiple savings goals",
        "Automatic contributions to your goals",
        "Visual progress tracking",
        "Celebrate when you reach your targets"
      ]
    },
    "insurance": {
      title: "Insurance",
      description: "Protect what matters most to you with our comprehensive insurance options tailored to your needs.",
      color: "text-amber-600 bg-amber-50",
      features: [
        "Life insurance coverage",
        "Health insurance plans",
        "Property and casualty insurance",
        "Easy claims processing"
      ]
    },
    "loans": {
      title: "Loans",
      description: "Get personal and business loan options with competitive rates and flexible repayment terms.",
      color: "text-indigo-600 bg-indigo-50",
      features: [
        "Personal loans for any purpose",
        "Business loans for growth",
        "Mortgage and home equity options",
        "Quick approval process"
      ]
    },
    "investments": {
      title: "Investments",
      description: "Grow your wealth with smart investment options tailored to your risk tolerance and financial goals.",
      color: "text-emerald-600 bg-emerald-50",
      features: [
        "Stocks and ETF investing",
        "Mutual funds with low fees",
        "Retirement planning options",
        "Professional investment advice"
      ]
    },
    "digital-wallet": {
      title: "Digital Wallet",
      description: "Experience the convenience of quick and secure mobile payments with our digital wallet solution.",
      color: "text-rose-600 bg-rose-50",
      features: [
        "Contactless payments",
        "Peer-to-peer money transfers",
        "Loyalty card integration",
        "Purchase history tracking"
      ]
    },
    "foreign-exchange": {
      title: "Foreign Exchange",
      description: "Get competitive rates for currency exchange whether you're traveling or sending money abroad.",
      color: "text-cyan-600 bg-cyan-50",
      features: [
        "Real-time exchange rates",
        "Multi-currency accounts",
        "Forward contracts to lock in rates",
        "No hidden fees"
      ]
    }
  };

  return serviceMap[serviceId] || {
    title: "Service Not Found",
    description: "The service you are looking for does not exist.",
    color: "text-gray-600 bg-gray-50",
    features: []
  };
};

const ServiceDetails = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const service = getServiceDetails(serviceId || "");
  
  const handleApplyNow = () => {
    toast({
      title: "Application Started",
      description: `You've started the application process for ${service.title}`,
      duration: 3000,
    });
  };
  
  return (
    <div className="space-y-8 animate-slide-up">
      <Button 
        variant="ghost" 
        className="flex items-center gap-2 mb-6" 
        onClick={() => navigate("/services")}
      >
        <ArrowLeft size={16} />
        Back to Services
      </Button>
      
      <div className="flex flex-col gap-4">
        <div className={`w-16 h-16 rounded-full ${service.color} flex items-center justify-center`}>
          <Info size={28} />
        </div>
        
        <h1 className="text-3xl font-bold tracking-tight">{service.title}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          {service.description}
        </p>
      </div>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Key Features</CardTitle>
          <CardDescription>What makes our {service.title} service special</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {service.features.map((feature: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={18} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-8">
              <Button className="w-full sm:w-auto" onClick={() => navigate(`/apply/${serviceId}`)}>

              Apply Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceDetails;
