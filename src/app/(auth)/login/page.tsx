"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { BarChart3, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    router.refresh();
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side: Visual Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-primary to-purple-700" />
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        
        {/* Decorative Circles */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/20 blur-3xl animate-pulse delay-700" />

        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl">
              <BarChart3 className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight">TrackKOL</h1>
          </div>
          
          <h2 className="text-5xl font-bold leading-tight mb-6">
            The Smart Way to Track <br /> 
            <span className="text-indigo-200">Influencer ROI.</span>
          </h2>
          
          <p className="text-xl text-indigo-100 max-w-lg mb-12 font-medium leading-relaxed">
            Analyze, optimize, and scale your influencer marketing campaigns with precision analytics tailored for FMCG brands.
          </p>

          <div className="grid grid-cols-2 gap-8 max-w-md">
            <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/10">
              <p className="text-3xl font-bold mb-1">2.4x</p>
              <p className="text-sm text-indigo-200">Average ROI Increase</p>
            </div>
            <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/10">
              <p className="text-3xl font-bold mb-1">500+</p>
              <p className="text-sm text-indigo-200">Top KOLs Indexed</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-16 text-indigo-200/50 text-sm font-medium">
          © 2026 TrackKOL Technologies. All rights reserved.
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 sm:p-16">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-12">
            <BarChart3 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-slate-900">TrackKOL</span>
          </div>

          <div className="mb-10">
            <h3 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h3>
            <p className="text-slate-500 font-medium">Please enter your details to access your account.</p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="rounded-2xl bg-rose-50 p-4 border border-rose-100 text-sm text-rose-600 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <div className="h-2 w-2 rounded-full bg-rose-500 shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-slate-700 ml-1">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@trackkol.demo"
                className="h-12 px-4 rounded-2xl border-slate-200 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50"
                {...form.register("email")}
                disabled={isLoading}
              />
              {form.formState.errors.email && (
                <p className="text-xs text-rose-500 ml-1">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label htmlFor="password" title="Enter your password" className="text-sm font-semibold text-slate-700">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-bold text-primary hover:text-indigo-700 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-12 px-4 rounded-2xl border-slate-200 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50"
                {...form.register("password")}
                disabled={isLoading}
              />
              {form.formState.errors.password && (
                <p className="text-xs text-rose-500 ml-1">{form.formState.errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full h-12 rounded-2xl bg-primary hover:bg-indigo-700 text-white font-bold text-base shadow-lg shadow-primary/20 transition-all active:scale-[0.98]" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Sign In"}
            </Button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-100"></span>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest text-slate-400">
                <span className="bg-white px-4">Local Preview</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              type="button" 
              className="w-full h-12 rounded-2xl border-2 border-slate-100 hover:bg-slate-50 hover:border-slate-200 text-slate-700 font-bold text-base transition-all active:scale-[0.98]"
              onClick={async () => {
                const { loginAsDemo } = await import("@/app/actions/auth");
                await loginAsDemo();
              }}
            >
              🚀 Try Demo Mode
            </Button>

            <p className="text-center text-sm text-slate-500 font-medium">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-bold text-primary hover:underline">
                Contact Admin
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
