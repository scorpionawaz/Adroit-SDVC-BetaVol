"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, TicketCheck, ArrowUpRight, ArrowDownRight } from "lucide-react";

export function AdminCommandCenter() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Command Center</h1>
          <p className="text-muted-foreground mt-1">High-level overview of grid operations and consumer metrics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Consumers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142,890</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +1,204 this month
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Grid Load</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,450 MW</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center text-red-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              Peak demand approaching
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-amber-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <TicketCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center text-green-600">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              -12% from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="min-h-[300px]">
          <CardHeader>
            <CardTitle>Grid Performance</CardTitle>
            <CardDescription>Live telemetry across primary substations</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center pt-10">
            <p className="text-muted-foreground flex items-center text-sm">
              <Activity className="mr-2 h-4 w-4" /> Live Chart Placeholder
            </p>
          </CardContent>
        </Card>
        <Card className="min-h-[300px]">
          <CardHeader>
            <CardTitle>Revenue Analytics</CardTitle>
            <CardDescription>Prepaid vs Postpaid collection trends</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center pt-10">
            <p className="text-muted-foreground flex items-center text-sm">
              <Activity className="mr-2 h-4 w-4" /> Bar Chart Placeholder
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
