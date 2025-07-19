import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BusDetails from '@/components/BusDetails';
import { mockBuses } from '@/lib/mockData';

const BusDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const bus = mockBuses.find(b => b.id === id);

  if (!bus) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Bus Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The bus you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate('/buses')}
            className="text-primary hover:underline"
          >
            Back to Bus List
          </button>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    navigate(-1);
  };

  const handleViewOnMap = () => {
    navigate(`/?busId=${bus.id}`);
  };

  return (
    <BusDetails
      bus={bus}
      onBack={handleBack}
      onViewOnMap={handleViewOnMap}
    />
  );
};

export default BusDetailsPage;