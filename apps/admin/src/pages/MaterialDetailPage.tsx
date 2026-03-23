import { Alert, Button, Card, Descriptions, List, Space, Tag, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';

import { ModuleFrame } from '../components/ModuleFrame';
import { ModuleRoadmap } from '../components/ModuleRoadmap';
import { PageToolbar } from '../components/PageToolbar';
import { useMaterialDetail } from '../hooks/useMaterialDetail';
import { getMaterialJsonExportUrl } from '../lib/api';

export function MaterialDetailPage() {
  const { materialId } = useParams();
  const { material, loading, error } = useMaterialDetail(materialId);

  return (
    <ModuleFrame
      eyebrow="Material Detail"
      title={material?.title ?? '教材详情'}
      compact
      summary={material?.summary ?? '这里展示教材级别、语言、版本、可见范围和单元结构。'}
      metrics={[
        { label: '级别', value: material?.level ?? '-' },
        { label: '单元数', value: String(material?.unit_count ?? 0) },
        { label: '资源数', value: String(material?.resource_count ?? 0) },
      ]}
    >
      {material ? (
        <PageToolbar
          title="教材详情与结构"
          description="这里查看教材基础信息和单元结构，同时可以直接导出标准教材 JSON。"
          actions={
            <Button href={getMaterialJsonExportUrl(material.id)} target="_blank">
              导出 JSON
            </Button>
          }
        />
      ) : null}

      {loading ? <Alert type="info" message="正在读取教材详情..." showIcon className="login-alert" /> : null}
      {error ? <Alert type="error" message={`教材详情加载失败：${error}`} showIcon className="login-alert" /> : null}

      {material ? (
        <>
          <Card title="教材信息" className="module-card">
            <Descriptions column={{ xs: 1, md: 2, xl: 3 }} size="small">
              <Descriptions.Item label="教材名称">{material.title}</Descriptions.Item>
              <Descriptions.Item label="系列">{material.series}</Descriptions.Item>
              <Descriptions.Item label="级别">{material.level}</Descriptions.Item>
              <Descriptions.Item label="语言">{material.language}</Descriptions.Item>
              <Descriptions.Item label="版本">{material.version}</Descriptions.Item>
              <Descriptions.Item label="可见范围">{material.visibility}</Descriptions.Item>
              <Descriptions.Item label="状态">{material.status}</Descriptions.Item>
            </Descriptions>
          </Card>

          <Card
            title="单元结构"
            extra={
              <Button type="link">
                <Link to="/materials/units">查看全部单元</Link>
              </Button>
            }
            className="module-card"
          >
            <List
              dataSource={material.units}
              renderItem={(unit) => (
                <List.Item
                  actions={[
                    <Link key="detail" to={`/materials/units/${unit.id}`}>
                      查看单元
                    </Link>,
                  ]}
                >
                  <Space direction="vertical" size={6} className="full-width">
                    <Space>
                      <Typography.Text strong>{unit.title}</Typography.Text>
                      {unit.code ? <Tag>{unit.code}</Tag> : null}
                      <Tag color={unit.status === 'published' ? 'green' : 'orange'}>{unit.status}</Tag>
                    </Space>
                    <Typography.Text type="secondary">
                      排序 {unit.sort_order} / 内容块 {unit.item_count}
                    </Typography.Text>
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </>
      ) : null}

      <ModuleRoadmap items={['教材基础信息', '单元结构', '版本关联', '发布范围']} />
    </ModuleFrame>
  );
}
