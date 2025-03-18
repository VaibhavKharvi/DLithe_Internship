import { useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useToast } from "../components/ui/use-toast";

const Apply = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { toast } = useToast();

  const handleSubmit = () => {
    toast({
      title: "Application Submitted",
      description: `Your application for service ID ${serviceId} has been submitted.`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Apply for Service {serviceId}</h1>
      <p>Please fill out the application form below.</p>
      {/* Application form fields go here */}
      <Button onClick={handleSubmit}>Submit Application</Button>
    </div>
  );
};

export default Apply;
