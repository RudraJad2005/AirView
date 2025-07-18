
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, Users, Briefcase, ShoppingCart, MoreHorizontal, ArrowUp, ArrowDown } from "lucide-react";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { ActiveUsersChart } from "@/components/dashboard/active-users-chart";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const projects = [
  { name: "Chakra Soft UI Version", budget: "$14,000", completion: 60 },
  { name: "Add Progress Track", budget: "$3,000", completion: 10 },
  { name: "Fix Platform Errors", budget: "Not set", completion: 100 },
  { name: "Launch our Mobile App", budget: "$32,000", completion: 100 },
  { name: "Add the New Pricing Page", budget: "$500", completion: 25 },
];

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-6">
      {/* Top Stat Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Money</CardTitle>
            <div className="p-2 bg-primary rounded-lg">
                <DollarSign className="h-5 w-5 text-primary-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$53,000</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-semibold">+55%</span> since yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Users</CardTitle>
            <div className="p-2 bg-primary rounded-lg">
                <Users className="h-5 w-5 text-primary-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,300</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-semibold">+5%</span> since last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">New Clients</CardTitle>
            <div className="p-2 bg-primary rounded-lg">
                <Briefcase className="h-5 w-5 text-primary-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+3,052</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 font-semibold">-14%</span> since last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sales</CardTitle>
            <div className="p-2 bg-primary rounded-lg">
                <ShoppingCart className="h-5 w-5 text-primary-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$173,000</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-semibold">+8%</span> since last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="relative overflow-hidden">
             <CardHeader>
                <CardTitle>Welcome back,</CardTitle>
                <CardDescription>Glad to see you again!</CardDescription>
             </CardHeader>
             <CardContent>
                <p className="text-4xl font-bold">Mark Johnson</p>
             </CardContent>
             <Image 
                src="https://placehold.co/600x400.png"
                alt="Jellyfish"
                width={300}
                height={200}
                data-ai-hint="jellyfish dark"
                className="absolute right-0 bottom-0 opacity-80"
             />
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>
                <span className="text-green-500"><ArrowUp className="inline-block h-4 w-4" /> 4% more</span> in 2021
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SalesChart />
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Users</CardTitle>
              <CardDescription>(+23) than last week</CardDescription>
            </CardHeader>
            <CardContent>
              <ActiveUsersChart />
            </CardContent>
          </Card>
        </div>
      </div>
      
       <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Projects</CardTitle>
                    <CardDescription>30 done this month</CardDescription>
                </div>
                <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="uppercase text-muted-foreground/80 text-xs">Companies</TableHead>
                            <TableHead className="text-center uppercase text-muted-foreground/80 text-xs">Budget</TableHead>
                            <TableHead className="text-center uppercase text-muted-foreground/80 text-xs">Completion</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.map(p => (
                            <TableRow key={p.name}>
                                <TableCell className="font-semibold">{p.name}</TableCell>
                                <TableCell className="text-center font-semibold">{p.budget}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col items-center">
                                        <span className="text-primary font-semibold">{p.completion}%</span>
                                        <Progress value={p.completion} className="h-1 w-full mt-1" />
                                    </div>
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
