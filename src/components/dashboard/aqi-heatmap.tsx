
"use client";

import type { LocationData } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getAqiInfo } from '@/lib/aqi-helpers';
import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';

interface AqiHeatmapProps {
  locations: LocationData[];
  onSelectLocation: (location: LocationData) => void;
  selectedLocationId: string;
}

const cityCoordinates: Record<string, { x: string; y: string }> = {
  delhi: { x: '51%', y: '29%' },
  mumbai: { x: '29%', y: '52%' },
  bangalore: { x: '36%', y: '72%' },
  chennai: { x: '46%', y: '70%' },
};

export function AqiHeatmap({ locations, onSelectLocation, selectedLocationId }: AqiHeatmapProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interactive AQI Map</CardTitle>
        <CardDescription>Visualize real-time air quality. Click a location to see details.</CardDescription>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="relative aspect-[4/5] w-full max-w-lg mx-auto">
            <svg
              viewBox="0 0 523 596"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                d="M228.09 1.81438L228.61 10.3844L238.45 13.5144L242.06 19.7844L252.94 20.3144L259.73 24.9744L258.17 31.7644L266.22 37.5544L274.27 34.9344L275.83 40.7244L270.59 44.8644L278.64 53.4344L286.17 52.3744L293.18 57.0444L288.52 64.0544L293.18 69.3644L300.2 68.3044L307.21 72.4444L307.73 80.7544L316.3 83.9044L322.09 91.9544L318.48 97.2644L323.14 103.014L337.45 101.444L342.11 104.584L337.97 114.944L348.84 116.514L351.46 123.524L358.47 124.584L363.65 129.254L373.49 128.724L378.15 133.394L382.29 141.704L388.08 141.704L393.32 146.374L393.32 153.904L402.41 155.474L407.59 161.264L419.5 159.144L424.16 163.814L431.17 161.794L435.83 166.464L443.36 166.994L448.54 171.664L454.85 170.604L459.51 175.794L466.52 175.264L470.13 181.534L476.44 182.064L481.1 187.904L481.62 196.214L488.11 199.354L488.63 207.664L494.42 210.284L494.94 218.064L501.43 222.204L501.43 230.514L507.22 233.654L510.83 239.924L516.1 247.454L520.24 257.294L518.68 266.384L513.44 272.174L511.35 281.264L503.56 286.044L500.91 295.134L494.94 298.804L488.63 306.854L481.1 308.974L474.88 316.504L465.46 320.174L462.84 326.964L453.79 328.024L448.02 334.814L445.91 343.384L435.54 346.004L432.4 353.014L423.64 355.634L421.52 364.724L412.37 369.394L407.07 377.704L401.83 380.324L395.94 388.114L393.32 396.954L384.91 400.094L378.15 407.624L373.49 418.914L366.48 424.224L364.17 433.844L357.95 438.514L354.08 447.084L345.22 452.394L337.97 460.184L331.91 465.494L323.66 469.164L322.61 477.474L314.18 481.614L310.83 488.864L300.72 491.484L297.05 499.794L290.04 502.944L288.52 510.474L280.99 515.664L278.64 522.674L272.95 524.794L267.77 531.284L267.77 540.374L261.28 545.044L258.17 552.574L251.38 557.764L243.62 559.884L238.96 565.194L236.89 573.504L230.71 578.174L229.65 585.704L221.08 589.9L211.5 595.094L200.62 595.094L193.09 589.844L186.6 583.574L183.45 575.264L177.66 572.124L172.42 566.254L165.41 563.634L159.62 556.704L151.05 556.174L145.81 550.924L136.19 550.394L131.53 544.514L127.4 536.204L118.82 532.534L113.58 523.734L105.53 521.614L101.4 513.824L93.87 510.284L87.91 500.824L87.39 491.484L81.08 488.864L76.94 481.074L71.15 478.454L65.88 471.284L58.35 469.164L51.86 463.374L46.62 455.064L42.48 447.084L33.91 444.464L28.67 436.394L23.99 427.304L16.46 422.634L12.85 413.544L3.23 408.154L1.11 398.524L10.21 391.514L9.15 383.724L15.4 378.704L15.4 371.174L22.93 365.244L25.05 356.674L32.85 352.474L37.51 344.954L43.54 340.284L43.01 331.194L49.26 324.844L54.76 317.034L54.76 308.974L61.77 302.254L63.89 293.554L71.68 288.164L73.24 280.204L80.55 275.834L81.08 266.384L87.39 261.264L88.95 251.424L95.96 247.984L97.52 239.924L104.53 235.224L109.19 226.594L117.76 222.734L121.01 214.944L128.81 210.814L129.87 202.504L137.18 197.724L135.06 189.934L142.69 184.184L141.63 175.794L149.16 170.604L152.22 162.294L159.23 158.624L158.7 150.314L163.88 145.314L161.76 137.004L167.55 131.784L172.94 121.944L179.95 119.324L183.04 111.854L190.47 109.174L190.99 100.864L198.52 95.6744L197.46 87.8844L204.47 82.8444L207.62 74.5344L214.11 72.9744L216.73 66.1744L223.74 63.5244L222.18 56.5144L228.84 52.3744L226.61 44.3344L229.15 40.7244L223.21 34.9344L221.65 27.9244L216.21 24.9744L218.83 18.7244L223.74 15.0844L222.71 8.26438L228.09 1.81438Z"
                className="fill-muted stroke-border"
              />
            </svg>
            
              {locations.map((location) => {
                const cityInfo = cityCoordinates[location.id];
                if (!cityInfo) return null;

                const { color } = getAqiInfo(location.aqi);
                const isSelected = location.id === selectedLocationId;

                return (
                  <Tooltip key={location.id}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => onSelectLocation(location)}
                        className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                        style={{ left: cityInfo.x, top: cityInfo.y }}
                      >
                        <MapPin
                          className={cn(
                            'h-6 w-6 transition-all drop-shadow-lg',
                            color.replace('bg-', 'text-'),
                            isSelected ? 'scale-150' : 'scale-100',
                            location.aqi > 150 && !isSelected && 'animate-breathe'
                          )}
                          strokeWidth={isSelected ? 3 : 2}
                        />
                        <span className="sr-only">{location.city}</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-semibold">{location.city}</p>
                      <p>AQI: {location.aqi}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
