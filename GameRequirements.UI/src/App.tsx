import { useEffect, useState } from "react"
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { ResultsPage } from "./components/ResultsPage";
import { ComparePage } from "./components/ComparePage";
import { AboutPage } from "./components/AboutPage";
import { UIKitPage } from "./components/UIKitPage";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { ForgotPasswordPage } from "./components/ForgotPasswordPage";
import { ProfilePage } from "./components/ProfilePage";
import { GamesPage } from "./components/GamesPage";

type Page = "home" | "results" | "game" | "compare" | "about" | "uikit" | "login" | "register" | "forgot-password" | "profile" | "games";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedConfig, setSelectedConfig] = useState<{
    cpu: string;
    gpu: string;
    ram: string;
    integratedGraphics: boolean;
  } | null>(null);

  const handleCheckCompatibility = (cpu: string, gpu: string, ram: string, integratedGraphics: boolean) => {
    setSelectedConfig({ cpu, gpu, ram, integratedGraphics });
    setCurrentPage("results");
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onCheckCompatibility={handleCheckCompatibility} />;
      case "results":
        if (!selectedConfig) {
          setCurrentPage("home");
          return <HomePage onCheckCompatibility={handleCheckCompatibility} />;
        }
        return (
          <ResultsPage
            selectedCPU={selectedConfig.cpu}
            selectedGPU={selectedConfig.gpu}
            selectedRAM={selectedConfig.ram}
            integratedGraphics={selectedConfig.integratedGraphics}
          />
        );
      case "compare":
        return <ComparePage />;
      case "about":
        return <AboutPage />;
      case "uikit":
        return <UIKitPage />;
      case "login":
        return <LoginPage onNavigate={setCurrentPage} />;
      case "register":
        return <RegisterPage onNavigate={setCurrentPage} />;
      case "forgot-password":
        return <ForgotPasswordPage onNavigate={setCurrentPage} />;
      case "profile":
        return <ProfilePage onNavigate={setCurrentPage} />;
      case "games":
        return <GamesPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onCheckCompatibility={handleCheckCompatibility} />;
    }
  };

  const isAuthPage = ["login", "register", "forgot-password"].includes(currentPage);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={setCurrentPage} />
      <main className={`flex-1 ${!isAuthPage ? "max-w-7xl mx-auto px-6 py-8 w-full" : ""}`}>
        {renderCurrentPage()}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}