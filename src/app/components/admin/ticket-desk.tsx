"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, UserCheck } from "lucide-react";

interface Ticket {
  id: string;
  consumer: string;
  issue: string;
  priority: string;
  status: string;
  assignee?: string;
  location?: string;
}

const initialTickets: Ticket[] = [
  { id: "T-001", consumer: "Rajesh K.", issue: "Smart Meter Sync Error", priority: "High", status: "Open" },
  { id: "T-002", consumer: "Priya S.", issue: "Recharge Failed", priority: "Critical", status: "In Progress" },
  { id: "T-003", consumer: "Amit Verma", issue: "High Bill Complaint", priority: "Medium", status: "Open" },
  { id: "T-004", consumer: "Neha G.", issue: "Power Outage Reported", priority: "High", status: "Resolved" },
  { id: "T-005", consumer: "Sunil M.", issue: "Address Update", priority: "Low", status: "Open" },
];

export function AdminTicketDesk() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [assigningId, setAssigningId] = useState<string | null>(null);

  const handleAutoAssign = (id: string) => {
    setAssigningId(id);
    
    // Simulate searching and assigning process
    setTimeout(() => {
      setTickets(prev => prev.map(t => {
        if (t.id === id) {
          return {
            ...t,
            status: "Assigned",
            assignee: "Vikrant S.",
            location: "1.2km away"
          };
        }
        return t;
      }));
      setAssigningId(null);
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ticket Desk</h1>
          <p className="text-muted-foreground mt-1">Manage and resolve consumer complaints efficiently.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Consumer Tickets</CardTitle>
          <CardDescription>Review and assign open support requests.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Consumer Name</TableHead>
                <TableHead>Issue Summary</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium align-middle">{t.id}</TableCell>
                  <TableCell className="align-middle">{t.consumer}</TableCell>
                  <TableCell className="align-middle">{t.issue}</TableCell>
                  <TableCell className="align-middle">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      t.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                      t.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                      t.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {t.priority}
                    </span>
                  </TableCell>
                  <TableCell className="align-middle">
                    {t.status === "Assigned" && t.assignee ? (
                      <div className="flex flex-col">
                        <span className="inline-flex items-center text-sm font-medium text-blue-700">
                          <UserCheck className="mr-1 h-4 w-4" /> {t.status}: {t.assignee}
                        </span>
                        <span className="text-xs text-muted-foreground ml-5">
                          Location: {t.location}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm">{t.status}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right align-middle">
                    {t.status === "Open" ? (
                      <Button 
                        size="sm" 
                        onClick={() => handleAutoAssign(t.id)}
                        disabled={assigningId === t.id}
                        className="w-[180px]"
                      >
                        {assigningId === t.id ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Searching Field Worker...
                          </>
                        ) : (
                          "Auto-Assign Agent"
                        )}
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="w-[180px]">View Details</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
