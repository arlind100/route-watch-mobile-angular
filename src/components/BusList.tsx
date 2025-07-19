import React from 'react';
import { Bus, getStatusColor, getStatusText, getOccupancyLevel } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Users, ArrowRight } from 'lucide-react';

interface BusListProps {
  buses: Bus[];
  onBusSelect: (bus: Bus) => void;
  selectedBusId?: string;
}

const BusList: React.FC<BusListProps> = ({ buses, onBusSelect, selectedBusId }) => {
  return (
    <div className="space-y-3 p-4">
      {buses.map((bus) => {
        const statusColor = getStatusColor(bus.status);
        const statusText = getStatusText(bus.status);
        const occupancyLevel = getOccupancyLevel(bus.occupancy, bus.capacity);
        const occupancyPercentage = (bus.occupancy / bus.capacity) * 100;
        const isSelected = selectedBusId === bus.id;

        return (
          <Card
            key={bus.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              isSelected ? 'ring-2 ring-primary shadow-md' : ''
            }`}
            onClick={() => onBusSelect(bus)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-lg font-bold text-primary">
                    Bus {bus.number}
                  </div>
                  <Badge 
                    variant="secondary"
                    className={`text-xs font-medium bg-${statusColor}/10 text-${statusColor}`}
                  >
                    {statusText}
                  </Badge>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-foreground">
                  {bus.routeName}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Next: {bus.nextStop}</span>
                  <span className="text-primary font-medium">
                    {bus.estimatedArrival}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-3 w-3 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>Occupancy</span>
                      <span>{bus.occupancy}/{bus.capacity}</span>
                    </div>
                    <Progress 
                      value={occupancyPercentage} 
                      className="h-2"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default BusList;