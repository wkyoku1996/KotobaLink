import { Alert, Card, Descriptions, List, Space, Tag, Typography } from 'antd';
import { useParams } from 'react-router-dom';

import { ModuleFrame } from '../components/ModuleFrame';
import { ModuleRoadmap } from '../components/ModuleRoadmap';
import { useMaterialUnitDetail } from '../hooks/useMaterialDetail';
import { MEDIA_BASE_URL } from '../lib/api';

export function MaterialUnitDetailPage() {
  const { unitId } = useParams();
  const { unit, loading, error } = useMaterialUnitDetail(unitId);

  return (
    <ModuleFrame
      eyebrow="Unit Detail"
      title={unit?.title ?? '单元详情'}
      compact
      summary={unit?.learning_goal ?? '这里展示单元目标、内容类型和挂载资源。'}
      metrics={[
        { label: '内容类型', value: String(unit?.content_types.length ?? 0) },
        { label: '资源数', value: String(unit?.resource_count ?? 0) },
        { label: '排序', value: String(unit?.sort_order ?? 0) },
      ]}
    >
      {loading ? <Alert type="info" message="正在读取单元详情..." showIcon className="login-alert" /> : null}
      {error ? <Alert type="error" message={`单元详情加载失败：${error}`} showIcon className="login-alert" /> : null}

      {unit ? (
        <>
          <Card title="单元信息" className="module-card">
            <Descriptions column={{ xs: 1, md: 2, xl: 3 }} size="small">
              <Descriptions.Item label="教材">{unit.material_title}</Descriptions.Item>
              <Descriptions.Item label="单元">{unit.title}</Descriptions.Item>
              <Descriptions.Item label="编码">{unit.code ?? '-'}</Descriptions.Item>
              <Descriptions.Item label="状态">{unit.status}</Descriptions.Item>
              <Descriptions.Item label="资源数">{unit.resource_count}</Descriptions.Item>
              <Descriptions.Item label="内容类型">{unit.content_types.join(' / ') || '-'}</Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="内容块与资源" className="module-card">
            <List
              dataSource={unit.items}
              renderItem={(item) => (
                <List.Item>
                  <Space direction="vertical" size={6} className="full-width">
                    <Space wrap>
                      <Typography.Text strong>{item.title}</Typography.Text>
                      <Tag color="blue">{item.item_type}</Tag>
                      <Tag color={item.required ? 'green' : 'default'}>{item.required ? 'Required' : 'Optional'}</Tag>
                      <Tag>{item.visibility}</Tag>
                    </Space>
                    {item.content_text ? (
                      <Typography.Paragraph type="secondary" className="card-description">
                        {item.content_text}
                      </Typography.Paragraph>
                    ) : null}
                    {item.asset ? (
                      <Space direction="vertical" size={6} className="full-width">
                        <Typography.Text type="secondary">
                          资源: {item.asset.file_name} / {item.asset.asset_type} / {item.asset.mime_type}
                        </Typography.Text>
                        {item.asset.asset_type === 'audio' && item.asset.file_url ? (
                          <audio controls preload="none" src={`${MEDIA_BASE_URL}${item.asset.file_url}`}>
                            Your browser does not support the audio element.
                          </audio>
                        ) : null}
                        {item.asset.asset_type === 'pdf' && item.asset.file_url ? (
                          <a href={`${MEDIA_BASE_URL}${item.asset.file_url}`} target="_blank" rel="noreferrer">
                            预览 PDF
                          </a>
                        ) : null}
                        {item.asset.asset_type === 'image' && item.asset.file_url ? (
                          <a href={`${MEDIA_BASE_URL}${item.asset.file_url}`} target="_blank" rel="noreferrer">
                            查看图片
                          </a>
                        ) : null}
                      </Space>
                    ) : (
                      <Typography.Text type="secondary">未挂载文件资源</Typography.Text>
                    )}
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </>
      ) : null}

      <ModuleRoadmap items={['单元目标', '内容块结构', '资源挂接', '教师可见范围']} />
    </ModuleFrame>
  );
}
