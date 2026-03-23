import { Alert, Button, Card, Form, Input, message, Select, Upload } from 'antd';
import type { UploadFile } from 'antd';
import { useState } from 'react';

import { ModuleFrame } from '../components/ModuleFrame';
import { ModuleRoadmap } from '../components/ModuleRoadmap';
import { PageToolbar } from '../components/PageToolbar';
import { PlaceholderBoard } from '../components/PlaceholderBoard';
import { useMaterialData } from '../hooks/useMaterialData';
import { MEDIA_BASE_URL, uploadMaterialAsset } from '../lib/api';

type UploadFormValues = {
  asset_type: string;
  unit_id?: string;
  item_type?: string;
  item_title?: string;
  content_text?: string;
};

export function MaterialAssetsPage() {
  const { assets, error, loading, reload, units } = useMaterialData();
  const [messageApi, contextHolder] = message.useMessage();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [submitting, setSubmitting] = useState(false);

  async function handleFinish(values: UploadFormValues) {
    const file = fileList[0]?.originFileObj;
    if (!file) {
      messageApi.error('请先选择文件');
      return;
    }

    setSubmitting(true);
    try {
      await uploadMaterialAsset({
        file,
        asset_type: values.asset_type,
        visibility: 'teacher',
        uploaded_by: 'ops_admin',
        unit_id: values.unit_id,
        item_type: values.item_type,
        item_title: values.item_title,
        content_text: values.content_text,
      });
      setFileList([]);
      reload();
      messageApi.success('资源上传成功');
    } catch (uploadError) {
      messageApi.error(uploadError instanceof Error ? uploadError.message : '资源上传失败');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ModuleFrame
      eyebrow="Assets"
      title="资源上传"
      compact
      summary="资源上传模块用于管理教材相关的 PDF、音频、视频、图片和练习文件，并维护它们与单元内容的引用关系。"
      metrics={[
        { label: '资源文件', value: String(assets.length) },
        { label: '音频', value: String(assets.filter((asset) => asset.asset_type === 'audio').length) },
        { label: '待归档', value: String(assets.filter((asset) => asset.visibility !== 'public').length) },
      ]}
    >
      {contextHolder}
      <PageToolbar
        title="媒体资源与上传区"
        description="现在已经支持最小上传闭环：上传文件、选择单元、自动生成资源记录，并挂接到单元内容。"
        actions={
          <>
            <Button onClick={reload}>刷新列表</Button>
          </>
        }
      />
      {loading ? <Alert type="info" message="正在读取资源数据..." showIcon className="login-alert" /> : null}
      {error ? <Alert type="error" message={`资源数据加载失败：${error}`} showIcon className="login-alert" /> : null}

      <Card title="上传资源" className="module-card">
        <Form<UploadFormValues> layout="vertical" onFinish={handleFinish}>
          <Form.Item label="文件">
            <Upload
              beforeUpload={() => false}
              fileList={fileList}
              maxCount={1}
              onChange={({ fileList: nextFileList }) => setFileList(nextFileList)}
            >
              <Button>选择文件</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="资源类型" name="asset_type" rules={[{ required: true, message: '请选择资源类型' }]}>
            <Select
              options={[
                { value: 'pdf', label: 'PDF' },
                { value: 'audio', label: 'Audio' },
                { value: 'image', label: 'Image' },
                { value: 'video', label: 'Video' },
                { value: 'worksheet', label: 'Worksheet' },
              ]}
            />
          </Form.Item>
          <Form.Item label="挂接单元" name="unit_id">
            <Select
              allowClear
              options={units.map((unit) => ({
                value: unit.id,
                label: `${unit.material_title} / ${unit.title}`,
              }))}
            />
          </Form.Item>
          <Form.Item label="内容块类型" name="item_type">
            <Input placeholder="例如 audio / worksheet / pdf" />
          </Form.Item>
          <Form.Item label="显示标题" name="item_title">
            <Input placeholder="例如 Dialogue Audio 02" />
          </Form.Item>
          <Form.Item label="说明" name="content_text">
            <Input.TextArea rows={3} placeholder="选填，用于写资源说明或课堂备注" />
          </Form.Item>
          <Form.Item className="login-submit">
            <Button type="primary" htmlType="submit" loading={submitting}>
              上传并保存
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <PlaceholderBoard
        title="资源列表"
        description="这里直接显示数据库中的资源文件记录。上传完成后会自动刷新。"
        columns={['资源', '类型', '大小 / 时长', 'MIME', '预览']}
        rows={assets.map((asset) => [
          asset.file_name,
          asset.asset_type,
          asset.duration_seconds ? `${asset.duration_seconds}s` : `${(asset.file_size / 1024 / 1024).toFixed(1)} MB`,
          asset.mime_type,
          <a key={asset.id} href={`${MEDIA_BASE_URL}${asset.file_url}`} target="_blank" rel="noreferrer">
            打开资源
          </a>,
        ])}
      />
      <ModuleRoadmap items={['上传与校验', '资源预览', '文件归档', '内容引用关系']} />
    </ModuleFrame>
  );
}
