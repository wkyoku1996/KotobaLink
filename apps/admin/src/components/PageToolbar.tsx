import { Button, Card, Input, Select, Space, Typography } from 'antd';
import type { ReactNode } from 'react';


type PageToolbarProps = {
  title: string;
  description: string;
  actions?: ReactNode;
};

export function PageToolbar({ title, description, actions }: PageToolbarProps) {
  return (
    <Card className="toolbar-card">
      <div className="toolbar-header">
        <div>
          <Typography.Title level={4} className="toolbar-title">
            {title}
          </Typography.Title>
          <Typography.Paragraph className="toolbar-description">
            {description}
          </Typography.Paragraph>
        </div>
        <Space wrap className="toolbar-actions">
          {actions}
        </Space>
      </div>

      <Space wrap className="toolbar-filters">
        <Input placeholder="Search..." className="toolbar-input" />
        <Select
          defaultValue="all"
          options={[
            { value: 'all', label: 'All Status' },
            { value: 'active', label: 'Active' },
            { value: 'draft', label: 'Draft' },
            { value: 'archived', label: 'Archived' },
          ]}
          className="toolbar-select"
        />
        <Select
          defaultValue="latest"
          options={[
            { value: 'latest', label: 'Latest Updated' },
            { value: 'priority', label: 'Priority' },
            { value: 'owner', label: 'Owner' },
          ]}
          className="toolbar-select"
        />
        <Button>Reset</Button>
      </Space>
    </Card>
  );
}
