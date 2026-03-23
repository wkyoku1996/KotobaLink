import { Alert, Button } from 'antd';
import { Link } from 'react-router-dom';

import { ModuleFrame } from '../components/ModuleFrame';
import { ModuleRoadmap } from '../components/ModuleRoadmap';
import { PageToolbar } from '../components/PageToolbar';
import { PlaceholderBoard } from '../components/PlaceholderBoard';
import { useMaterialData } from '../hooks/useMaterialData';
import { getMaterialJsonExportUrl } from '../lib/api';

export function MaterialLibraryPage() {
  const { library, loading, error } = useMaterialData();

  return (
    <ModuleFrame
      eyebrow="Library"
      title="教材库"
      compact
      summary="教材库按教材系列、级别、语言和版本管理整套教学内容，是后续教材详情和单元内容的入口。当前已接入后端 demo seed 数据。"
      metrics={[
        { label: '教材套数', value: String(library.length) },
        { label: '公开版本', value: String(library.filter((item) => item.status === 'published').length) },
        { label: '草稿版本', value: String(library.filter((item) => item.status !== 'published').length) },
      ]}
    >
      <PageToolbar
        title="教材检索与系列管理"
        description="教材列表现在直接读取后端 seed 数据，后续再接封面、简介、系列筛选和版本状态。"
        actions={
          <>
            <Button>导出教材表</Button>
            <Button type="primary">新建教材</Button>
          </>
        }
      />
      {loading ? <Alert type="info" message="正在读取教材库数据..." showIcon className="login-alert" /> : null}
      {error ? <Alert type="error" message={`教材库加载失败：${error}`} showIcon className="login-alert" /> : null}
      <PlaceholderBoard
        title="教材列表"
        description="后续会接教材详情、封面、版本号和可见范围。"
        columns={['教材', '系列 / 级别', '语言', '版本', '状态', '单元 / 资源', '操作']}
        rows={library.map((item) => [
          <Link key={item.id} to={`/materials/library/${item.id}`}>
            {item.title}
          </Link>,
          `${item.series} / ${item.level}`,
          item.language,
          item.version,
          item.status,
          `${item.unit_count} / ${item.resource_count}`,
          <a key={`${item.id}-json`} href={getMaterialJsonExportUrl(item.id)} target="_blank" rel="noreferrer">
            导出 JSON
          </a>,
        ])}
      />
      <ModuleRoadmap items={['教材基础信息', '封面与简介', '系列关联', '版本流转']} />
    </ModuleFrame>
  );
}
