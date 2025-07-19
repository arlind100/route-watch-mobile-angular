import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BusList from '@/components/BusList';
import { mockBuses, Bus } from '@/lib/mockData';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BusListPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredBuses = mockBuses.filter(bus => 
    bus.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bus.routeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bus.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBusSelect = (bus: Bus) => {
    navigate(`/bus/${bus.id}`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold">All Buses</h1>
              <p className="text-sm text-muted-foreground">
                {filteredBuses.length} of {mockBuses.length} buses
              </p>
            </div>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by bus number, route, or destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Bus List */}
      <div className="px-0">
        {filteredBuses.length > 0 ? (
          <BusList
            buses={filteredBuses}
            onBusSelect={handleBusSelect}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="text-center">
              <h3 className="text-lg font-medium text-foreground mb-2">
                No buses found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms to find buses.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusListPage;