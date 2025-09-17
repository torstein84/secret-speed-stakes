import { Trophy, Zap } from "lucide-react";

const RacingHeader = () => {
  return (
    <header className="relative overflow-hidden">
      <div className="racing-track absolute inset-0 opacity-20"></div>
      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-primary/20 glow-primary">
              <Trophy className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-racing font-bold text-foreground tracking-wider">
                RACING<span className="text-primary">WAGERS</span>
              </h1>
              <p className="text-sm text-primary font-speed tracking-wide">
                ENCRYPTED • PRIVATE • SECURE
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-2 text-xs text-muted-foreground font-speed">
            <Zap className="h-4 w-4 text-secondary" />
            <span>NEXT RACE IN 02:34:12</span>
          </div>
        </div>
        
        <div className="mt-6">
          <h2 className="text-2xl font-racing text-foreground mb-2">
            Your Racing Bets, Kept Private.
          </h2>
          <p className="text-muted-foreground font-speed max-w-2xl">
            Place encrypted bets on racing events. Your wagers remain hidden until race completion, 
            preventing coordinated manipulation and ensuring fair competition.
          </p>
        </div>
      </div>
    </header>
  );
};

export default RacingHeader;