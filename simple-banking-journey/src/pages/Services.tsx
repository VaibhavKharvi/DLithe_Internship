import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui-custom/Card";
import { CreditCard, Send, PiggyBank, ShieldCheck, Landmark, BarChart, Wallet, DollarSign, MousePointerClick } from "lucide-react";
import { Button } from "../components/ui/button";
import { useToast } from "../components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleServiceClick = (serviceName: string, serviceId: string) => {
    toast({
      title: "Service Selected",
      description: `You selected the ${serviceName} service`,
      duration: 3000,
    });
    
    // Navigate to the service details page
    navigate(`/services/${serviceId}`);
  };
  
  const services = [
    {
      icon: Send,
      title: "Money Transfer",
      description: "Send money to anyone, anywhere, anytime",
      color: "text-blue-600 bg-blue-50",
      id: "money-transfer"
    },
    {
      icon: CreditCard,
      title: "Card Management",
      description: "Manage your debit and credit cards",
      color: "text-purple-600 bg-purple-50",
      id: "card-management"
    },
    {
      icon: PiggyBank,
      title: "Savings Goals",
      description: "Set and track your savings goals",
      color: "text-green-600 bg-green-50",
      id: "savings-goals"
    },
    {
      icon: ShieldCheck,
      title: "Insurance",
      description: "Protect what matters most to you",
      color: "text-amber-600 bg-amber-50",
      id: "insurance"
    },
    {
      icon: Landmark,
      title: "Loans",
      description: "Personal and business loan options",
      color: "text-indigo-600 bg-indigo-50",
      id: "loans"
    },
    {
      icon: BarChart,
      title: "Investments",
      description: "Grow your wealth with smart investments",
      color: "text-emerald-600 bg-emerald-50",
      id: "investments"
    },
    {
      icon: Wallet,
      title: "Digital Wallet",
      description: "Quick and secure mobile payments",
      color: "text-rose-600 bg-rose-50",
      id: "digital-wallet"
    },
    {
      icon: DollarSign,
      title: "Foreign Exchange",
      description: "Competitive rates for currency exchange",
      color: "text-cyan-600 bg-cyan-50",
      id: "foreign-exchange"
    },
  ];
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Our Services</h1>
        <p className="text-xl text-muted-foreground mt-2 max-w-2xl mx-auto">
          Explore our comprehensive range of banking services
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card 
            key={index} 
            className="animate-scale-in cursor-pointer group"
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => handleServiceClick(service.title, service.id)}
          >
            <CardHeader>
              <div className={`w-12 h-12 rounded-full ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <service.icon size={22} />
              </div>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleServiceClick(`${service.title} - Details`, service.id);
                  }}
                >
                  <MousePointerClick size={16} />
                  Learn More
                </Button>

              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Services;
