"use client";
import {Card, Col, DatePicker, Menu, Row, Tabs} from "antd";
import StatisticCard from "@/app/dashboard/components/StatisticCard";

export default function DashboardPageContent() {
  return <>
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16
    }}>
      <Menu
        mode={'horizontal'}
        items={[{
          key: 'by-day',
          label: 'Theo ngày'
        }, {
          key: 'by-month',
          label: 'Theo tháng'
        }]}
        style={{
          background: 'transparent',
          borderBottom: 'none',
          flex: 1,
        }}
      />
      <DatePicker.RangePicker/>
    </div>
    <Row gutter={[20, 20]}>
      <Col xs={24} sm={12} md={8} lg={6}>
        <StatisticCard
          title={'Tổng số sách'}
          hint={'Total number of books available in library'}
          amount={6560}
          diff={15}
          diffUnit={'cuốn'}
        />
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <StatisticCard
          title={'Số sách đang cho mượn'}
          hint={'Total number of books available in library'}
          amount={1500}
          diff={10}
          diffUnit={'%'}
        />
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <StatisticCard
          title={'Số sách mượn quá hạn'}
          hint={'Total number of books available in library'}
          amount={560}
          diff={15}
          diffUnit={'%'}
        />
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <StatisticCard
          title={'Tổng số bạn đọc'}
          hint={'Total number of books available in library'}
          amount={6803}
          diff={-10}
          diffUnit={'%'}
        />
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <StatisticCard
          title={'Tổng số bạn đọc'}
          hint={'Total number of books available in library'}
          amount={6803}
          diff={-10}
          diffUnit={'%'}
        />
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <StatisticCard
          title={'Bạn đọc mới'}
          hint={'Total number of books available in library'}
          amount={1000}
          diff={4}
          diffUnit={'%'}
        />
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <StatisticCard
          title={'Tiền phạt'}
          hint={'Total number of books available in library'}
          amount={560000}
          diff={4}
          diffUnit={'%'}
        />
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <StatisticCard
          title={'Bạn đọc mới'}
          hint={'Total number of books available in library'}
          amount={1000}
          diff={4}
          diffUnit={'%'}
        />
      </Col>
    </Row>
    <Row style={{marginTop: 20}}>
      <Col span={24}>
        <Card bodyStyle={{padding: 0}}>
          <Tabs
            tabBarStyle={{padding: '0px 20px', paddingTop: 10}}
            items={[{
              key: 'reader',
              label: 'Bạn đọc',
              children: 'something',
            }, {
              key: 'borrow',
              label: 'Lượt mượn',
              children: 'something else'
            }]}
          />
        </Card>
      </Col>
    </Row>
  </>
}
