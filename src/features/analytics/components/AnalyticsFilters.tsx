"use client";

import { DatePicker, Space } from "antd";
import dayjs, { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

interface AnalyticsFiltersProps {
  startDate: string;
  endDate: string;
  onChange: (
    startDate: string,
    endDate: string,
  ) => void;
}

export default function AnalyticsFilters({
  startDate,
  endDate,
  onChange,
}: AnalyticsFiltersProps) {
  const handleChange = (
    dates: [Dayjs | null, Dayjs | null] | null,
  ) => {
    if (!dates || !dates[0] || !dates[1]) {
      return;
    }

    onChange(
      dates[0].format("YYYY-MM-DD"),
      dates[1].format("YYYY-MM-DD"),
    );
  };

  return (
    <Space
      style={{
        marginBottom: 24,
      }}
    >
      <RangePicker
        value={[
          dayjs(startDate),
          dayjs(endDate),
        ]}
        onChange={(dates) =>
          handleChange(
            dates as [Dayjs | null, Dayjs | null] | null,
          )
        }
        allowClear={false}
      />
    </Space>
  );
}