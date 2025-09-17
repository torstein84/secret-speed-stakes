import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, Zap, Shield } from "lucide-react";

const WalletConnect = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <Card className="bg-card/50 border-primary/30 glow-primary">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Wallet className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-racing text-primary">Connected</p>
                <p className="text-xs text-muted-foreground font-speed">
                  {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''}
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => disconnect()}
              className="border-primary/30 text-primary hover:bg-primary/10"
            >
              Disconnect
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/30 border-muted/30">
      <CardContent className="p-6 text-center">
        <div className="mb-4">
          <div className="inline-flex p-3 rounded-full bg-primary/20 mb-3">
            <Wallet className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-racing text-foreground mb-2">Connect Your Wallet</h3>
          <p className="text-sm text-muted-foreground font-speed mb-4">
            Connect your wallet to place encrypted racing bets
          </p>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Shield className="h-3 w-3 text-secondary" />
            <span>End-to-end encrypted betting</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Zap className="h-3 w-3 text-accent" />
            <span>Lightning fast transactions</span>
          </div>
        </div>

        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            const ready = mounted && authenticationStatus !== 'loading';
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === 'authenticated');

            return (
              <div
                {...(!ready && {
                  'aria-hidden': true,
                  'style': {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <Button 
                        variant="racing" 
                        className="w-full"
                        onClick={openConnectModal}
                      >
                        Connect Wallet
                      </Button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <Button 
                        variant="destructive" 
                        className="w-full"
                        onClick={openChainModal}
                      >
                        Wrong network
                      </Button>
                    );
                  }

                  return (
                    <div className="flex items-center justify-between w-full">
                      <Button
                        variant="outline"
                        onClick={openChainModal}
                        className="flex items-center gap-2"
                      >
                        {chain.hasIcon && (
                          <div
                            style={{
                              background: chain.iconBackground,
                              width: 12,
                              height: 12,
                              borderRadius: 999,
                              overflow: 'hidden',
                              marginRight: 4,
                            }}
                          >
                            {chain.iconUrl && (
                              <img
                                alt={chain.name ?? 'Chain icon'}
                                src={chain.iconUrl}
                                style={{ width: 12, height: 12 }}
                              />
                            )}
                          </div>
                        )}
                        {chain.name}
                      </Button>

                      <Button
                        variant="outline"
                        onClick={openAccountModal}
                        className="flex items-center gap-2"
                      >
                        {account.displayName}
                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ''}
                      </Button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </CardContent>
    </Card>
  );
};

export default WalletConnect;