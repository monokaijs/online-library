"use client";

import { getAccountsAction } from "@/app/dashboard/manage-accounts/action";
import {
  createBorrowAction,
  updateBorrowAction,
} from "@/app/dashboard/manage-borrows/action";
import { FormAction } from "@/constants/app.constant";
import useDebounce from "@/lib/hooks/useDebounce";
import { Book, BookStatus } from "@/lib/models/book.model";
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
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import "./style.css";
import { useRouter } from "next/navigation";
import { Borrow } from "@/lib/models/borrow.model";
import { toast } from "@/lib/utils/toast";
import { getBookAction } from "@/app/dashboard/manage-books/action";
import { Option } from "antd/es/mentions";

interface BorrowFormProps {
  action: FormAction;
  detail?: any;
}

function BorrowForm(props: BorrowFormProps) {
  const { action, detail } = props;
  const {
    token: { colorPrimary },
  } = theme.useToken();

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
        library: detail?.book?.bookcase?.library?.name,
      });
    }
  }, [detail]);

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const nameDebounce = useDebounce(name);

  const [data, getUsersByName] = useFormState(getAccountsAction, {
    accounts: [],
    limit: 50,
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
  const [books, getBooksByName] = useFormState(getBookAction, {
    data: [],
    limit: 50,
    page: 1,
    totalPages: 0,
    totalDocs: 0,
  });

  useEffect(() => {
    getBooksByName({
      ...data,
      filter: {
        name: bookDebounce,
        status: BookStatus.AVAILABLE,
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
    if (createState.success) {
      router.back();
    }
  }, [createState]);

  const [updateState, updateAction] = useFormState(updateBorrowAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    toast(updateState);
    if (updateState.success) {
      router.back();
    }
  }, [updateState]);

  const onFinish = (values: any) => {
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

  return (
    <Card style={{ maxWidth: 714, margin: "0 auto" }}>
      <Form
        onFinish={onFinish}
        form={form}
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
              <Option value={JSON.stringify(detail.user)}>
                {detail.user.fullName}
              </Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item
          label={
            <Typography.Text style={{ color: colorPrimary }}>
              Số điện thoại
            </Typography.Text>
          }
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          name={"phoneNumber"}
        >
          <Input placeholder="Số điện thoại" allowClear />
        </Form.Item>
        <Form.Item
          label={
            <Typography.Text style={{ color: colorPrimary }}>
              Email
            </Typography.Text>
          }
          rules={[{ required: true, message: "Vui lòng nhập email" }]}
          name={"email"}
        >
          <Input placeholder="Email" allowClear />
        </Form.Item>
        <Form.Item
          label={
            <Typography.Text style={{ color: colorPrimary }}>
              Địa chỉ
            </Typography.Text>
          }
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
          name={"address"}
        >
          <Input.TextArea placeholder={"Địa chỉ người nhận"} />
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
          {action === FormAction.CREATE ? (
            <Select
              showSearch
              className={"w-full"}
              placeholder={"Chọn sách mượn"}
              onSearch={(e) => {
                setBookName(e);
                setBookLoading(true);
              }}
              onChange={(e) => {
                const book: Book = JSON.parse(e);
                form.setFieldValue("library", book?.bookcase?.library?.name);
              }}
              loading={bookLoading}
              filterOption={(input, option: any) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {books.data.map((book: Book) => (
                <Select.Option
                  label={book.name}
                  key={book._id}
                  value={JSON.stringify(book)}
                >
                  {book.name}
                </Select.Option>
              ))}
            </Select>
          ) : (
            <Select disabled>
              <Option value={JSON.stringify(detail.book)}>
                {detail?.book?.name}
              </Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item
          label={
            <Typography.Text style={{ color: colorPrimary }}>
              Thư viện
            </Typography.Text>
          }
          name={"library"}
        >
          <Input
            placeholder="Thư viện"
            disabled={action === FormAction.UPDATE}
          />
        </Form.Item>
        <Row gutter={18}>
          <Col xs={24} lg={12}>
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
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12} className="return-date">
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
            <Button type={"primary"} htmlType="submit">
              {FormAction.CREATE === action ? " Thêm" : "Cập nhật"}
            </Button>
          </div>
        </div>
      </Form>
    </Card>
  );
}

export default BorrowForm;
