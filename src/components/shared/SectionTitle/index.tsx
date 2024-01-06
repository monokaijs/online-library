import {Button, Typography} from "antd";
import Link from "next/link";

interface SectionTitleProps {
  title: string;
}

export default function SectionTitle(props: SectionTitleProps) {
  return <div style={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
  }}>
    <Typography.Title level={4}>
      {props.title}
    </Typography.Title>
    <div>
      <Link href={'/books/new'}>
        View All
      </Link>
    </div>
  </div>
}