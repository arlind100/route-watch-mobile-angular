import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Bus } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { RotateCcw, MapPin } from 'lucide-react';

interface BusMapProps {
  buses: Bus[];
  onBusClick?: (bus: Bus) => void;
  selectedBusId?: string;
}

// For demo purposes - in production, use environment variable
const MAPBOX_TOKEN = 'pk.eyJ1IjoibG92YWJsZWRldiIsImEiOiJjbTVpcTMzNTcxeW81MnFzN2YxNzNzanZ3In0.qKN9xAXb0yGEOmCLCLBHfQ';

const BusMap: React.FC<BusMapProps> = ({ buses, onBusClick, selectedBusId }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-73.9857, 40.7484], // NYC center
      zoom: 12,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add bus markers
    buses.forEach(bus => {
      const statusColors = {
        'on-time': '#22c55e',
        'early': '#10b981',
        'delayed': '#f59e0b',
        'off-route': '#ef4444'
      };

      const el = document.createElement('div');
      el.className = 'bus-marker';
      el.style.cssText = `
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: ${statusColors[bus.status]};
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: bold;
        color: white;
        transform: ${selectedBusId === bus.id ? 'scale(1.2)' : 'scale(1)'};
        transition: transform 0.2s ease;
      `;
      el.textContent = bus.number;

      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        closeOnClick: false
      }).setHTML(`
        <div class="p-3 min-w-48">
          <div class="font-semibold text-sm text-foreground">Bus ${bus.number}</div>
          <div class="text-xs text-muted-foreground mb-2">${bus.routeName}</div>
          <div class="flex items-center gap-2 text-xs">
            <span class="inline-block w-2 h-2 rounded-full" style="background-color: ${statusColors[bus.status]}"></span>
            ${bus.status.replace('-', ' ')}
          </div>
          <div class="text-xs text-muted-foreground mt-1">
            Next: ${bus.nextStop} (${bus.estimatedArrival})
          </div>
        </div>
      `);

      const marker = new mapboxgl.Marker(el)
        .setLngLat([bus.location.lng, bus.location.lat])
        .setPopup(popup)
        .addTo(map.current!);

      el.addEventListener('click', () => {
        onBusClick?.(bus);
      });

      markersRef.current.push(marker);
    });
  }, [buses, onBusClick, selectedBusId]);

  const recenterMap = () => {
    if (!map.current || buses.length === 0) return;
    
    const bounds = new mapboxgl.LngLatBounds();
    buses.forEach(bus => {
      bounds.extend([bus.location.lng, bus.location.lat]);
    });
    
    map.current.fitBounds(bounds, { padding: 50 });
  };

  const refreshData = () => {
    // In a real app, this would fetch new data
    console.log('Refreshing bus data...');
  };

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      
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

export default BusMap;