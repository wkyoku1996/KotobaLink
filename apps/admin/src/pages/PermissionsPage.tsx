import { Button } from 'antd';

import { ModuleFrame } from '../components/ModuleFrame';
import { ModuleRoadmap } from '../components/ModuleRoadmap';
import { PageToolbar } from '../components/PageToolbar';
import { PlaceholderBoard } from '../components/PlaceholderBoard';


export function PermissionsPage() {
  return (
    <ModuleFrame
      eyebrow="Permissions"
      title="权限矩阵"
      summary="超级管理员权限矩阵模块预留给角色分组、菜单访问、页面动作和接口能力边界。当前先固定治理框架。"
      metrics={[
        { label: '角色组', value: '3' },
        { label: '菜单权限', value: '19' },
        { label: '动作权限', value: '42' },
      ]}
    >
      <PageToolbar
        title="角色与权限边界"
        description="先把权限矩阵页的结构和信息分区搭起来，后续再接真实角色授权和动作级权限。"
        actions={
          <>
            <Button>导出矩阵</Button>
            <Button type="primary">调整权限</Button>
          </>
        }
      />
      <PlaceholderBoard
        title="角色权限总览"
        description="后续会接角色、菜单、动作和接口维度的权限矩阵。"
        columns={['角色', '菜单范围', '动作范围', '状态']}
        rows={[
          ['super_admin', '全部', '全部', 'Active'],
          ['ops_admin', '运营 / 教务', '管理与协作', 'Active'],
          ['teacher', '教学执行', '查看 / 反馈 / 记录', 'Active'],
        ]}
      />
      <ModuleRoadmap
        items={[
          '角色分组与授权模板',
          '菜单与页面动作权限',
          '接口访问边界',
          '权限变更审计记录',
        ]}
      />
    </ModuleFrame>
  );
}
