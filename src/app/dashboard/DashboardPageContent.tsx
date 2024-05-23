"use client";
import { getDashboard } from "@/app/dashboard/action";
import StatisticCard from "@/app/dashboard/components/StatisticCard";
import { useDidMountEffect } from "@/lib/hooks/useDidMountEffect";
import { Card, Col, DatePicker, Row, Select, Tabs } from "antd";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";

export default function DashboardPageContent() {
  const placeholder: any = {
    date: "ngày",
    month: "tháng",
    year: "năm",
  };

  const formater: any = {
    date: "DD/MM/YYYY",
    month: "MM/YYYY",
    year: "YYYY",
  };

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [{ data }, getData] = useFormState(getDashboard, {} as any);

  const type = searchParams.get("type");
  const typeValid = type == "date" || type == "month" || type == "year";
  const [picker, setPicker] = useState<any>(typeValid ? type : "month");

  const date = dayjs(
    searchParams.get("picker"),
    formater[picker]?.replace(/\//g, "")
  );
  const [currentDate, setCurrentDate] = useState<any>(
    date.isValid() ? date : dayjs()
  );

  const createQueryString = useCallback(
    (paramsToUpdate: any) => {
      const updatedParams = new URLSearchParams(searchParams.toString());
      Object.entries(paramsToUpdate).forEach(([key, value]: any) => {
        if (value === null || value === undefined || value === "") {
          updatedParams.delete(key);
        } else {
          updatedParams.set(key, value);
        }
      });

      router.push(pathname + "?" + updatedParams.toString());
    },
    [searchParams, pathname]
  );
  useDidMountEffect(() => {
    setCurrentDate(dayjs());
  }, [picker]);

  useDidMountEffect(() => {
    createQueryString({
      type: picker,
      picker: dayjs(currentDate).format(formater[picker]).replace(/\//g, ""),
    });
  }, [currentDate]);

  useEffect(() => {
    getData({
      picker: searchParams.get("picker"),
      type: searchParams.get("type"),
    });
  }, [searchParams, pathname]);

  console.log(data);

  return (
    <>
      <div className="flex items-center gap-8 mb-6">
        <Select
          style={{ minWidth: 120 }}
          onChange={(e) => {
            setPicker(e);
          }}
          defaultValue={picker}
        >
          <Select.Option value="date">Theo ngày</Select.Option>
          <Select.Option value="month">Theo tháng</Select.Option>
          <Select.Option value="year">Theo năm</Select.Option>
        </Select>
        <DatePicker
          picker={picker}
          value={currentDate}
          placeholder={`Chọn ${placeholder[picker] ?? "thời gian"}`}
          format={formater[picker] ?? "MM/YYYY"}
          onChange={(e) => {
            setCurrentDate(e);
          }}
          disabledDate={(current) => {
            return dayjs().diff(current) < 0;
          }}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
          gap: 20,
        }}
      >
        <StatisticCard
          data={data?.accounts}
          title={"Tổng số người dùng"}
          hint={"Tổng số người dùng mới"}
          diffUnit={"bạn đọc"}
        />
        <StatisticCard
          data={data?.books}
          title={"Tổng số sách"}
          hint={"Tổng số sách mới"}
          diffUnit={"quyển"}
        />
        <StatisticCard
          data={data?.borrows}
          title={"Tổng số lượt mượn"}
          hint={"Tổng số lượt mượn mới"}
          diffUnit={"lượt"}
        />
        <StatisticCard
          data={data?.overdue}
          title={"Số sách mượn quá hạn"}
          hint={"Tổng số mượn quá"}
          diffUnit={"lượt"}
          positive={false}
        />
        <StatisticCard
          data={[]}
          title={"Tổng phí phạt"}
          hint={"Tổng phí phạt"}
          diffUnit={""}
        />
      </div>
      <Row style={{ marginTop: 20 }}>
        <Col span={24}>
          <Card bodyStyle={{ padding: 0 }}>
            <Tabs
              tabBarStyle={{ padding: "0px 20px", paddingTop: 10 }}
              items={[
                {
                  key: "reader",
                  label: "Bạn đọc",
                  children: "something",
                },
                {
                  key: "borrow",
                  label: "Lượt mượn",
                  children: "something else",
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}
