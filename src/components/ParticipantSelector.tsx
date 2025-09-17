import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAccount } from 'wagmi';
import { User, Trophy, Zap, Shield } from 'lucide-react';
import PlaceBetModal from './PlaceBetModal';

interface Participant {
  id: string;
  name: string;
  address: string;
  reputation: number;
  totalWins: number;
  avgPerformance: number;
}

interface ParticipantSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  race: {
    id: string;
    name: string;
    track: string;
    startTime: string;
    participants: number;
    prizePool: string;
  };
}

export default function ParticipantSelector({ isOpen, onClose, race }: ParticipantSelectorProps) {
  const { address } = useAccount();
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [isBetModalOpen, setIsBetModalOpen] = useState(false);

  // Mock participants data - in real app, this would come from the contract
  const participants: Participant[] = [
    {
      id: "1",
      name: "Speed Demon",
      address: "0x1234567890123456789012345678901234567890",
      reputation: 95,
      totalWins: 12,
      avgPerformance: 87.5
    },
    {
      id: "2", 
      name: "Lightning Bolt",
      address: "0x2345678901234567890123456789012345678901",
      reputation: 88,
      totalWins: 8,
      avgPerformance: 82.3
    },
    {
      id: "3",
      name: "Thunder Strike", 
      address: "0x3456789012345678901234567890123456789012",
      reputation: 92,
      totalWins: 15,
      avgPerformance: 89.1
    },
    {
      id: "4",
      name: "Velocity King",
      address: "0x4567890123456789012345678901234567890123",
      reputation: 85,
      totalWins: 6,
      avgPerformance: 79.8
    },
    {
      id: "5",
      name: "Racing Legend",
      address: "0x5678901234567890123456789012345678901234",
      reputation: 98,
      totalWins: 22,
      avgPerformance: 94.2
    }
  ];

  const handleSelectParticipant = (participant: Participant) => {
    setSelectedParticipant(participant);
    setIsBetModalOpen(true);
  };

  const handleCloseBetModal = () => {
    setIsBetModalOpen(false);
    setSelectedParticipant(null);
  };

  const getReputationColor = (reputation: number) => {
    if (reputation >= 95) return 'text-green-500';
    if (reputation >= 85) return 'text-blue-500';
    if (reputation >= 75) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getReputationBadge = (reputation: number) => {
    if (reputation >= 95) return 'bg-green-500/20 text-green-500 border-green-500/30';
    if (reputation >= 85) return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
    if (reputation >= 75) return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
    return 'bg-red-500/20 text-red-500 border-red-500/30';
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-racing">
              <Trophy className="h-6 w-6 text-primary" />
              Select Participant to Bet On
            </DialogTitle>
            <DialogDescription className="font-speed">
              Choose a participant from {race.name} to place your encrypted bet on.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Race Info */}
            <Card className="bg-card/30 border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-racing">{race.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Track:</span>
                  <span className="text-sm font-speed">{race.track}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Prize Pool:</span>
                  <span className="text-sm font-racing text-primary">{race.prizePool}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Start Time:</span>
                  <span className="text-sm font-speed">{race.startTime}</span>
                </div>
              </CardContent>
            </Card>

            {/* Participants Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {participants.map((participant) => (
                <Card 
                  key={participant.id}
                  className="bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer group"
                  onClick={() => handleSelectParticipant(participant)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/20 text-primary font-racing">
                            {participant.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg font-racing group-hover:text-primary transition-colors">
                            {participant.name}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground font-mono">
                            {participant.address.slice(0, 6)}...{participant.address.slice(-4)}
                          </p>
                        </div>
                      </div>
                      <Badge className={getReputationBadge(participant.reputation)}>
                        {participant.reputation}%
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-lg font-racing font-semibold text-secondary">
                          {participant.totalWins}
                        </p>
                        <p className="text-xs text-muted-foreground font-speed flex items-center justify-center">
                          <Trophy className="h-3 w-3 mr-1" />
                          Wins
                        </p>
                      </div>
                      <div>
                        <p className="text-lg font-racing font-semibold text-accent">
                          {participant.avgPerformance}%
                        </p>
                        <p className="text-xs text-muted-foreground font-speed flex items-center justify-center">
                          <Zap className="h-3 w-3 mr-1" />
                          Avg Score
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        disabled={!address}
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Place Encrypted Bet
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Privacy Notice */}
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-racing text-sm text-primary mb-1">Privacy Protection</h4>
                  <p className="text-xs text-muted-foreground font-speed">
                    Your bet amount will be encrypted using Fully Homomorphic Encryption (FHE) 
                    and remain completely private until race completion. No one can see your 
                    wager or influence the race based on betting patterns.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Place Bet Modal */}
      {selectedParticipant && (
        <PlaceBetModal
          isOpen={isBetModalOpen}
          onClose={handleCloseBetModal}
          race={race}
          participant={selectedParticipant}
        />
      )}
    </>
  );
}

