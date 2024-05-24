"use client";
import { getDashboard } from "@/app/dashboard/action";
import StatisticCard from "@/app/dashboard/components/StatisticCard";
import { SessionContext } from "@/components/shared/SessionContext";
import { useDidMountEffect } from "@/lib/hooks/useDidMountEffect";
import { RoleEnum } from "@/lib/models/account.model";
import { Card, DatePicker, Select, Typography } from "antd";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { getBorrowAction } from "./borrows/action";
import { Borrow, BorrowStatus } from "@/lib/models/borrow.model";
import { getDaysDiff } from "@/lib/utils/getDaysDiff";

export default function DashboardPageContent() {
  const { account } = useContext(SessionContext);
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
  const [{ data }, getData] = useFormState(getDashboard, {
    data: {
      topDonate: [],
      topBorrow: [],
    },
  } as any);

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

  const [borrowings, getBorrowing] = useFormState(getBorrowAction, {
    data: [],
    limit: Number(searchParams.get("limit") ?? 20),
    page: Number(searchParams.get("page") ?? 1),
    totalPages: 0,
    totalDocs: 0,
  });

  const loadData = () => {
    getBorrowing({
      limit: 9999,
      page: 1,
      filter: {
        status: BorrowStatus.BORROWING,
      },
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="h-full flex flex-col overflow-hidden gap-12">
      {account?.role !== RoleEnum.USER && (
        <div>
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
              data={data?.fines}
              title={"Tổng phí phạt"}
              hint={"Tổng phí phạt"}
              currency={true}
              diffUnit={""}
            />
          </div>
        </div>
      )}
      {account?.role === RoleEnum.USER && borrowings?.data.length > 0 && (
        <div>
          <Card>
            <Typography.Title level={4}>Sách đang mượn</Typography.Title>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                gap: 20,
              }}
            >
              {borrowings?.data?.map((item: Borrow) => {
                const diff = getDaysDiff(item.returnDate);
                return (
                  <div
                    style={{
                      border: "1px solid #DFDFDF",
                      borderRadius: 8,
                      padding: 16,
                      display: "flex",
                      gap: 16,
                    }}
                    key={item._id}
                  >
                    <img
                      style={{ height: 100, width: 80, objectFit: "cover" }}
                      src={
                        !!item.book?.picture
                          ? item.book?.picture
                          : "/images/default-book.png"
                      }
                      alt={item.book?.name}
                    />
                    <div className="flex flex-col justify-between">
                      <div>
                        <Typography.Text strong>
                          {item.book?.name}
                        </Typography.Text>
                        <div>{item.book?.authorName}</div>
                      </div>
                      <div style={{ color: diff < 0 ? "red" : "black" }}>
                        {diff < 0 ? "Quá hạn" : "Còn"} {Math.abs(diff)} ngày
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 24,
          overflow: "hidden",
        }}
      >
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            flex: 1,
            height: "100%",
          }}
          bodyStyle={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Typography.Title className="mb-4" level={4}>
            Người ủng hộ hàng đầu
          </Typography.Title>
          <div
            style={{
              border: "1px solid #DFDFDF",
              flex: 1,
              borderRadius: 8,
              overflow: "auto",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(10, 1fr)",
              }}
            >
              <div
                style={{
                  gridColumn: "span 1 / span 1",
                  borderBottom: "1px solid #DFDFDF",
                  padding: "12px 0",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                STT
              </div>
              <div
                style={{
                  gridColumn: "span 3 / span 3",
                  borderBottom: "1px solid #DFDFDF",
                  padding: "12px 0",
                  fontWeight: 600,
                  paddingLeft: 16,
                }}
              >
                Họ và tên
              </div>
              <div
                style={{
                  gridColumn: "span 2 / span 2",
                  borderBottom: "1px solid #DFDFDF",
                  padding: "12px 0",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                Điện thoại
              </div>
              <div
                style={{
                  gridColumn: "span 2 / span 2",
                  borderBottom: "1px solid #DFDFDF",
                  padding: "12px 0",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                Mã
              </div>
              <div
                style={{
                  gridColumn: "span 2 / span 2",
                  borderBottom: "1px solid #DFDFDF",
                  padding: "12px 0",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                Số sách
              </div>
            </div>
            {data?.topDonate?.map((item: any, index: number) => {
              const giver: Account | undefined = item?.giver;
              const count: number | undefined = item?.count;
              return (
                <div
                  key={index}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(10, 1fr)",
                  }}
                >
                  <div
                    style={{
                      gridColumn: "span 1 / span 1",
                      borderBottom: "1px solid #DFDFDF",
                      padding: "12px 0",
                      textAlign: "center",
                    }}
                  >
                    {index + 1}
                  </div>
                  <div
                    style={{
                      gridColumn: "span 3 / span 3",
                      borderBottom: "1px solid #DFDFDF",
                      padding: "12px 0",
                      paddingLeft: 16,
                    }}
                  >
                    {giver?.fullName}
                  </div>
                  <div
                    style={{
                      gridColumn: "span 2 / span 2",
                      borderBottom: "1px solid #DFDFDF",
                      padding: "12px 0",
                      textAlign: "center",
                    }}
                  >
                    xxxx{giver?.phoneNumber?.slice(-4)}
                  </div>
                  <div
                    style={{
                      gridColumn: "span 2 / span 2",
                      borderBottom: "1px solid #DFDFDF",
                      padding: "12px 0",
                      textAlign: "center",
                    }}
                  >
                    {giver?.userId ?? "-"}
                  </div>
                  <div
                    style={{
                      gridColumn: "span 2 / span 2",
                      borderBottom: "1px solid #DFDFDF",
                      padding: "12px 0",
                      textAlign: "center",
                    }}
                  >
                    {count}
                  </div>
                </div>
              );
            })}

            {data?.topDonate?.length === 0 && (
              <Typography.Title
                level={5}
                type="secondary"
                style={{
                  textAlign: "center",
                  padding: "50px 0",
                  fontWeight: 400,
                }}
              >
                Không có dữ liệu.
              </Typography.Title>
            )}
          </div>
        </Card>
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            flex: 1,
            height: "100%",
          }}
          bodyStyle={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Typography.Title className="mb-4" level={4}>
            Người mượn sách hàng đầu
          </Typography.Title>
          <div
            style={{
              border: "1px solid #DFDFDF",
              flex: 1,
              borderRadius: 8,
              overflow: "auto",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(10, 1fr)",
              }}
            >
              <div
                style={{
                  gridColumn: "span 1 / span 1",
                  borderBottom: "1px solid #DFDFDF",
                  padding: "12px 0",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                STT
              </div>
              <div
                style={{
                  gridColumn: "span 3 / span 3",
                  borderBottom: "1px solid #DFDFDF",
                  padding: "12px 0",
                  fontWeight: 600,
                  paddingLeft: 16,
                }}
              >
                Họ và tên
              </div>
              <div
                style={{
                  gridColumn: "span 2 / span 2",
                  borderBottom: "1px solid #DFDFDF",
                  padding: "12px 0",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                Điện thoại
              </div>
              <div
                style={{
                  gridColumn: "span 2 / span 2",
                  borderBottom: "1px solid #DFDFDF",
                  padding: "12px 0",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                Mã
              </div>
              <div
                style={{
                  gridColumn: "span 2 / span 2",
                  borderBottom: "1px solid #DFDFDF",
                  padding: "12px 0",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                Số sách
              </div>
            </div>
            {data?.topBorrow?.map((item: any, index: number) => {
              const user: Account | undefined = item?.user;
              const count: number | undefined = item?.borrowCount;
              return (
                <div
                  key={index}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(10, 1fr)",
                  }}
                >
                  <div
                    style={{
                      gridColumn: "span 1 / span 1",
                      borderBottom: "1px solid #DFDFDF",
                      padding: "12px 0",
                      textAlign: "center",
                    }}
                  >
                    {index + 1}
                  </div>
                  <div
                    style={{
                      gridColumn: "span 3 / span 3",
                      borderBottom: "1px solid #DFDFDF",
                      padding: "12px 0",
                      paddingLeft: 16,
                    }}
                  >
                    {user?.fullName}
                  </div>
                  <div
                    style={{
                      gridColumn: "span 2 / span 2",
                      borderBottom: "1px solid #DFDFDF",
                      padding: "12px 0",
                      textAlign: "center",
                    }}
                  >
                    xxxx{user?.phoneNumber?.slice(-4)}
                  </div>
                  <div
                    style={{
                      gridColumn: "span 2 / span 2",
                      borderBottom: "1px solid #DFDFDF",
                      padding: "12px 0",
                      textAlign: "center",
                    }}
                  >
                    {user?.userId ?? "-"}
                  </div>
                  <div
                    style={{
                      gridColumn: "span 2 / span 2",
                      borderBottom: "1px solid #DFDFDF",
                      padding: "12px 0",
                      textAlign: "center",
                    }}
                  >
                    {count}
                  </div>
                </div>
              );
            })}
            {data?.topBorrow?.length === 0 && (
              <Typography.Title
                level={5}
                type="secondary"
                style={{
                  textAlign: "center",
                  padding: "50px 0",
                  fontWeight: 400,
                }}
              >
                Không có dữ liệu.
              </Typography.Title>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
