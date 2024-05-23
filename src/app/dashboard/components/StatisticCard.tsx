"use client";
import { Button, Card, Tooltip, Typography } from "antd";
import { formatNumberWithCommas } from "@/lib/utils/number";
import {
  CaretDownFilled,
  CaretUpFilled,
  InfoCircleOutlined,
  InfoOutlined,
} from "@ant-design/icons";

interface Time {
  year?: number;
  month?: number;
  day?: number;
}

interface Count {
  _id?: Time;
  count?: number;
  picker?: Time;
}

interface StatisticCardProps {
  hint?: string;
  title?: string;
  diffUnit?: string;
  data?: Count[];
  positive?: boolean,
}

export default function StatisticCard(props: StatisticCardProps) {
  const { hint, title, diffUnit, data, positive = true } = props;
  const currentRange = data?.find((item) => {
    if (item._id?.day && item._id.day !== item.picker?.day) {
      return false;
    }
    if (item._id?.month && item._id.month !== item.picker?.month) {
      return false;
    }
    if (item._id?.year && item._id.year !== item.picker?.year) {
      return false;
    }

    return true;
  });

  const index =
    data?.findIndex((item) => {
      if (item._id?.day && item._id.day !== item.picker?.day) {
        return false;
      }
      if (item._id?.month && item._id.month !== item.picker?.month) {
        return false;
      }
      if (item._id?.year && item._id.year !== item.picker?.year) {
        return false;
      }

      return true;
    }) ?? 0;

  const amount = currentRange?.count ?? 0;
  const compareAt =
    index !== -1
      ? data?.[index - 1]
      : data?.reverse()?.find((item) => {
          if (
            item._id?.year &&
            item.picker?.year &&
            item._id.year > item.picker?.year
          ) {
            return false;
          }
          if (
            item._id?.month &&
            item.picker?.month &&
            item._id.month > item.picker?.month
          ) {
            return false;
          }
          if (
            item._id?.day &&
            item.picker?.day &&
            item._id.day > item.picker?.day
          ) {
            return false;
          }

          return true;
        });

  const diff = amount - (compareAt?.count ?? 0);

  return (
    <Card bodyStyle={{ padding: 16 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center",
          marginBottom: 16,
          gap: 16
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
            {formatNumberWithCommas(amount)}
          </Typography.Title>
          <Typography.Title style={{ margin: 0, fontSize: 14, marginBottom: 4 }}>
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
              <div>{Math.abs(diff)}</div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
