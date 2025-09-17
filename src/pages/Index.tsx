import RacingHeader from "@/components/RacingHeader";
import WalletConnect from "@/components/WalletConnect";
import RacingDashboard from "@/components/RacingDashboard";

const Index = () => {
  return (
    <div className="min-h-screen">
      <RacingHeader />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Wallet Connection Section */}
        <section className="max-w-md mx-auto">
          <WalletConnect />
        </section>

        {/* Racing Dashboard */}
        <section>
          <RacingDashboard />
        </section>
      </main>

      {/* Racing track decoration */}
      <div className="fixed bottom-0 left-0 right-0 h-2 racing-track opacity-30 pointer-events-none"></div>
    </div>
  );
};

export default Index;
