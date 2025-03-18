
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  UserPlus, 
  ListChecks, 
  CreditCard, 
  User,
  Menu,
  X
} from "lucide-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Listen for scroll to add shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Close mobile menu on path change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Register", path: "/register", icon: UserPlus },
    { name: "Services", path: "/services", icon: ListChecks },
    { name: "Transactions", path: "/transactions", icon: CreditCard },
    { name: "Profile", path: "/profile", icon: User },
  ];
  
  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-250 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-bank-accent flex items-center justify-center">
              <span className="text-white font-semibold">B</span>
            </div>
            <span className="font-medium text-lg">BankApp</span>
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative flex items-center space-x-1 text-sm font-medium transition-colors duration-250 ${
                    isActive 
                      ? "text-bank-accent" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <link.icon size={18} />
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-bank-accent rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {/* Mobile navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-soft animate-slide-down">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-2 p-2 rounded-lg transition-colors duration-250 ${
                    isActive 
                      ? "bg-secondary text-bank-accent" 
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  }`}
                >
                  <link.icon size={18} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
