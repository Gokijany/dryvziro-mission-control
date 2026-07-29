"use client";

import { Card, Empty, Spin } from "antd";
import { Line } from "@ant-design/charts";

import { useFuelEfficiencyTrend } from "../hooks/useAnalytics";

interface FuelEfficiencyChartProps {
  startDate: string;
  endDate: string;
}

export default function FuelEfficiencyChart({
  startDate,
  endDate,
}: FuelEfficiencyChartProps) {
  const {
    data,
    isLoading,
    isError,
  } = useFuelEfficiencyTrend(
    startDate,
    endDate
  );

  if (isLoading) {
    return (
      <Card title="Fuel Efficiency Trend">
        <Spin />
      </Card>
    );
  }

  if (isError) {
    return (
      <Card title="Fuel Efficiency Trend">
        <Empty description="Failed to load chart." />
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card title="Fuel Efficiency Trend">
        <Empty description="No fuel efficiency data available." />
      </Card>
    );
  }

  const config = {
    data,

    xField: "date",

    yField: "average_efficiency",

    smooth: true,

    point: {
      size: 5,
      shape: "circle",
    },

    tooltip: {
      items: [
        {
          channel: "y",
          name: "Efficiency",
          valueFormatter: (value: number) =>
            value.toFixed(3),
        },
      ],
    },

    xAxis: {
      title: {
        text: "Date",
      },
    },

    yAxis: {
      title: {
        text: "Efficiency Score",
      },
      min: 0,
      max: 1,
    },
  };

  return (
    <Card title="Fuel Efficiency Trend">
      <Line {...config} />
    </Card>
  );
}