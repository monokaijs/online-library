"use client";

import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Popconfirm, Table, theme } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Book, makeData } from "./makeData";
import { useRouter } from "next/navigation";
const EditableContext = React.createContext<any>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<any>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

const App: React.FC = () => {
  const [dataSource, setDataSource] = useState<Book[]>(makeData(5));
  const { token } = theme.useToken();
  const router = useRouter();

  const [count, setCount] = useState(2);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.sku !== key);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "Tên sách",
      dataIndex: "name",
      editable: true,
    },
    {
      title: "Tác giả",
      dataIndex: "authorName",
      editable: true,
    },
    {
      title: "ID",
      dataIndex: "isbn",
      align: "center",
      editable: true,
    },
    {
      title: "Hạn mức",
      dataIndex: "borrowingDateLimit",
      align: "center",
      editable: true,
    },
    {
      title: "Thư viện",
      dataIndex: "library",
      align: "center",
      editable: true,
    },
    {
      title: "Tình trạng sách",
      dataIndex: "status",
      align: "center",
      editable: true,
    },
    {
      title: "Ngày mượn",
      editable: true,
      align: "center",
      dataIndex: "",
    },
    {
      title: "Ngày hẹn",
      dataIndex: "",
      align: "center",
      editable: true,
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      align: "center",
      render: (_: any, record: any) => {
        console.log(record);

        return (
          <div
            className={"flex justify-center"}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Button
              disabled={true}
              onClick={() => {}}
              type={"text"}
              shape={"circle"}
              icon={<EyeOutlined />}
              // style={{ color: token.colorPrimary }}
            />
            <Button
              onClick={() => {
                router.push(
                  `/dashboard/manage-bookcases/update/${record?._id}`
                );
              }}
              type={"text"}
              shape={"circle"}
              icon={<EditOutlined style={{ color: token.colorPrimary }} />}
            />
            <Popconfirm
              title={`Bạn muốn xóa ${record.name}?`}
              onConfirm={() => handleDelete(record.sku)}
              cancelText="Hủy"
              okText="Xóa"
            >
              <Button
                type={"text"}
                danger
                shape={"circle"}
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const handleAdd = () => {
    const newData: any = {
      key: count,
      name: `Edward King ${count}`,
      age: "32",
      address: `London, Park Lane no. ${count}`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: Book) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.isbn === item.isbn);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Book) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};

export default App;
