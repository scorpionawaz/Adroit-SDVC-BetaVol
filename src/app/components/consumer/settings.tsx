"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Settings as SettingsIcon, Bot, ShieldAlert, Sparkles } from "lucide-react";

export function ConsumerSettings() {
  const [darkMode, setDarkMode] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [autonomyLevel, setAutonomyLevel] = useState("autonomous");
  const [proactiveAlerts, setProactiveAlerts] = useState(true);
  const [powerSavingSchedule, setPowerSavingSchedule] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);

  // Toggle dark mode by adding/removing 'dark' class on html element
  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">Configure your BetaVolt app preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* AI Agent Settings */}
        <Card className="md:col-span-2 border-primary/20 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <CardTitle>AI Agent Configuration</CardTitle>
            </div>
            <CardDescription>Control how your AI Assistant manages your home's energy.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-semibold">Agent Autonomy Level</Label>
              <RadioGroup value={autonomyLevel} onValueChange={setAutonomyLevel} className="gap-4">
                <div className="flex items-start space-x-3 border p-4 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setAutonomyLevel("manual")}>
                  <RadioGroupItem value="manual" id="manual" className="mt-1" />
                  <div className="space-y-1">
                    <Label htmlFor="manual" className="font-medium cursor-pointer">Manual Mode (Ask Before Action)</Label>
                    <p className="text-sm text-muted-foreground">The AI will notify you of optimizations but wait for your explicit approval through chat or voice before taking any action.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 border p-4 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setAutonomyLevel("smart")}>
                  <RadioGroupItem value="smart" id="smart" className="mt-1" />
                  <div className="space-y-1">
                    <Label htmlFor="smart" className="font-medium cursor-pointer">Smart Mode (Agent Decides Partially)</Label>
                    <p className="text-sm text-muted-foreground">The AI will automatically optimize non-critical background appliances like your heater, but ask before turning off heavy loads like the AC.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 border border-primary/40 bg-primary/5 p-4 rounded-lg cursor-pointer hover:bg-primary/10 transition-colors relative" onClick={() => setAutonomyLevel("autonomous")}>
                  <RadioGroupItem value="autonomous" id="autonomous" className="mt-1 text-primary" />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="autonomous" className="font-medium text-primary cursor-pointer">Autonomous Mode (Full Autonomy)</Label>
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground tracking-tight">Maximum savings. The AI operates fully autonomously, using predictive weather and dynamic tariff data to aggressively manage all your devices.</p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center justify-between space-x-2 pt-4 border-t border-border/50">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-orange-500" />
                  <Label className="text-base">Proactive Alerts</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Allow the AI to proactively alert you or even invoke a voice call if it detects extreme anomalies or sudden upcoming peak tariffs.
                </p>
              </div>
              <Switch
                checked={proactiveAlerts}
                onCheckedChange={setProactiveAlerts}
              />
            </div>
          </CardContent>
        </Card>

        {/* App Settings */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-muted-foreground" />
              <CardTitle>System Settings</CardTitle>
            </div>
            <CardDescription>Customize your monitoring experience.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2 border-b pb-4">
              <div className="space-y-0.5">
                <Label className="text-base">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Enable high-contrast dark mode to save OLED battery life.
                </p>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={handleDarkModeToggle}
              />
            </div>

            <div className="flex items-center justify-between space-x-2 pt-2">
              <div className="space-y-0.5">
                <Label className="text-base">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive system alerts for bill generation and ticket updates.
                </p>
              </div>
              <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
            </div>

            <div className="flex items-center justify-between space-x-2 pt-4 border-t">
              <div className="space-y-0.5">
                <Label className="text-base">Email Bill Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Receive monthly bill and payment confirmation via email.
                </p>
              </div>
              <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
            </div>

            <div className="flex items-center justify-between space-x-2 pt-4 border-t">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-base font-medium">🌿 Power Saving Schedule</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Automatically enable Power Saving Mode on weekdays 9 AM–6 PM (office hours).
                </p>
              </div>
              <Switch checked={powerSavingSchedule} onCheckedChange={setPowerSavingSchedule} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
