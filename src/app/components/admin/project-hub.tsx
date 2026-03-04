"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Download, RefreshCw } from "lucide-react";

export function AdminProjectHub() {
  const [activeDataset, setActiveDataset] = useState<"MGVCL" | "DGVCL">("MGVCL");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Hub</h1>
          <p className="text-muted-foreground mt-1">Manage infrastructure datasets and deployments.</p>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-muted/50 p-2 rounded-lg w-fit">
        <Button 
          variant={activeDataset === "MGVCL" ? "default" : "ghost"}
          className={activeDataset === "MGVCL" ? "shadow-sm" : ""}
          onClick={() => setActiveDataset("MGVCL")}
        >
          MGVCL Region
        </Button>
        <Button 
          variant={activeDataset === "DGVCL" ? "default" : "ghost"}
          className={activeDataset === "DGVCL" ? "shadow-sm" : ""}
          onClick={() => setActiveDataset("DGVCL")}
        >
          DGVCL Region
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{activeDataset} Analytics Dataset</CardTitle>
              <Database className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardDescription>Primary data repository for machine learning models.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Last Synced</p>
              <p className="text-sm text-muted-foreground">Today at 08:30 AM</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Record Count</p>
              <p className="text-sm text-muted-foreground">
                {activeDataset === "MGVCL" ? "2.4M rows" : "1.8M rows"}
              </p>
            </div>
            <div className="flex gap-2 pt-4">
              <Button size="sm" variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" /> Sync Now
              </Button>
              <Button size="sm">
                <Download className="mr-2 h-4 w-4" /> Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deployment Status</CardTitle>
            <CardDescription>Edge devices and smart meters network health.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm">Online Devices</span>
                <span className="font-medium text-green-600">
                  {activeDataset === "MGVCL" ? "98.2%" : "97.5%"}
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm">Firmware Outdated</span>
                <span className="font-medium text-amber-500">
                  {activeDataset === "MGVCL" ? "420" : "185"} units
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm">Network Drops</span>
                <span className="font-medium">
                  {activeDataset === "MGVCL" ? "1.2%" : "1.8%"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
