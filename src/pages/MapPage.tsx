import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BusMap from '@/components/BusMap';
import { mockBuses, Bus } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, ArrowRight } from 'lucide-react';

const MapPage: React.FC = () => {
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const navigate = useNavigate();

  const handleBusClick = (bus: Bus) => {
    setSelectedBus(bus);
  };

  const handleViewDetails = () => {
    if (selectedBus) {
      navigate(`/bus/${selectedBus.id}`);
    }
  };

  return (
    <div className="relative h-screen bg-background">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-background/95 backdrop-blur-sm border-b">
        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-xl font-bold">Live Bus Tracking</h1>
            <p className="text-sm text-muted-foreground">
              {mockBuses.length} buses currently active
            </p>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="absolute inset-0 pt-20 pb-20">
        <BusMap
          buses={mockBuses}
          onBusClick={handleBusClick}
          selectedBusId={selectedBus?.id}
        />
      </div>

      {/* Selected Bus Info Card */}
      {selectedBus && (
        <div className="absolute bottom-20 left-4 right-4 z-20">
          <Card className="shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-lg font-bold text-primary">
                    Bus {selectedBus.number}
                  </div>
                  <Badge 
                    variant="secondary"
                    className={`text-xs font-medium`}
                  >
                    {selectedBus.status.replace('-', ' ')}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedBus(null)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2 mb-3">
                <div className="text-sm font-medium">{selectedBus.routeName}</div>
                <div className="text-sm text-muted-foreground">
                  Next: {selectedBus.nextStop} • {selectedBus.estimatedArrival}
                </div>
              </div>

              <Button 
                onClick={handleViewDetails}
                className="w-full"
                size="sm"
              >
                View Details
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MapPage;