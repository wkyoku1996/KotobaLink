import { Button, Card, Col, List, Row, Space, Tag, Typography } from 'antd';

import { ModuleFrame } from '../components/ModuleFrame';
import { ModuleRoadmap } from '../components/ModuleRoadmap';
import { PageToolbar } from '../components/PageToolbar';
import { PlaceholderBoard } from '../components/PlaceholderBoard';

const contentDomains = [
  {
    title: '首页内容',
    tag: 'Landing',
    description: '首页 hero、推荐课程卡片、公告条和品牌说明区块。',
  },
  {
    title: '课程内容',
    tag: 'Catalog',
    description: '课程标签、课程亮点文案、课程详情模块和课程 FAQ。',
  },
  {
    title: '活动内容',
    tag: 'Campaign',
    description: '活动 banner、活动详情、报名说明和活动通知素材。',
  },
  {
    title: '通知模板',
    tag: 'Message',
    description: '系统消息、运营通知、课程提醒和站内文案模板。',
  },
];

const publishingSteps = ['草稿编辑', '内容校对', '预览确认', '发布上线'];

export function ContentPage() {
  return (
    <ModuleFrame
      eyebrow="Content"
      title="内容配置"
      summary="内容配置作为内容中台的第一层框架，先承接首页、课程、活动、通知和素材资源的统一入口。当前先把信息架构和工作区版式固定下来，不做真实 CMS 功能。"
      metrics={[
        { label: '内容块', value: '21' },
        { label: '标签组', value: '9' },
        { label: '草稿内容', value: '6' },
      ]}
    >
      <PageToolbar
        title="内容资源与标签配置"
        description="当前先统一内容中台的页面结构，后续再接资源库、富文本编辑、版本记录和发布流程。"
        actions={
          <>
            <Button>打开素材库</Button>
            <Button type="primary">新建内容草稿</Button>
          </>
        }
      />

      <Row gutter={[20, 20]}>
        <Col xs={24} xl={15}>
          <Card title="内容域地图" className="module-card">
            <div className="content-domain-grid">
              {contentDomains.map((domain) => (
                <div key={domain.title} className="content-domain-card">
                  <Space direction="vertical" size={10} className="full-width">
                    <Space>
                      <Typography.Title level={5} className="content-domain-title">
                        {domain.title}
                      </Typography.Title>
                      <Tag color="blue">{domain.tag}</Tag>
                    </Space>
                    <Typography.Paragraph type="secondary" className="card-description">
                      {domain.description}
                    </Typography.Paragraph>
                  </Space>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} xl={9}>
          <Card title="发布流程" className="module-card">
            <List
              dataSource={publishingSteps}
              renderItem={(item, index) => (
                <List.Item>
                  <Space>
                    <Tag color={index === publishingSteps.length - 1 ? 'green' : 'processing'}>
                      {String(index + 1).padStart(2, '0')}
                    </Tag>
                    <Typography.Text>{item}</Typography.Text>
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <PlaceholderBoard
        title="内容资产"
        description="这里作为内容主列表，后续会接富文本、版本记录、负责人和发布时间线。"
        columns={['内容项', '分类', '负责人', '最后更新', '状态']}
        rows={[
          ['Homepage Hero', 'Landing', 'Ops Admin', '2026-03-21', 'Published'],
          ['Course Tag Set', 'Catalog', 'Ops Admin', '2026-03-22', 'Ready'],
          ['Activity Banner', 'Campaign', 'Ops Admin', '2026-03-23', 'Draft'],
          ['Lesson Reminder Copy', 'Message', 'Ops Admin', '2026-03-23', 'Review'],
        ]}
      />

      <Row gutter={[20, 20]}>
        <Col xs={24} xl={12}>
          <PlaceholderBoard
            title="标签与字典配置"
            description="这块后续承接课程标签、活动标签、消息分类和内容状态枚举。"
            columns={['配置项', '范围', '条目数', '状态']}
            rows={[
              ['Course Tags', 'Catalog', '12', 'Ready'],
              ['Activity Themes', 'Campaign', '8', 'Draft'],
              ['Message Types', 'Message', '9', 'Planned'],
            ]}
          />
        </Col>
        <Col xs={24} xl={12}>
          <PlaceholderBoard
            title="素材与媒体资源"
            description="这块后续承接图片、Banner、图标、封面和上传后的资源归档。"
            columns={['资源', '用途', '格式', '状态']}
            rows={[
              ['Hero Banner 01', 'Homepage', 'PNG', 'Active'],
              ['Activity KV Spring', 'Campaign', 'JPG', 'Draft'],
              ['Course Cover Set A', 'Catalog', 'WEBP', 'Ready'],
            ]}
          />
        </Col>
      </Row>

      <ModuleRoadmap
        items={[
          '内容草稿、预览与发布流转',
          '富文本编辑与版本记录',
          '课程 / 活动 / 通知模板一体化管理',
          '媒体资源库与内容引用关系',
        ]}
      />
    </ModuleFrame>
  );
}
