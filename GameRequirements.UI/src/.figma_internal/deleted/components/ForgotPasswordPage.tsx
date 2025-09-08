import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";

interface ForgotPasswordPageProps {
  onNavigate?: (page: string) => void;
}

export function ForgotPasswordPage({ onNavigate }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Здесь будет логика отправки email
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#00ffff]/5 via-transparent to-primary/5" />
      
      <Card className="w-full max-w-md glass-morphism border-[#00ffff]/20">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-[#00ffff] to-primary bg-clip-text text-transparent">
            ВОССТАНОВЛЕНИЕ
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {isSubmitted 
              ? "Мы отправили инструкции на ваш email"
              : "Введите email для восстановления пароля"
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {!isSubmitted ? (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-input-background border-border focus:border-[#00ffff] transition-colors"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <Button 
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-[#00ffff] to-primary hover:from-[#00ffff]/80 hover:to-primary/80 text-background font-semibold neon-glow"
                  size="lg"
                  disabled={!email}
                >
                  Отправить инструкции
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#00ffff]/20 to-[#00ffff]/5 rounded-full flex items-center justify-center mx-auto neon-glow">
                <Mail className="h-8 w-8 text-[#00ffff]" />
              </div>
              
              <div className="space-y-2">
                <p className="text-foreground">
                  Письмо отправлено на
                </p>
                <p className="text-[#00ffff] font-semibold">{email}</p>
                <p className="text-muted-foreground text-sm">
                  Проверьте папку спам, если письма нет во входящих
                </p>
              </div>
              
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="w-full border-[#00ffff]/30 hover:border-[#00ffff] hover:bg-[#00ffff]/10 hover:text-[#00ffff] transition-all duration-300"
              >
                Изменить email
              </Button>
            </div>
          )}
          
          <div className="text-center">
            <Button
              variant="link"
              className="text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2"
              onClick={() => onNavigate?.("login")}
            >
              <ArrowLeft className="h-4 w-4" />
              Вернуться к входу
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}