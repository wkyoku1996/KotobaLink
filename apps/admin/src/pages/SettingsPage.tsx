import { Button } from 'antd';

import { ModuleFrame } from '../components/ModuleFrame';
import { ModuleRoadmap } from '../components/ModuleRoadmap';
import { PageToolbar } from '../components/PageToolbar';
import { PlaceholderBoard } from '../components/PlaceholderBoard';


export function SettingsPage() {
  return (
    <ModuleFrame
      eyebrow="Settings"
      title="系统设置"
      summary="预留给角色权限、环境变量展示、字典配置和系统通知模板。现在只展示后台结构和信息分区。"
      metrics={[
        { label: '角色组', value: '4' },
        { label: '通知模板', value: '12' },
        { label: '系统字典', value: '8' },
      ]}
    >
      <PageToolbar
        title="角色、字典与系统参数"
        description="先统一系统设置的后台结构，后续再把权限、模板和字典逐步接进来。"
        actions={
          <>
            <Button>刷新配置</Button>
            <Button type="primary">新增配置项</Button>
          </>
        }
      />
      <PlaceholderBoard
        title="系统配置面板"
        description="后续会接权限矩阵、通知模板和全局配置。"
        columns={['配置项', '分组', '说明', '状态']}
        rows={[
          ['Admin Roles', 'Auth', '后台角色与权限', 'Draft'],
          ['Notification Templates', 'Message', '消息模板管理', 'Planned'],
          ['Course Tags', 'Catalog', '课程标签字典', 'Ready'],
        ]}
      />
      <ModuleRoadmap
        items={[
          '角色权限矩阵',
          '环境变量与服务状态',
          '全局字典配置',
          '消息模板与发送规则',
        ]}
      />
    </ModuleFrame>
  );
}
