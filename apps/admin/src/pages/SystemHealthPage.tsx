import { Button } from 'antd';

import { ModuleFrame } from '../components/ModuleFrame';
import { ModuleRoadmap } from '../components/ModuleRoadmap';
import { PageToolbar } from '../components/PageToolbar';
import { PlaceholderBoard } from '../components/PlaceholderBoard';


export function SystemHealthPage() {
  return (
    <ModuleFrame
      eyebrow="Health"
      title="环境状态"
      summary="超级管理员环境状态模块预留给服务健康、数据库连通性、队列状态和基础依赖监控。当前先固定系统治理结构。"
      metrics={[
        { label: '服务数', value: '3' },
        { label: '健康检查', value: '3' },
        { label: '告警数', value: '0' },
      ]}
    >
      <PageToolbar
        title="服务健康与运行状态"
        description="先把环境状态页的监控位和治理动作固定下来，后续再接真实监控与告警。"
        actions={
          <>
            <Button>刷新状态</Button>
            <Button type="primary">查看日志</Button>
          </>
        }
      />
      <PlaceholderBoard
        title="服务状态板"
        description="后续会接服务、数据库、队列和任务执行状态。"
        columns={['服务', '地址', '状态', '说明']}
        rows={[
          ['admin', 'localhost:5173', 'Healthy', 'Vite admin app'],
          ['backend', 'localhost:8000', 'Healthy', 'FastAPI service'],
          ['postgres', 'localhost:5432', 'Healthy', 'Primary database'],
        ]}
      />
      <ModuleRoadmap
        items={[
          '服务健康检查聚合',
          '数据库与缓存状态',
          '任务与队列执行概览',
          '告警与审计入口',
        ]}
      />
    </ModuleFrame>
  );
}
