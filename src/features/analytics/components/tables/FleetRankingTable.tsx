"use client";

import { Empty, Progress, Table, Tag } from "antd";
import { Truck } from "lucide-react";

import { useFleetScores } from "../../hooks/useAnalytics";

export default function FleetRankingTable() {
  const { data, isLoading } = useFleetScores();

  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      width: 90,
      render: (rank: number) => (
        <Tag
          color={rank <= 3 ? "green" : "default"}
          className="rounded-full px-3"
        >
          #{rank}
        </Tag>
      ),
    },
    {
      title: "Vehicle",
      dataIndex: "vehicle",
    },
    {
      title: "Fleet Score",
      dataIndex: "score",
      width: 220,
      render: (value: number) => (
        <Progress
          percent={Math.round(value)}
          strokeColor="var(--primary)"
          trailColor="rgba(0,0,0,.06)"
          size="small"
        />
      ),
    },
  ];

  return (
    <section
      className="
      rounded-2xl
      border
      border-border/60
      bg-card
      shadow-sm
      overflow-hidden
    "
    >
      <div
        className="
        flex
        items-center
        gap-3
        border-b
        border-border/60
        bg-muted/30
        px-6
        py-4
      "
      >
        <div
          className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-primary/10
          text-primary
        "
        >
          <Truck size={20} />
        </div>

        <div>
          <h3 className="font-semibold text-foreground">
            Fleet Rankings
          </h3>

          <p className="text-sm text-muted-foreground">
            Fleet performance based on efficiency and emissions.
          </p>
        </div>
      </div>

      <div className="p-2">
        <Table
          rowKey="vehicle_id"
          loading={isLoading}
          columns={columns}
          dataSource={data ?? []}
          pagination={false}
          locale={{
            emptyText: (
              <Empty description="No fleet rankings available" />
            ),
          }}
        />
      </div>
    </section>
  );
}