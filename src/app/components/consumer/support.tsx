"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MessageSquare, Clock, CheckCircle2, UploadCloud, FileImage } from "lucide-react";

export function ConsumerSupport() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Support & Complaints</h1>
          <p className="text-muted-foreground mt-1">Raise a new ticket or track your existing requests.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Support Form */}
        <Card className="lg:col-span-1 shadow-md">
          <CardHeader>
            <CardTitle>Raise New Ticket</CardTitle>
            <CardDescription>Describe your issue and our team will assist you.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Issue Category</Label>
              <select 
                id="category" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option>Billing Issue</option>
                <option>Meter Fault</option>
                <option>Power Outage</option>
                <option>New Connection</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea id="desc" placeholder="Please provide detailed information about your issue..." className="min-h-[100px]" />
            </div>

            <div className="space-y-2">
              <Label>Attach Photo of Meter (Optional)</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors">
                <UploadCloud className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>

            <Button className="w-full mt-2">Submit Ticket</Button>
          </CardContent>
        </Card>

        {/* My Tickets List */}
        <Card className="lg:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle>My Tickets</CardTitle>
            <CardDescription>Status of your recently raised complaints</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table className="min-w-[600px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status / Assigned To</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium align-top py-4">#TKT-8821</TableCell>
                  <TableCell className="align-top py-4">Meter Fault</TableCell>
                  <TableCell className="align-top py-4">Feb 22, 2026</TableCell>
                  <TableCell className="py-4">
                    <div className="space-y-1">
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        <Clock className="mr-1 h-3 w-3" /> In Progress
                      </span>
                      <p className="text-xs text-muted-foreground">Agent: Rajesh Kumar</p>
                    </div>
                  </TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell className="font-medium align-top py-4">#TKT-8104</TableCell>
                  <TableCell className="align-top py-4">Billing Issue</TableCell>
                  <TableCell className="align-top py-4">Jan 10, 2026</TableCell>
                  <TableCell className="py-4">
                    <div className="space-y-1">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        <CheckCircle2 className="mr-1 h-3 w-3" /> Resolved
                      </span>
                      <p className="text-xs text-muted-foreground">Agent: Sneha P.</p>
                    </div>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium align-top py-4">#TKT-7542</TableCell>
                  <TableCell className="align-top py-4">Power Outage</TableCell>
                  <TableCell className="align-top py-4">Nov 05, 2025</TableCell>
                  <TableCell className="py-4">
                    <div className="space-y-1">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        <CheckCircle2 className="mr-1 h-3 w-3" /> Resolved
                      </span>
                      <p className="text-xs text-muted-foreground">Agent: Amit Desai</p>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
