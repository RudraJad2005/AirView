export default function AboutSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">About BreatheEasy</h3>
        <p className="text-sm text-muted-foreground">
          Information about the application.
        </p>
      </div>
      <div className="text-sm text-foreground space-y-4">
        <p>
          BreatheEasy is a comprehensive air quality monitoring application designed to provide real-time Air Quality Index (AQI) data for various locations across India. Our mission is to empower individuals and communities with accurate, accessible, and actionable information to make informed decisions about their health and environment.
        </p>
        <p>
          Powered by advanced AI models, BreatheEasy not only delivers current AQI readings but also provides future forecasts and personalized health advice tailored to your specific needs and conditions.
        </p>
        <p>Version: 1.0.0</p>
      </div>
    </div>
  );
}
