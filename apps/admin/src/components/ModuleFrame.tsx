import { Card, Col, Row, Space, Typography } from 'antd';
import type { ReactNode } from 'react';


type Metric = {
  label: string;
  value: string;
};

type ModuleFrameProps = {
  eyebrow: string;
  title: string;
  summary: string;
  metrics: Metric[];
  compact?: boolean;
  children?: ReactNode;
};

export function ModuleFrame({ eyebrow, title, summary, metrics, compact = false, children }: ModuleFrameProps) {
  return (
    <Space direction="vertical" size={16} className="module-stack">
      <Card className={`hero-card${compact ? ' hero-card-compact' : ''}`}>
        <Row gutter={[20, 16]} align="middle">
          <Col xs={24} xl={15}>
            <Typography.Text type="secondary" className="module-kicker">
              {eyebrow}
            </Typography.Text>
            <Typography.Title level={2} className="module-title">
              {title}
            </Typography.Title>
            <Typography.Paragraph className="module-summary">{summary}</Typography.Paragraph>
          </Col>
          <Col xs={24} xl={9}>
            <Row gutter={[10, 10]}>
              {metrics.map((metric) => (
                <Col xs={24} sm={12} key={metric.label}>
                  <Card size="small" className="metric-panel">
                    <Typography.Text type="secondary">{metric.label}</Typography.Text>
                    <Typography.Title level={4} className="metric-value">
                      {metric.value}
                    </Typography.Title>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Card>

      {children}
    </Space>
  );
}
