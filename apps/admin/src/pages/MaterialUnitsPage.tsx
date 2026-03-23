import { Alert, Button } from 'antd';
import { Link } from 'react-router-dom';

import { ModuleFrame } from '../components/ModuleFrame';
import { ModuleRoadmap } from '../components/ModuleRoadmap';
import { PageToolbar } from '../components/PageToolbar';
import { PlaceholderBoard } from '../components/PlaceholderBoard';
import { useMaterialData } from '../hooks/useMaterialData';

export function MaterialUnitsPage() {
  const { units, loading, error } = useMaterialData();

  return (
    <ModuleFrame
      eyebrow="Units"
      title="单元内容"
      compact
      summary="单元内容承接教材下的 Topic / Lesson 结构，用于挂接讲义、音频、视频、作业和教师备注。当前已接入后端 demo seed 数据。"
      metrics={[
        { label: '单元数', value: String(units.length) },
        { label: '内容块类型', value: String(new Set(units.flatMap((unit) => unit.content_types)).size) },
        { label: '待整理', value: String(units.filter((unit) => unit.status !== 'published').length) },
      ]}
    >
      <PageToolbar
        title="单元树与内容块管理"
        description="单元内容列表现在直接读取后端 seed 数据，后续再接教材树、单元排序、内容块类型和可见范围。"
        actions={
          <>
            <Button>调整排序</Button>
            <Button type="primary">新增单元</Button>
          </>
        }
      />
      {loading ? <Alert type="info" message="正在读取单元内容数据..." showIcon className="login-alert" /> : null}
      {error ? <Alert type="error" message={`单元内容加载失败：${error}`} showIcon className="login-alert" /> : null}
      <PlaceholderBoard
        title="单元内容列表"
        description="后续会接 Topic / Lesson 层级、内容块类型和挂载资源。"
        columns={['教材', '单元', '编码', '内容类型', '资源数', '状态']}
        rows={units.map((unit) => [
          unit.material_title,
          <Link key={unit.id} to={`/materials/units/${unit.id}`}>
            {unit.title}
          </Link>,
          unit.code ?? '-',
          unit.content_types.join(' / ') || '-',
          String(unit.resource_count),
          unit.status,
        ])}
      />
      <ModuleRoadmap items={['教材树结构', '单元排序', '内容块类型', '教师可见内容']} />
    </ModuleFrame>
  );
}
