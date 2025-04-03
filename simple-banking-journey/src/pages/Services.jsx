import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaExchangeAlt, FaCreditCard, FaPiggyBank, FaShieldAlt, FaMobileAlt, FaChartLine } from 'react-icons/fa';

const Services = () => {
  const [services] = useState([
    {
      id: 1,
      title: 'Money Transfer',
      description: 'Send money to anyone, anywhere in the world',
      icon: FaExchangeAlt,
      color: 'bg-blue-50 text-blue-600',
      path: '/services/transfer'
    },
    {
      id: 2,
      title: 'Credit Cards',
      description: 'Apply for a credit card with great rewards',
      icon: FaCreditCard,
      color: 'bg-purple-50 text-purple-600',
      path: '/services/cards'
    },
    {
      id: 3,
      title: 'Savings Account',
      description: 'Open a high-yield savings account',
      icon: FaPiggyBank,
      color: 'bg-green-50 text-green-600',
      path: '/services/savings'
    },
    {
      id: 4,
      title: 'Insurance',
      description: 'Protect your assets with our insurance plans',
      icon: FaShieldAlt,
      color: 'bg-amber-50 text-amber-600',
      path: '/services/insurance'
    },
    {
      id: 5,
      title: 'Mobile Banking',
      description: 'Access your account on the go',
      icon: FaMobileAlt,
      color: 'bg-red-50 text-red-600',
      path: '/services/mobile'
    },
    {
      id: 6,
      title: 'Investment',
      description: 'Grow your wealth with our investment options',
      icon: FaChartLine,
      color: 'bg-indigo-50 text-indigo-600',
      path: '/services/investment'
    }
  ]);

  return (
    <div className="services-page">
      <section className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Our Services</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover our range of banking services designed to meet your needs
        </p>
      </section>

      <div className="services-grid">
        {services.map((service) => (
          <Link 
            key={service.id} 
            to={service.path}
            className="service-card"
          >
            <div className={`service-icon ${service.color}`}>
              <service.icon />
            </div>
            <div className="service-content">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <section className="mt-12">
        <div className="card">
          <h2>Need Help?</h2>
          <p className="mt-2 mb-4">
            Our customer service team is available 24/7 to assist you with any questions or concerns.
          </p>
          <div className="help-options">
            <button className="button">
              Contact Support
            </button>
            <button className="button button-secondary">
              Schedule Appointment
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services; 