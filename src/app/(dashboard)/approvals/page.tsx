"use client";

import { Check, X, Search, Filter, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const approvals = [
  {
    id: "APP-001",
    campaign: "Payday Promo - May",
    requestedBy: "Marketing Manager",
    type: "Campaign Budget",
    amount: "$8,000",
    status: "PENDING",
    date: "2026-05-06",
  },
  {
    id: "APP-002",
    campaign: "Ramadan Flash Sale",
    requestedBy: "Finance",
    type: "Influencer Payment",
    amount: "$15,000",
    status: "APPROVED",
    date: "2026-04-15",
  },
];

export default function ApprovalsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Approvals</h2>
          <p className="text-muted-foreground">
            Manage campaign budgets and influencer payment approvals.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-none shadow-sm bg-amber-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-900">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700">4</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent border-slate-100">
                <TableHead className="py-4 px-6">Request ID</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right px-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvals.map((approval) => (
                <TableRow key={approval.id} className="border-slate-100">
                  <TableCell className="py-4 px-6 font-medium">
                    {approval.id}
                  </TableCell>
                  <TableCell className="font-medium text-slate-900">
                    {approval.campaign}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      {approval.requestedBy}
                    </div>
                  </TableCell>
                  <TableCell>{approval.type}</TableCell>
                  <TableCell className="font-semibold">{approval.amount}</TableCell>
                  <TableCell>
                    <Badge variant={approval.status === "APPROVED" ? "default" : "secondary"} 
                      className={approval.status === "PENDING" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}
                    >
                      {approval.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-6">
                    {approval.status === "PENDING" && (
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" className="h-8 text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700">
                          <X className="mr-1 h-3 w-3" />
                          Reject
                        </Button>
                        <Button size="sm" className="h-8 bg-emerald-600 hover:bg-emerald-700">
                          <Check className="mr-1 h-3 w-3" />
                          Approve
                        </Button>
                      </div>
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
