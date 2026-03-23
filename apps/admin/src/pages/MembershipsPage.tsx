import { Button } from 'antd';

import { ModuleFrame } from '../components/ModuleFrame';
import { ModuleRoadmap } from '../components/ModuleRoadmap';
import { PageToolbar } from '../components/PageToolbar';
import { PlaceholderBoard } from '../components/PlaceholderBoard';


export function MembershipsPage() {
  return (
    <ModuleFrame
      eyebrow="Memberships"
      title="会员体系"
      summary="会员模块预留给套餐配置、权益管理、续费策略和会员订单追踪。当前先搭面板结构。"
      metrics={[
        { label: '会员套餐', value: '3' },
        { label: '活跃会员', value: '124' },
        { label: '本月续费率', value: '78%' },
      ]}
    >
      <PageToolbar
        title="会员方案与续费策略"
        description="这里先保留后台标准工具条和筛选位，之后再接套餐与续费规则。"
        actions={
          <>
            <Button>导出会员</Button>
            <Button type="primary">新建套餐</Button>
          </>
        }
      />
      <PlaceholderBoard
        title="会员方案"
        description="后续会接权益模板、价格梯度和会员订单链路。"
        columns={['套餐', '周期', '权益', '状态']}
        rows={[
          ['Standard', 'Monthly', '课程折扣 / 消息优先', 'Active'],
          ['Premium', 'Quarterly', '专属活动 / 补课权益', 'Active'],
          ['Family', 'Quarterly', '家庭组共享权益', 'Draft'],
        ]}
      />
      <ModuleRoadmap
        items={[
          '套餐配置与定价',
          '会员权益模板',
          '续费跟进规则',
          '会员订单报表',
        ]}
      />
    </ModuleFrame>
  );
}
