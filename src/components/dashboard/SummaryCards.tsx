"use client";

import {
  Truck,
  Users,
  Route,
  TriangleAlert,
  LucideIcon,
} from "lucide-react";

interface CardProps {
  title: string;
  value: number;
  subtitle: string;
  icon: LucideIcon;
}

function Card({
  title,
  value,
  subtitle,
  icon: Icon,
}: CardProps) {
  return (
    <div
      className="
      rounded-2xl
      border
      border-border
      bg-card
      p-6
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-primary/40
      hover:shadow-lg
    "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            {value}
          </h2>

          <p className="mt-2 text-sm text-primary">
            {subtitle}
          </p>
        </div>

        <div className="rounded-xl bg-primary/10 p-3">
          <Icon
            className="text-primary"
            size={24}
          />
        </div>
      </div>
    </div>
  );
}

export default function SummaryCards() {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <Card
        title="Active Vehicles"
        value={126}
        subtitle="+4 Today"
        icon={Truck}
      />

      <Card
        title="Drivers"
        value={34}
        subtitle="28 Active"
        icon={Users}
      />

      <Card
        title="Trips Today"
        value={248}
        subtitle="18 Ongoing"
        icon={Route}
      />

      <Card
        title="Critical Alerts"
        value={6}
        subtitle="Needs Attention"
        icon={TriangleAlert}
      />
    </section>
  );
}