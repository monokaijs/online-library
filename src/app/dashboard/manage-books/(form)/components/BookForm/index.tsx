"use client";
import {
  createBookAction,
  getImagesAction,
  getLibraryAction,
  updateBookAction,
} from "@/app/dashboard/manage-books/action";
import { FormAction } from "@/constants/app.constant";
import useDebounce from "@/lib/hooks/useDebounce";
import { Bookcase } from "@/lib/models/bookcase.model";
import { toast } from "@/lib/utils/toast";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  Row,
  Select,
  Typography,
  theme,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
interface FormProps {
  action: FormAction;
  data?: any;
}

function BookForm(props: FormProps) {
  const router = useRouter();
  const [formLoading, setFormLoading] = useState(false);

  const { action, data } = props;
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const [form] = Form.useForm();
  const [libraryActive, setLibrary] = useState("");
  const [imageSelected, setImage] = useState("");
  const [bookName, setBookName] = useState("");
  const bookNameDebounce = useDebounce(bookName);

  const [app, getLibrary] = useFormState(getLibraryAction, {
    success: false,
    message: "",
  });

  const [images, getImages] = useFormState(getImagesAction, {
    success: false,
    message: "",
  });

  const isCustomImage = !images?.data?.includes(imageSelected) && imageSelected;

  useEffect(() => {
    getLibrary();
  }, []);

  useEffect(() => {
    getImages(bookName);
  }, [bookNameDebounce]);

  const [createState, createBook] = useFormState(createBookAction, {
    success: false,
    message: "",
  });

  const [updateState, updateAction] = useFormState(updateBookAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    setFormLoading(false);
    toast(createState);
    if (createState.success) {
      router.back();
    }
  }, [createState]);

  useEffect(() => {
    setFormLoading(false);
    toast(updateState);
    if (updateState.success) {
      router.back();
    }
  }, [updateState]);

  useEffect(() => {
    form.setFieldValue("borrowingDateLimit", 35);
    if (data) {
      form.setFieldsValue(data);
      form.setFieldValue("library", data?.bookcase?.library?._id);
      setLibrary(data?.bookcase?.library?._id);
      form.setFieldValue("bookcase", JSON.stringify(data?.bookcase));
      setImage(data.picture);
    }
  }, [data]);

  const onFinish = (values: any) => {
    setFormLoading(true);
    values.bookcase = JSON.parse(values?.bookcase)?._id;
    if (action === FormAction.CREATE) {
      createBook(values);
    } else {
      values._id = data._id;
      updateAction(values);
    }
  };

  return (
    <Card>
      <Typography.Title level={4} className="mb-8">
        {action == FormAction.UPDATE ? "Cập nhật" : "Thêm mới"} sách
      </Typography.Title>
      <Form
        form={form}
        labelCol={{ flex: "120px" }}
        labelAlign="left"
        labelWrap
        className={"form-item-label-no-colon"}
        onFinish={onFinish}
        disabled={formLoading}
      >
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item
              rules={[
                { required: true, message: "Vui lòng nhập tên sách" },
                {
                  max: 150,
                  message: "Tên sách tối đa 150 kí tự",
                },
              ]}
              name="name"
              label={
                <Typography.Text style={{ color: colorPrimary }}>
                  Tên sách
                </Typography.Text>
              }
            >
              <Input
                onChange={(e) => {
                  setBookName(e.target.value);
                  setImage("");
                  form.setFieldValue("picture", "");
                }}
                placeholder={"Nhập tên sách"}
              />
            </Form.Item>
            <Form.Item
              rules={[
                { required: true, message: "Vui lòng nhập tên tác giả" },
                {
                  max: 150,
                  message: "Tên sách tối đa 150 kí tự",
                },
              ]}
              name="authorName"
              label={
                <Typography.Text style={{ color: colorPrimary }}>
                  Tên tác giả
                </Typography.Text>
              }
            >
              <Input allowClear placeholder={"Nhập tên tác giả"} />
            </Form.Item>
            <Form.Item
              rules={[
                { required: true, message: "Vui lòng nhập mã sách" },
                {
                  max: 50,
                  message: "Tên sách tối đa 50 kí tự",
                },
              ]}
              name="bookID"
              label={
                <Typography.Text style={{ color: colorPrimary }}>
                  Mã sách
                </Typography.Text>
              }
            >
              <Input allowClear placeholder={"Nhập mã sách"} />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số ngày mượn tối đa",
                },
              ]}
              name="borrowingDateLimit"
              label={
                <Typography.Text style={{ color: colorPrimary }}>
                  Hạn mức
                </Typography.Text>
              }
            >
              <Input allowClear placeholder={"Nhập số ngày mượn tối đa"} type="number" />
            </Form.Item>
            <Form.Item
              name="isbn"
              label={
                <Typography.Text style={{ color: colorPrimary }}>
                  ISBN
                </Typography.Text>
              }
            >
              <Input allowClear placeholder={"Nhập ISBN"} />
            </Form.Item>
            <Form.Item
              name="language"
              label={
                <Typography.Text style={{ color: colorPrimary }}>
                  Ngôn ngữ
                </Typography.Text>
              }
            >
              <Input allowClear placeholder={"Nhập ngôn ngữ"} />
            </Form.Item>
            <Form.Item
              name="publisher"
              label={
                <Typography.Text style={{ color: colorPrimary }}>
                  Nhà xuất bản
                </Typography.Text>
              }
            >
              <Input allowClear placeholder={"Nhập nhà xuất bản"} />
            </Form.Item>
            <Form.Item
              name="publishYear"
              label={
                <Typography.Text style={{ color: colorPrimary }}>
                  Năm xuất bản
                </Typography.Text>
              }
            >
              <Input allowClear placeholder={"Nhập năm xuất bản"} type="number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="library"
                  rules={[
                    { required: true, message: "Vui lòng chọn thư viện" },
                  ]}
                  label={
                    <Typography.Text style={{ color: colorPrimary }}>
                      Thư viện
                    </Typography.Text>
                  }
                >
                  <Select
                    onChange={(e) => {
                      setLibrary(e);
                      form.setFieldValue("bookcase", undefined);
                    }}
                  >
                    {app?.data?.libaries.map((item: any) => (
                      <Select.Option value={item._id} key={item._id}>
                        {item?.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  // rules={[{ required: true, message: "Vui lòng chọn kệ sách" }]}
                  name="bookcase"
                  label={
                    <Typography.Text style={{ color: colorPrimary }}>
                      Kệ sách
                    </Typography.Text>
                  }
                >
                  <Select
                    onChange={(e) => {
                      const bookcase: Bookcase = JSON.parse(e);
                      form.setFieldValue("category", bookcase?.category);
                    }}
                  >
                    {app?.data?.bookcases.map(
                      (item: any) =>
                        item?.library?._id == libraryActive && (
                          <Select.Option
                            value={JSON.stringify(item)}
                            key={item._id}
                          >
                            {item?.position}
                            {/* ({item?.category}) */}
                          </Select.Option>
                        )
                    )}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="category"
              label={
                <Typography.Text style={{ color: colorPrimary }}>
                  Thể loại
                </Typography.Text>
              }
            >
              <Input allowClear placeholder={"Nhập thể loại"} />
            </Form.Item>
            <Form.Item
              name="description"
              label={
                <Typography.Text style={{ color: colorPrimary }}>
                  Ghi chú
                </Typography.Text>
              }
            >
              <TextArea
                style={{ minHeight: 88 }}
                placeholder={"Nhập ghi chú"}
              />
            </Form.Item>
            <Form.Item
              name="picture"
              label={
                <Typography.Text style={{ color: colorPrimary }}>
                  Hình ảnh
                </Typography.Text>
              }
            >
              <Input
                onChange={(e) => {
                  setImage(e.target.value);
                }}
                placeholder={"Nhập đường dẫn hình ảnh"}
              />
            </Form.Item>
            <Form.Item
              name="picture"
              label={
                <Typography.Text style={{ color: colorPrimary }}>
                  Chọn ảnh
                </Typography.Text>
              }
            >
              {(images?.data && images?.data?.length > 0) || imageSelected ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
                  }}
                >
                  {isCustomImage && (
                    <div
                      style={{
                        cursor: "pointer",
                        border: "1px solid " + colorPrimary,
                        padding: 4,
                      }}
                      onClick={() => {
                        form.setFieldValue("picture", imageSelected);
                        setImage(imageSelected);
                      }}
                    >
                      <Image
                        style={{
                          width: "100%",
                          aspectRatio: "3/4",
                          objectFit: "cover",
                        }}
                        preview={false}
                        src={imageSelected}
                      />
                    </div>
                  )}
                  {images?.data
                    ?.slice(0, isCustomImage ? 5 : 6)
                    ?.map((item) => (
                      <div
                        key={item}
                        style={{
                          cursor: "pointer",
                          border: "1px solid",
                          borderColor:
                            item === imageSelected
                              ? colorPrimary
                              : "transparent",
                          padding: 4,
                        }}
                        onClick={() => {
                          form.setFieldValue("picture", item);
                          setImage(item);
                        }}
                      >
                        <Image
                          style={{
                            width: "100%",
                            aspectRatio: "3/4",
                            objectFit: "cover",
                          }}
                          preview={false}
                          src={item}
                        />
                      </div>
                    ))}
                </div>
              ) : (
                <Typography.Text type="secondary">
                  Nhập tên sách để chọn ảnh nhanh
                </Typography.Text>
              )}
            </Form.Item>
          </Col>
        </Row>
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

export default BookForm;
