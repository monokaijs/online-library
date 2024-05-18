"use client";
import { useDisclosure } from "@/lib/hooks/useDisclosure";
import { formatNumberWithCommas } from "@/lib/utils/number";
import {
  CaretDownFilled,
  CaretUpFilled,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Button, Card, Modal, Tooltip, Typography } from "antd";
import type { ECharts, EChartsOption, SetOptionOpts } from "echarts";
import { getInstanceByDom, init } from "echarts";
import { useEffect, useRef, type CSSProperties } from "react";

export interface ReactEChartsProps {
  option: EChartsOption;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: "light" | "dark";
}

export function ReactECharts({
  option,
  style,
  settings,
  loading,
  theme,
}: ReactEChartsProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chart
    let chart: ECharts | undefined;
    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme);
    }

    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX
    function resizeChart() {
      chart?.resize();
    }
    window.addEventListener("resize", resizeChart);

    // Return cleanup function
    return () => {
      chart?.dispose();
      window.removeEventListener("resize", resizeChart);
    };
  }, [theme]);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart: any = getInstanceByDom(chartRef.current);
      chart.setOption(option, settings);
    }
  }, [option, settings, theme]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart: any = getInstanceByDom(chartRef.current);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      loading === true ? chart.showLoading() : chart.hideLoading();
    }
  }, [loading, theme]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "500px", ...style }} />
  );
}

interface Time {
  year?: number;
  month?: number;
  day?: number;
}

interface Count {
  _id?: Time;
  count?: number;
  selected?: boolean;
  label: string;
}

interface StatisticCardProps {
  hint?: string;
  title?: string;
  diffUnit?: string;
  data?: Count[];
  positive?: boolean;
  type?: string;
  currency?: boolean;
}

export default function StatisticCard(props: StatisticCardProps) {
  const {
    hint,
    title,
    diffUnit,
    data,
    positive = true,
    currency = false,
  } = props;

  const selectedIndex = data?.findIndex((item) => item.selected) ?? -1;
  const amount = data?.[selectedIndex]?.count ?? 0;
  const diff = amount - (data?.[selectedIndex - 1]?.count ?? 0);

  const modal = useDisclosure();

  const option: ReactEChartsProps["option"] = {
    xAxis: {
      type: "category",
      data: data?.map((item) => item.label),
    },
    yAxis: {
      type: "value",
      tooltip: {
        show: true,
      },
    },
    series: [
      {
        data: data?.map((item) => item.count),
        type: "line",
        smooth: true,
      },
    ],
  };

  return (
    <div className="info-chart">
      <Card
        bodyStyle={{ padding: 16, cursor: "pointer" }}
        onClick={modal.onOpen}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "center",
            marginBottom: 16,
            gap: 16,
          }}
        >
          <Typography.Text style={{ opacity: 0.45, flex: 1 }} ellipsis>
            {props.title}
          </Typography.Text>
          {props.hint && (
            <Tooltip title={props.hint}>
              <Button
                icon={<InfoCircleOutlined />}
                shape={"circle"}
                type={"link"}
                size={"small"}
              />
            </Tooltip>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <div className="flex w-full items-end" style={{ flex: 1, gap: 8 }}>
            <Typography.Title style={{ margin: 0, fontSize: 30 }}>
              {currency
                ? amount
                    ?.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })
                    ?.replace("VND", "đ")
                : formatNumberWithCommas(amount)}
            </Typography.Title>
            <Typography.Title
              style={{ margin: 0, fontSize: 14, marginBottom: 4 }}
            >
              {diffUnit}
            </Typography.Title>
          </div>
          {diff && (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                  color: diff > 0 && positive ? "#48E474" : "#E44848",
                }}
              >
                {diff > 0 ? <CaretUpFilled /> : <CaretDownFilled />}
                <div>
                  {currency
                    ? diff
                        ?.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })
                        ?.replace("VND", "đ")
                    : Math.abs(diff)}
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
      <Modal
        className="statistic"
        title={<div className="px-8 pt-8">{title}</div>}
        centered
        open={modal.isOpen}
        onCancel={modal.onClose}
        closable={false}
        footer={false}
        style={{
          top: 0,
        }}
        styles={{
          body: {
            width: 850,
          },
          content: {
            width: 850,
            height: 550,
            padding: 0,
          },
        }}
      >
        <ReactECharts option={option} />
      </Modal>
    </div>
  );
}
