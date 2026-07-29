"use client";

import { Empty, Table, Tag } from "antd";
import { Trophy } from "lucide-react";

import { useDriverScores } from "../../hooks/useAnalytics";

export default function DriverRankingTable() {
  const { data, isLoading } = useDriverScores();

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
      title: "Driver",
      dataIndex: "driver_name",
    },
    {
      title: "Performance",
      dataIndex: "score",
      align: "right" as const,
      render: (value: number) => (
        <span className="font-semibold text-primary">
          {value.toFixed(1)}%
        </span>
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
          <Trophy size={20} />
        </div>

        <div>
          <h3 className="font-semibold text-foreground">
            Driver Rankings
          </h3>

          <p className="text-sm text-muted-foreground">
            Highest performing drivers.
          </p>
        </div>
      </div>

      <div className="p-2">
        <Table
          rowKey="driver_id"
          loading={isLoading}
          columns={columns}
          dataSource={data ?? []}
          pagination={false}
          locale={{
            emptyText: (
              <Empty description="No driver rankings available" />
            ),
          }}
        />
      </div>
    </section>
  );
}