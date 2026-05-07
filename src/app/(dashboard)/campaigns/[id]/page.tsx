import { 
  ArrowLeft, 
  Calendar, 
  Target, 
  DollarSign, 
  Users, 
  CheckCircle2, 
  Clock, 
  MessageSquare,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const approvalSteps = [
  { status: "APPROVED", role: "Marketing Manager", date: "2026-05-01 10:00", notes: "Campaign strategy finalized." },
  { status: "APPROVED", role: "Company Admin", date: "2026-05-02 14:30", notes: "Approved for finance review." },
  { status: "PENDING", role: "Finance", date: null, notes: "Awaiting payment verification." },
];

export default async function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/campaigns">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight">Ramadan Flash Sale</h2>
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">RUNNING</Badge>
          </div>
          <p className="text-sm text-muted-foreground">ID: CAM-{id.padStart(5, '0')}</p>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="outline">Edit</Button>
          <Button>Submit for Approval</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Campaign Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium uppercase tracking-wider">
                    <DollarSign className="h-3 w-3" />
                    Budget
                  </div>
                  <p className="text-xl font-bold">$15,000.00</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium uppercase tracking-wider">
                    <Target className="h-3 w-3" />
                    Target Revenue
                  </div>
                  <p className="text-xl font-bold">$45,000.00</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium uppercase tracking-wider">
                    <Calendar className="h-3 w-3" />
                    Start Date
                  </div>
                  <p className="text-sm font-medium">March 10, 2026</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium uppercase tracking-wider">
                    <Calendar className="h-3 w-3" />
                    End Date
                  </div>
                  <p className="text-sm font-medium">April 10, 2026</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Description</h4>
                <p className="text-sm leading-relaxed text-slate-700">
                  Annual Ramadan campaign targeting young families for beverage products. 
                  Focusing on TikTok and Instagram creators for high engagement.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Assigned Influencers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-200" />
                      <div>
                        <p className="text-sm font-bold">Influencer {i}</p>
                        <p className="text-xs text-muted-foreground">@handle_{i}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground uppercase">Fee</p>
                        <p className="text-sm font-bold">$1,200</p>
                      </div>
                      <Badge variant="secondary">CONTRACTED</Badge>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Approval Workflow</CardTitle>
              <CardDescription>Track the progress of this campaign.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-6 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-slate-200">
                {approvalSteps.map((step, i) => (
                  <div key={i} className="relative pl-8">
                    <div className={`absolute left-0 top-1 h-[22px] w-[22px] rounded-full border-4 border-white shadow-sm flex items-center justify-center ${
                      step.status === "APPROVED" ? "bg-emerald-500" : "bg-slate-300"
                    }`}>
                      {step.status === "APPROVED" ? (
                        <CheckCircle2 className="h-3 w-3 text-white" />
                      ) : (
                        <Clock className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-slate-900">{step.role}</p>
                        <Badge variant={step.status === "APPROVED" ? "default" : "secondary"} className="text-[10px] h-4">
                          {step.status}
                        </Badge>
                      </div>
                      {step.date && <p className="text-[10px] text-muted-foreground">{step.date}</p>}
                      <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-md mt-2 italic">
                        &quot;{step.notes}&quot;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-blue-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-blue-600" />
                Comments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-xs text-slate-600">No internal comments yet.</p>
                <div className="flex gap-2">
                  <input className="flex-1 text-xs p-2 rounded-md border border-slate-200 bg-white" placeholder="Add a note..." />
                  <Button size="sm" variant="outline" className="h-8 text-xs">Post</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
