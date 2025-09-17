import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RaceCard from "./RaceCard";
import { TrendingUp, Shield, Zap, Trophy } from "lucide-react";

const RacingDashboard = () => {
  const [activeTab, setActiveTab] = useState("races");

  const races = [
    {
      id: "1",
      name: "Monaco Grand Prix",
      track: "Circuit de Monaco",
      startTime: "14:00 UTC",
      totalBets: 247,
      participants: 20,
      status: 'upcoming' as const,
      prizePool: "50.2 ETH"
    },
    {
      id: "2", 
      name: "Silverstone Sprint",
      track: "Silverstone Circuit", 
      startTime: "Live Now",
      totalBets: 189,
      participants: 18,
      status: 'live' as const,
      prizePool: "32.8 ETH"
    },
    {
      id: "3",
      name: "Spa Francorchamps",
      track: "Circuit de Spa-Francorchamps",
      startTime: "Finished",
      totalBets: 312,
      participants: 22,
      status: 'finished' as const,
      prizePool: "67.5 ETH"
    }
  ];

  const stats = [
    {
      title: "Total Wagered",
      value: "1,234.56 ETH",
      change: "+12.3%",
      icon: TrendingUp,
      color: "text-secondary"
    },
    {
      title: "Encrypted Bets",
      value: "8,742",
      change: "100%",
      icon: Shield,
      color: "text-primary"
    },
    {
      title: "Active Races",
      value: "12",
      change: "+2",
      icon: Zap,
      color: "text-accent"
    },
    {
      title: "Payouts",
      value: "892.14 ETH",
      change: "+8.7%",
      icon: Trophy,
      color: "text-racing-accent"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.title} className="bg-card/30 border-border/50 hover:border-primary/30 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-speed text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-racing font-bold text-foreground">{stat.value}</p>
                    <p className={`text-sm font-speed ${stat.color}`}>{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-primary/10 ${stat.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Dashboard */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-card/30 border border-border/50">
          <TabsTrigger value="races" className="font-racing data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Live Races
          </TabsTrigger>
          <TabsTrigger value="bets" className="font-racing data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            My Bets
          </TabsTrigger>
          <TabsTrigger value="history" className="font-racing data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="races" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-racing font-bold text-foreground">Active Racing Events</h3>
            <Button variant="cyber" size="sm">
              <Shield className="h-4 w-4 mr-2" />
              All Encrypted
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {races.map((race) => (
              <RaceCard key={race.id} race={race} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bets" className="space-y-6">
          <Card className="bg-card/30 border-border/50">
            <CardHeader>
              <CardTitle className="font-racing text-foreground">Your Encrypted Bets</CardTitle>
            </CardHeader>
            <CardContent className="text-center py-12">
              <div className="p-4 rounded-full bg-primary/10 w-16 h-16 mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary mx-auto mt-2" />
              </div>
              <p className="text-lg font-racing text-muted-foreground mb-2">No Active Bets</p>
              <p className="text-sm text-muted-foreground font-speed mb-6">
                Place your first encrypted bet to get started
              </p>
              <Button variant="racing">
                Browse Races
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="bg-card/30 border-border/50">
            <CardHeader>
              <CardTitle className="font-racing text-foreground">Betting History</CardTitle>
            </CardHeader>
            <CardContent className="text-center py-12">
              <div className="p-4 rounded-full bg-accent/10 w-16 h-16 mx-auto mb-4">
                <Trophy className="h-8 w-8 text-accent mx-auto mt-2" />
              </div>
              <p className="text-lg font-racing text-muted-foreground mb-2">No History Yet</p>
              <p className="text-sm text-muted-foreground font-speed">
                Your betting history will appear here once you place your first bet
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RacingDashboard;