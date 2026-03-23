import { Button } from 'antd';

import { ModuleFrame } from '../components/ModuleFrame';
import { ModuleRoadmap } from '../components/ModuleRoadmap';
import { PageToolbar } from '../components/PageToolbar';
import { PlaceholderBoard } from '../components/PlaceholderBoard';


export function ActivitiesPage() {
  return (
    <ModuleFrame
      eyebrow="Activities"
      title="活动运营"
      summary="活动运营模块会连接活动配置、报名审核、到场统计和活动通知。当前先搭主页面和数据区。"
      metrics={[
        { label: '活动数', value: '8' },
        { label: '待审核报名', value: '12' },
        { label: '已报名人数', value: '164' },
      ]}
    >
      <PageToolbar
        title="活动排期与报名管理"
        description="先统一活动页的工具栏和白板结构，后续再接报名审核与容量控制。"
        actions={
          <>
            <Button>导出报名</Button>
            <Button type="primary">创建活动</Button>
          </>
        }
      />
      <PlaceholderBoard
        title="活动列表"
        description="后续会接活动详情、报名状态和容量管理。"
        columns={['活动', '日期', '容量', '报名', '状态']}
        rows={[
          ['Spring Meetup', '2026-04-05', '60', '48', 'Open'],
          ['JLPT Bootcamp', '2026-04-12', '40', '35', 'Open'],
          ['Speaking Night', '2026-04-18', '30', '30', 'Full'],
        ]}
      />
      <ModuleRoadmap
        items={[
          '活动详情与内容配置',
          '报名审核和取消',
          '容量与候补机制',
          '活动通知联动',
        ]}
      />
    </ModuleFrame>
  );
}
