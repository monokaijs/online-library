"use client";

import { getAccountsAction } from "@/app/dashboard/manage-accounts/action";
import { getBookAction } from "@/app/dashboard/manage-books/action";
import {
  createBorrowAction,
  updateBorrowAction,
} from "@/app/dashboard/manage-borrows/action";
import { getLibraryAction } from "@/app/dashboard/manage-locations/action";
import { FormAction } from "@/constants/app.constant";
import useDebounce from "@/lib/hooks/useDebounce";
import { Book, BookStatus } from "@/lib/models/book.model";
import { Location } from "@/lib/models/library.model";
import { toast } from "@/lib/utils/toast";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Typography,
  theme,
} from "antd";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import "./style.css";

interface BorrowFormProps {
  action: FormAction;
  detail?: any;
}

function BorrowForm(props: BorrowFormProps) {
  const { action, detail } = props;
  const searchParams = useSearchParams();
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const [formLoading, setFormLoading] = useState(false);
  const [dateLimit, setDateLimit] = useState(35);
  const router = useRouter();
  const [form] = Form.useForm();

  useEffect(() => {
    if (detail) {
      form.setFieldsValue({
        ...detail,
        borrowDate: dayjs(detail.borrowDate),
        returnDate: dayjs(detail.returnDate),
        user: JSON.stringify(detail.user),
        book: JSON.stringify(detail.book),
        library: detail?.library,
      });
      setDateLimit(detail?.borrowingDateLimit ?? 35);
    }
  }, [detail]);

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const nameDebounce = useDebounce(name);

  const [data, getUsersByName] = useFormState(getAccountsAction, {
    accounts: [],
    limit: 20,
    page: 1,
    totalPages: 0,
    totalDocs: 0,
  });

  useEffect(() => {
    getUsersByName({ ...data, filter: { fullName: nameDebounce } });
    setLoading(false);
  }, [nameDebounce]);

  const [bookName, setBookName] = useState("");
  const [bookLoading, setBookLoading] = useState(false);
  const bookDebounce = useDebounce(bookName);
  const [books, getBooks] = useFormState(getBookAction, {
    data: [],
    limit: 50,
    page: 1,
    totalPages: 0,
    totalDocs: 0,
  });

  const [libraries, getLibaries] = useFormState(getLibraryAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    getLibaries();
  }, []);

  useEffect(() => {
    getBooks({
      ...data,
      filter: {
        name: bookDebounce,
        status: action === FormAction.CREATE ? BookStatus.AVAILABLE : undefined,
        library: searchParams.get("library"),
      },
    });
    setBookLoading(false);
  }, [bookDebounce]);

  const [createState, createAction] = useFormState(createBorrowAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    toast(createState);
    if (createState?.success) {
      router.back();
    }
  }, [createState]);

  const [updateState, updateAction] = useFormState(updateBorrowAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    toast(updateState);
    if (updateState?.success) {
      router.back();
    }
  }, [updateState]);

  useEffect(() => {
    setFormLoading(false);
  }, [createState, updateState]);

  const onFinish = (values: any) => {
    setFormLoading(true);
    values.book = JSON.parse(values.book)._id;
    values.user = JSON.parse(values.user)._id;
    values.borrowDate = new Date(values.borrowDate);
    values.returnDate = new Date(values.returnDate);

    if (action === FormAction.CREATE) {
      createAction(values);
    } else {
      values._id = detail._id;
      updateAction(values);
    }
  };

  useEffect(() => {
    if (searchParams.get("book")) {
      const selected: Book | undefined = books?.data?.find(
        (item: any) => item._id === searchParams.get("book")
      );

      if (selected) {
        form.setFieldValue("book", JSON.stringify(selected));
        form.setFieldValue("library", selected?.library?._id);
        setDateLimit(selected?.borrowingDateLimit ?? 35);
      } else {
        form.setFieldValue("book", undefined);
      }
    }
  }, [books]);

  return (
    <Card style={{ maxWidth: 714, margin: "0 auto" }}>
      <Typography.Title level={4} className="mb-8">
        {action == FormAction.UPDATE ? "Cập nhật" : "Thêm mới"} phiếu mượn
      </Typography.Title>
      <Form
        onFinish={onFinish}
        form={form}
        disabled={formLoading}
        labelCol={{ flex: "200px" }}
        labelAlign="left"
        labelWrap
        className={"form-item-label-no-colon"}
      >
        <Form.Item
          label={
            <Typography.Text style={{ color: colorPrimary }}>
              Họ và tên
            </Typography.Text>
          }
          name={"user"}
          rules={[{ required: true, message: "Vui lòng chọn người mượn" }]}
        >
          {action === FormAction.CREATE ? (
            <Select
              showSearch
              className={"w-full"}
              placeholder={"Chọn người mượn"}
              onSearch={(e) => {
                setName(e);
                setLoading(true);
              }}
              loading={loading}
              filterOption={(input, option: any) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              onChange={(e) => {
                const account: Account = JSON.parse(e);
                form.setFieldValue("phoneNumber", account.phoneNumber);
                form.setFieldValue("email", account.email);
                form.setFieldValue("address", account.address);
              }}
            >
              {data.accounts.map((account: Account) => (
                <Select.Option
                  label={account.fullName}
                  key={account._id}
                  value={JSON.stringify(account)}
                >
                  {account.fullName} (xxx{account.phoneNumber?.slice(-3)})
                </Select.Option>
              ))}
            </Select>
          ) : (
            <Select disabled>
              <Select.Option value={JSON.stringify(detail.user)}>
                {detail?.user?.fullName}
              </Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item
          label={
            <Typography.Text style={{ color: colorPrimary }}>
              Số điện thoại
            </Typography.Text>
          }
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại",
              whitespace: true,
            },
            {
              min: 10,
              message: "Số điện thoại tối thiểu 10 kí tự",
            },
            {
              max: 11,
              message: "Số điện thoại tối đa 11 kí tự",
            },
            {
              pattern: /^(?:\d*)$/,
              message: "Số điện thoại không hợp lệ",
            },
          ]}
          name={"phoneNumber"}
        >
          <Input allowClear placeholder="Số điện thoại" />
        </Form.Item>
        <Form.Item
          label={
            <Typography.Text style={{ color: colorPrimary }}>
              Email
            </Typography.Text>
          }
          rules={[
            {
              required: true,
              message: "Vui lòng nhập email",
              whitespace: true,
            },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Email không hợp lệ",
            },
          ]}
          name={"email"}
        >
          <Input allowClear placeholder="Email" disabled={true} />
        </Form.Item>
        <Form.Item
          label={
            <Typography.Text style={{ color: colorPrimary }}>
              Địa chỉ
            </Typography.Text>
          }
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ",
              whitespace: true,
            },
          ]}
          name={"address"}
        >
          <Input.TextArea placeholder={"Địa chỉ người nhận"} />
        </Form.Item>
        <Form.Item
          label={
            <Typography.Text style={{ color: colorPrimary }}>
              Thư viện
            </Typography.Text>
          }
          name={"library"}
          rules={[{ required: true, message: "Vui lòng chọn thư viện" }]}
        >
          <Select
            disabled={
              action === FormAction.UPDATE || !!searchParams.get("book")
            }
            onChange={(e) => {
              getBooks({
                ...data,
                filter: {
                  name: bookDebounce,
                  status: BookStatus.AVAILABLE,
                  library: e,
                },
              });
              form.setFieldValue("book", undefined);
            }}
            placeholder="Chọn thư viện"
          >
            {libraries?.data?.map((item: Location) => {
              return (
                <Select.Option key={item._id} value={item._id}>
                  {item?.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label={
            <Typography.Text style={{ color: colorPrimary }}>
              Sách mượn
            </Typography.Text>
          }
          name={"book"}
          rules={[{ required: true, message: "Vui lòng chọn sách muốn mượn" }]}
        >
          <Select
            disabled={
              action === FormAction.UPDATE || !!searchParams.get("book")
            }
            showSearch
            className={"w-full"}
            placeholder={"Chọn sách mượn"}
            onSearch={(e) => {
              setBookName(e);
              setBookLoading(true);
            }}
            onChange={(e) => {
              const book = JSON.parse(e);
              setDateLimit(book?.borrowingDateLimit ?? 35);
            }}
            loading={bookLoading}
            filterOption={(input, option: any) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          >
            {books?.data.map((book: Book) => {
              return (
                <Select.Option
                  label={book?.name}
                  key={book?._id}
                  value={JSON.stringify(book)}
                >
                  {book?.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Row gutter={18}>
          <Col xs={24} lg={24}>
            <Form.Item
              label={
                <Typography.Text style={{ color: colorPrimary }}>
                  Ngày mượn
                </Typography.Text>
              }
              name="borrowDate"
              rules={[{ required: true, message: "Vui lòng chọn ngày mượn" }]}
              initialValue={dayjs()}
            >
              <DatePicker
                disabled={action === FormAction.UPDATE}
                format="DD/MM/YYYY"
                style={{ width: "100%" }}
                disabledDate={(current) => {
                  return dayjs().diff(current) < 0;
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={24}>
            <Form.Item
              label={
                <Typography.Text style={{ color: colorPrimary }}>
                  Ngày trả
                </Typography.Text>
              }
              name="returnDate"
              rules={[{ required: true, message: "Vui lòng chọn ngày trả" }]}
            >
              <DatePicker
                format="DD/MM/YYYY"
                name="returnDate"
                style={{ width: "100%" }}
                disabledDate={(current) => {
                  return (
                    dayjs().diff(current) > 0 ||
                    dayjs(current).diff(dayjs(), "day") > dateLimit
                  );
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label={
            <Typography.Text style={{ color: colorPrimary }}>
              Ghi chú
            </Typography.Text>
          }
          name="note"
        >
          <Input.TextArea placeholder={"Ghi chú"} />
        </Form.Item>
        <div className={"flex justify-end"}>
          <div className={"flex gap-9"}>
            <Button onClick={router.back}>Hủy bỏ</Button>
            <Button type={"primary"} htmlType="submit" loading={formLoading}>
              {FormAction.CREATE === action ? " Thêm" : "Cập nhật"}
            </Button>
          </div>
        </div>
      </Form>
    </Card>
  );
}

export default BorrowForm;
