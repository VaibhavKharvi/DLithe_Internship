import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Info, CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui-custom/Card";
import { useToast } from "@/hooks/use-toast";

// This would typically come from an API
const getServiceDetails = (serviceId) => {
  const serviceMap = {
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
        "Property insurance options",
        "24/7 claims support"
      ]
    }
  };

  return serviceMap[serviceId] || {
    title: "Service Not Found",
    description: "The requested service could not be found.",
    color: "text-gray-600 bg-gray-50",
    features: []
  };
};

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const service = getServiceDetails(serviceId);

  const handleApplyNow = () => {
    toast({
      title: "Application Started",
      description: "Your application for " + service.title + " has been started.",
    });
    navigate(`/apply/${serviceId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Services
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className={service.color}>{service.title}</CardTitle>
          <CardDescription>{service.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Info className="mr-2 h-5 w-5 text-blue-500" />
              Features
            </h3>
            <ul className="space-y-2">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-center">
        <Button onClick={handleApplyNow}>
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default ServiceDetails; 