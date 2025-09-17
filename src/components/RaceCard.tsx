import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Zap, Lock } from "lucide-react";

interface RaceCardProps {
  race: {
    id: string;
    name: string;
    track: string;
    startTime: string;
    totalBets: number;
    participants: number;
    status: 'upcoming' | 'live' | 'finished';
    prizePool: string;
  };
}

const RaceCard = ({ race }: RaceCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-secondary text-secondary-foreground';
      case 'upcoming':
        return 'bg-primary text-primary-foreground';
      case 'finished':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'live':
        return <Zap className="h-3 w-3" />;
      case 'upcoming':
        return <Clock className="h-3 w-3" />;
      case 'finished':
        return <Lock className="h-3 w-3" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  return (
    <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:glow-primary group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge className={`${getStatusColor(race.status)} font-racing text-xs`}>
              {getStatusIcon(race.status)}
              {race.status.toUpperCase()}
            </Badge>
            {race.status === 'live' && (
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
            )}
          </div>
          <div className="text-right">
            <p className="text-lg font-racing font-bold text-primary">{race.prizePool}</p>
            <p className="text-xs text-muted-foreground font-speed">Prize Pool</p>
          </div>
        </div>
        <CardTitle className="text-xl font-racing text-foreground group-hover:text-primary transition-colors">
          {race.name}
        </CardTitle>
        <p className="text-sm text-muted-foreground font-speed">{race.track}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-racing font-semibold text-secondary">{race.participants}</p>
            <p className="text-xs text-muted-foreground font-speed flex items-center justify-center">
              <Users className="h-3 w-3 mr-1" />
              Racers
            </p>
          </div>
          <div>
            <p className="text-lg font-racing font-semibold text-accent">{race.totalBets}</p>
            <p className="text-xs text-muted-foreground font-speed">Encrypted</p>
          </div>
          <div>
            <p className="text-sm font-speed text-muted-foreground">{race.startTime}</p>
            <p className="text-xs text-muted-foreground font-speed">Start Time</p>
          </div>
        </div>

        <div className="racing-track h-1 rounded-full mb-4"></div>

        <div className="flex space-x-2">
          {race.status === 'upcoming' && (
            <>
              <Button variant="racing" size="sm" className="flex-1">
                Place Bet
              </Button>
              <Button variant="cyber" size="sm" className="px-3">
                <Lock className="h-4 w-4" />
              </Button>
            </>
          )}
          {race.status === 'live' && (
            <Button variant="secondary" size="sm" className="w-full" disabled>
              Race in Progress
            </Button>
          )}
          {race.status === 'finished' && (
            <Button variant="outline" size="sm" className="w-full">
              View Results
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RaceCard;