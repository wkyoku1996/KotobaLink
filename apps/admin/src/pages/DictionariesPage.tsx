import { Button } from 'antd';

import { ModuleFrame } from '../components/ModuleFrame';
import { ModuleRoadmap } from '../components/ModuleRoadmap';
import { PageToolbar } from '../components/PageToolbar';
import { PlaceholderBoard } from '../components/PlaceholderBoard';


export function DictionariesPage() {
  return (
    <ModuleFrame
      eyebrow="Dictionaries"
      title="系统字典"
      summary="超级管理员系统字典模块预留给课程标签、状态枚举、通知类型和全局配置项。当前先固定治理页框架。"
      metrics={[
        { label: '字典组', value: '8' },
        { label: '配置项', value: '46' },
        { label: '待审变更', value: '2' },
      ]}
    >
      <PageToolbar
        title="字典与全局配置"
        description="先把系统字典页的信息结构和治理动作固定下来，后续再接真实配置项编辑。"
        actions={
          <>
            <Button>查看变更</Button>
            <Button type="primary">新增字典组</Button>
          </>
        }
      />
      <PlaceholderBoard
        title="字典配置列表"
        description="后续会接字典项、配置项、依赖范围和变更记录。"
        columns={['字典组', '用途', '条目数', '状态']}
        rows={[
          ['Course Tags', '课程标签', '12', 'Ready'],
          ['Membership Status', '会员状态', '6', 'Active'],
          ['Notification Types', '通知类型', '9', 'Draft'],
        ]}
      />
      <ModuleRoadmap
        items={[
          '课程与业务状态枚举',
          '消息与通知类型配置',
          '配置项变更审计',
          '环境级字典同步',
        ]}
      />
    </ModuleFrame>
  );
}
