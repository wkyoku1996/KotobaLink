import { Card, Table, Typography } from 'antd';
import type { ReactNode } from 'react';


type PlaceholderBoardProps = {
  title: string;
  description: string;
  columns: string[];
  rows: ReactNode[][];
};

export function PlaceholderBoard({ title, description, columns, rows }: PlaceholderBoardProps) {
  const tableColumns = columns.map((column, index) => ({
    title: column,
    dataIndex: `col${index}`,
    key: `col${index}`,
  }));

  const dataSource = rows.map((row, rowIndex) =>
    row.reduce<Record<string, ReactNode> & { key: string }>(
      (result, cell, cellIndex) => {
        result[`col${cellIndex}`] = cell;
        return result;
      },
      { key: `${title}-${rowIndex}` },
    ),
  );

  return (
    <Card
      title={title}
      extra={<Typography.Text type="secondary">{rows.length} rows</Typography.Text>}
      className="module-card"
    >
      <Typography.Paragraph type="secondary" className="card-description">
        {description}
      </Typography.Paragraph>
      <Table columns={tableColumns} dataSource={dataSource} pagination={false} size="middle" />
    </Card>
  );
}
