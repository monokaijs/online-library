"use client";
import {Button, Card, Tooltip, Typography} from "antd";
import {formatNumberWithCommas} from "@/lib/utils/number";
import {CaretDownFilled, CaretUpFilled, InfoCircleOutlined, InfoOutlined} from "@ant-design/icons";

interface StatisticCardProps {
  title: string;
  amount: number;
  hint?: string;
  diff?: number;
  diffUnit?: string;
}

export default function StatisticCard(props: StatisticCardProps) {
  return <Card bodyStyle={{padding: 16}}>
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center'
    }}>
      <Typography.Text style={{opacity: .45, flex: 1,}}>
        {props.title}
      </Typography.Text>
      {props.hint && <Tooltip trigger={'click'} title={props.hint}>
        <Button icon={<InfoCircleOutlined/>} shape={'circle'} type={'link'} size={'small'}/>
      </Tooltip>}
    </div>
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end'
    }}>
      <Typography.Title style={{margin: 0, marginTop: 10, fontSize: 30, flex: 1,}}>
        {formatNumberWithCommas(props.amount)}
      </Typography.Title>
      {props.diff && <>
        <div
          style={{
            display: 'flex', flexDirection: 'row', gap: 4,
            color: props.diff > 0 ? '#48E474' : '#E44848'
          }}
        >
          {props.diff > 0 ? <CaretUpFilled/> : <CaretDownFilled/>}
          <div>
            {Math.abs(props.diff)} {props.diffUnit}
          </div>
        </div>
      </>}
    </div>
  </Card>
}
