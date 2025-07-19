import React, { useState } from 'react';
import { Bus } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, MapPin, Navigation } from 'lucide-react';

interface BusMapProps {
  buses: Bus[];
  onBusClick?: (bus: Bus) => void;
  selectedBusId?: string;
}

// Simple map fallback component
const SimpleBusMap: React.FC<BusMapProps> = ({ buses, onBusClick, selectedBusId }) => {
  const [centerLat, setCenterLat] = useState(40.7484);
  const [centerLng, setCenterLng] = useState(-73.9857);
  const [zoom, setZoom] = useState(12);

  const getStatusColor = (status: Bus['status']) => {
    switch (status) {
      case 'on-time': return '#22c55e';
      case 'early': return '#10b981';
      case 'delayed': return '#f59e0b';
      case 'off-route': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const recenterMap = () => {
    // Reset to NYC center
    setCenterLat(40.7484);
    setCenterLng(-73.9857);
    setZoom(12);
  };

  const refreshData = () => {
    console.log('Refreshing bus data...');
  };

  // Calculate map bounds for the view
  const mapStyle = {
    background: 'linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%)',
    position: 'relative' as const,
    width: '100%',
    height: '100%',
    borderRadius: '0.5rem',
    overflow: 'hidden'
  };

  return (
    <div className="relative w-full h-full">
      <div style={mapStyle} className="flex items-center justify-center">
        {/* Map Background Grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />

        {/* NYC Map Area Representation */}
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="text-center text-muted-foreground mb-8">
            <Navigation className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Interactive Map View</p>
            <p className="text-xs opacity-75">NYC Transit Area</p>
          </div>

          {/* Bus Markers positioned on the "map" */}
          {buses.map((bus, index) => {
            const isSelected = selectedBusId === bus.id;
            // Position buses in a grid-like pattern for demo
            const x = 20 + (index % 3) * 30; // 20%, 50%, 80%
            const y = 20 + Math.floor(index / 3) * 25; // 20%, 45%, 70%
            
            return (
              <div
                key={bus.id}
                className={`absolute cursor-pointer transition-transform duration-200 ${
                  isSelected ? 'scale-125 z-10' : 'hover:scale-110'
                }`}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={() => onBusClick?.(bus)}
              >
                <div
                  className="w-8 h-8 rounded-full border-3 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: getStatusColor(bus.status) }}
                >
                  {bus.number}
                </div>
                
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                  <Card className="shadow-lg min-w-48">
                    <CardContent className="p-3">
                      <div className="font-semibold text-sm">Bus {bus.number}</div>
                      <div className="text-xs text-muted-foreground mb-2">{bus.routeName}</div>
                      <div className="flex items-center gap-2 text-xs">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: getStatusColor(bus.status) }}
                        />
                        {bus.status.replace('-', ' ')}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Next: {bus.nextStop} ({bus.estimatedArrival})
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>

        {/* Map Controls Info */}
        <div className="absolute top-4 right-4 text-xs text-muted-foreground bg-white/80 px-2 py-1 rounded">
          Demo Map View
        </div>
      </div>
      
      {/* Floating Action Buttons */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <Button
          size="icon"
          variant="secondary"
          className="h-12 w-12 rounded-full shadow-lg"
          onClick={recenterMap}
        >
          <MapPin className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="h-12 w-12 rounded-full shadow-lg"
          onClick={refreshData}
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
export default SimpleBusMap;