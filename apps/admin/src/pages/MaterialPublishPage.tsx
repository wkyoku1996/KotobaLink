import { Alert, Button } from 'antd';

import { ModuleFrame } from '../components/ModuleFrame';
import { ModuleRoadmap } from '../components/ModuleRoadmap';
import { PageToolbar } from '../components/PageToolbar';
import { PlaceholderBoard } from '../components/PlaceholderBoard';
import { useMaterialData } from '../hooks/useMaterialData';

export function MaterialPublishPage() {
  const { error, loading, publishRecords } = useMaterialData();

  return (
    <ModuleFrame
      eyebrow="Publish"
      title="发布管理"
      compact
      summary="发布管理模块负责教材内容的草稿、预览、版本记录和上线控制，是内容上传完成后的最后一步。"
      metrics={[
        { label: '待发布', value: String(publishRecords.filter((record) => record.status !== 'published').length) },
        { label: '版本数', value: String(publishRecords.length) },
        { label: '回滚点', value: '0' },
      ]}
    >
      <PageToolbar
        title="教材版本与发布记录"
        description="后续这里会接版本说明、预览、发布人、回滚和发布范围控制。"
        actions={
          <>
            <Button>查看预览</Button>
            <Button type="primary">发布版本</Button>
          </>
        }
      />
      {loading ? <Alert type="info" message="正在读取发布记录..." showIcon className="login-alert" /> : null}
      {error ? <Alert type="error" message={`发布记录加载失败：${error}`} showIcon className="login-alert" /> : null}
      <PlaceholderBoard
        title="发布记录"
        description="这里现在直接显示数据库中的教材版本与发布记录。"
        columns={['教材', '版本', '发布范围', '发布人', '状态']}
        rows={publishRecords.map((record) => [
          record.material_title,
          record.version,
          record.publish_scope,
          record.published_by ?? '-',
          record.status,
        ])}
      />
      <ModuleRoadmap items={['草稿与预览', '版本记录', '发布范围', '回滚与审计']} />
    </ModuleFrame>
  );
}
