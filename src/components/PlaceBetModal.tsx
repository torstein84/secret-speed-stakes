import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useContract } from '@/hooks/useContract';
import { useAccount } from 'wagmi';
import { formatEther, parseEther } from 'viem';
import { Lock, Shield, Trophy, Zap, AlertCircle, CheckCircle } from 'lucide-react';

interface PlaceBetModalProps {
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
  participant: {
    id: string;
    name: string;
    address: string;
  };
}

export default function PlaceBetModal({ isOpen, onClose, race, participant }: PlaceBetModalProps) {
  const { address } = useAccount();
  const { placeStake, isPending, isConfirming, isConfirmed, error, isEncrypting, encryptionError } = useContract();
  
  const [betAmount, setBetAmount] = useState('');
  const [isValidAmount, setIsValidAmount] = useState(false);
  const [step, setStep] = useState<'input' | 'encrypting' | 'confirming' | 'success' | 'error'>('input');

  // Validate bet amount
  useEffect(() => {
    if (betAmount) {
      try {
        const amount = parseFloat(betAmount);
        setIsValidAmount(amount > 0 && amount <= 10); // Max 10 ETH
      } catch {
        setIsValidAmount(false);
      }
    } else {
      setIsValidAmount(false);
    }
  }, [betAmount]);

  // Handle bet placement
  const handlePlaceBet = async () => {
    if (!isValidAmount || !address) return;

    setStep('encrypting');
    
    try {
      await placeStake(race.id, participant.id, betAmount);
      setStep('confirming');
    } catch (err) {
      console.error('Bet placement failed:', err);
      setStep('error');
    }
  };

  // Handle modal close
  const handleClose = () => {
    if (step === 'success') {
      setStep('input');
      setBetAmount('');
      onClose();
    } else if (step === 'error') {
      setStep('input');
    } else if (!isPending && !isConfirming) {
      setStep('input');
      setBetAmount('');
      onClose();
    }
  };

  // Update step based on transaction state
  useEffect(() => {
    if (isConfirmed && step === 'confirming') {
      setStep('success');
    }
  }, [isConfirmed, step]);

  const getStepIcon = () => {
    switch (step) {
      case 'encrypting':
        return <Lock className="h-6 w-6 text-primary animate-spin" />;
      case 'confirming':
        return <Shield className="h-6 w-6 text-secondary animate-pulse" />;
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      default:
        return <Trophy className="h-6 w-6 text-primary" />;
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 'encrypting':
        return 'Encrypting Your Bet';
      case 'confirming':
        return 'Confirming Transaction';
      case 'success':
        return 'Bet Placed Successfully!';
      case 'error':
        return 'Transaction Failed';
      default:
        return 'Place Your Encrypted Bet';
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 'encrypting':
        return 'Your bet amount is being encrypted using FHE technology to ensure complete privacy.';
      case 'confirming':
        return 'Your encrypted bet is being submitted to the blockchain. Please wait for confirmation.';
      case 'success':
        return 'Your bet has been successfully placed and encrypted on-chain. It will remain private until the race finishes.';
      case 'error':
        return 'There was an error placing your bet. Please try again.';
      default:
        return 'Place an encrypted bet on this participant. Your wager will remain completely private until race completion.';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-racing">
            {getStepIcon()}
            {getStepTitle()}
          </DialogTitle>
          <DialogDescription className="font-speed">
            {getStepDescription()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Race and Participant Info */}
          <Card className="bg-card/30 border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-racing">{race.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Track:</span>
                <span className="text-sm font-speed">{race.track}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Participant:</span>
                <Badge variant="secondary" className="font-speed">
                  {participant.name}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Prize Pool:</span>
                <span className="text-sm font-racing text-primary">{race.prizePool}</span>
              </div>
            </CardContent>
          </Card>

          {/* Bet Amount Input */}
          {step === 'input' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="betAmount" className="font-speed">
                  Bet Amount (ETH)
                </Label>
                <Input
                  id="betAmount"
                  type="number"
                  placeholder="0.1"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  min="0.001"
                  max="10"
                  step="0.001"
                  className="font-mono"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Min: 0.001 ETH</span>
                  <span>Max: 10 ETH</span>
                </div>
              </div>

              {/* Privacy Notice */}
              <Alert className="bg-primary/10 border-primary/20">
                <Shield className="h-4 w-4 text-primary" />
                <AlertDescription className="text-sm">
                  <strong className="font-racing">Privacy Protected:</strong> Your bet amount will be encrypted using 
                  Fully Homomorphic Encryption (FHE) and remain completely private until race completion.
                </AlertDescription>
              </Alert>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePlaceBet}
                  disabled={!isValidAmount || !address}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Place Encrypted Bet
                </Button>
              </div>
            </div>
          )}

          {/* Processing States */}
          {(step === 'encrypting' || step === 'confirming') && (
            <div className="space-y-4">
              <div className="text-center space-y-4">
                <div className="p-4 rounded-full bg-primary/10 w-16 h-16 mx-auto flex items-center justify-center">
                  {getStepIcon()}
                </div>
                <div>
                  <h3 className="font-racing text-lg">{getStepTitle()}</h3>
                  <p className="text-sm text-muted-foreground font-speed">
                    {getStepDescription()}
                  </p>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="w-full bg-secondary/20 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-1000"
                  style={{ width: step === 'encrypting' ? '50%' : '100%' }}
                />
              </div>

              <div className="text-center">
                <p className="text-xs text-muted-foreground font-speed">
                  {step === 'encrypting' ? 'Encrypting data...' : 'Waiting for blockchain confirmation...'}
                </p>
              </div>
            </div>
          )}

          {/* Success State */}
          {step === 'success' && (
            <div className="space-y-4">
              <div className="text-center space-y-4">
                <div className="p-4 rounded-full bg-green-500/10 w-16 h-16 mx-auto flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <div>
                  <h3 className="font-racing text-lg text-green-500">Bet Placed Successfully!</h3>
                  <p className="text-sm text-muted-foreground font-speed">
                    Your encrypted bet of {betAmount} ETH has been placed on {participant.name}.
                  </p>
                </div>
              </div>

              <Alert className="bg-green-500/10 border-green-500/20">
                <Shield className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-sm">
                  <strong className="font-racing">Privacy Secured:</strong> Your bet remains encrypted and private 
                  until the race finishes. No one can see your wager amount or influence the race based on it.
                </AlertDescription>
              </Alert>

              <Button onClick={handleClose} className="w-full">
                <Trophy className="h-4 w-4 mr-2" />
                Continue to Dashboard
              </Button>
            </div>
          )}

          {/* Error State */}
          {step === 'error' && (
            <div className="space-y-4">
              <div className="text-center space-y-4">
                <div className="p-4 rounded-full bg-red-500/10 w-16 h-16 mx-auto flex items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-red-500" />
                </div>
                <div>
                  <h3 className="font-racing text-lg text-red-500">Transaction Failed</h3>
                  <p className="text-sm text-muted-foreground font-speed">
                    {error?.message || encryptionError || 'An unexpected error occurred.'}
                  </p>
                </div>
              </div>

              <Alert className="bg-red-500/10 border-red-500/20">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <AlertDescription className="text-sm">
                  Please check your wallet connection and try again. If the problem persists, 
                  ensure you have sufficient ETH for the transaction and gas fees.
                </AlertDescription>
              </Alert>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep('input')}
                  className="flex-1"
                >
                  Try Again
                </Button>
                <Button
                  onClick={handleClose}
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
