import { Alert, Button, Card, Empty, Input, List, Select, Space, Tag, Tree, Typography, message } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
import { useEffect, useMemo, useState } from 'react';

import { useAuth } from '../auth/AuthProvider';
import { ModuleFrame } from '../components/ModuleFrame';
import { PageToolbar } from '../components/PageToolbar';
import { useMaterialData } from '../hooks/useMaterialData';
import {
  fetchMaterialJsonDocument,
  getMaterialJsonExportUrl,
  MEDIA_BASE_URL,
  type MaterialJsonV2Asset,
  type MaterialJsonV2Document,
  type MaterialJsonV2Section,
  type MaterialJsonV2Unit,
} from '../lib/api';

type EditorNode =
  | { kind: 'material'; materialId: string }
  | { kind: 'unit'; materialId: string; unitId: string }
  | { kind: 'content'; materialId: string; unitId: string; contentId: string }
  | { kind: 'resource'; materialId: string; unitId: string; contentId: string; assetId: string };

type ContentLibraryItem = {
  content: MaterialJsonV2Section;
  sourceUnit: MaterialJsonV2Unit;
  resources: MaterialJsonV2Asset[];
  preview: string;
};

type PendingChange = {
  id: string;
  label: string;
  kind: 'added' | 'updated' | 'deleted' | 'reordered' | 'assigned';
};

function toNodeKey(node: EditorNode) {
  switch (node.kind) {
    case 'material':
      return `material:${node.materialId}`;
    case 'unit':
      return `unit:${node.materialId}:${node.unitId}`;
    case 'content':
      return `content:${node.materialId}:${node.unitId}:${node.contentId}`;
    case 'resource':
      return `resource:${node.materialId}:${node.unitId}:${node.contentId}:${node.assetId}`;
  }
}

function parseNodeKey(key: string): EditorNode | null {
  const parts = key.split(':');
  if (parts[0] === 'material' && parts.length === 2) {
    return { kind: 'material', materialId: parts[1] };
  }
  if (parts[0] === 'unit' && parts.length === 3) {
    return { kind: 'unit', materialId: parts[1], unitId: parts[2] };
  }
  if (parts[0] === 'content' && parts.length === 4) {
    return { kind: 'content', materialId: parts[1], unitId: parts[2], contentId: parts[3] };
  }
  if (parts[0] === 'resource' && parts.length === 5) {
    return { kind: 'resource', materialId: parts[1], unitId: parts[2], contentId: parts[3], assetId: parts[4] };
  }
  return null;
}

function cloneDocument(document: MaterialJsonV2Document) {
  return structuredClone(document);
}

function findUnit(document: MaterialJsonV2Document, unitId: string) {
  return document.units.find((unit) => unit.id === unitId) ?? null;
}

function findContent(document: MaterialJsonV2Document, unitId: string, contentId: string) {
  return findUnit(document, unitId)?.sections.find((section) => section.id === contentId) ?? null;
}

function collectAssetRefs(value: unknown): string[] {
  if (typeof value === 'string' && value.startsWith('asset-')) {
    return [value];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item) => collectAssetRefs(item));
  }
  if (value && typeof value === 'object') {
    return Object.values(value).flatMap((item) => collectAssetRefs(item));
  }
  return [];
}

function getResourceLinks(document: MaterialJsonV2Document, content: MaterialJsonV2Section) {
  const refs = collectAssetRefs(content.content);
  return refs
    .map((assetId) => document.assets.find((asset) => asset.id === assetId) ?? null)
    .filter((asset): asset is MaterialJsonV2Asset => asset !== null);
}

function createPreview(content: MaterialJsonV2Section) {
  const value = content.content;
  if (!value || typeof value !== 'object') {
    return '暂无内容摘要';
  }

  if ('text' in value && typeof value.text === 'string' && value.text.trim()) {
    return value.text.slice(0, 80);
  }
  if ('prompt' in value && typeof value.prompt === 'string' && value.prompt.trim()) {
    return value.prompt.slice(0, 80);
  }
  if ('items' in value && Array.isArray(value.items)) {
    return `包含 ${value.items.length} 项内容`;
  }
  if ('points' in value && Array.isArray(value.points)) {
    return `包含 ${value.points.length} 条语法点`;
  }
  if ('tasks' in value && Array.isArray(value.tasks)) {
    return `包含 ${value.tasks.length} 项作业`;
  }
  return '查看详情了解此内容';
}

function renumberUnits(document: MaterialJsonV2Document) {
  document.units.forEach((unit, index) => {
    unit.sort_order = index + 1;
  });
}

function renumberContents(unit: MaterialJsonV2Unit) {
  unit.sections.forEach((section, index) => {
    section.sort_order = index + 1;
  });
}

export function TeachingMaterialsPage() {
  const { user } = useAuth();
  const { library, loading, error } = useMaterialData();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);
  const [document, setDocument] = useState<MaterialJsonV2Document | null>(null);
  const [baselineDocument, setBaselineDocument] = useState<MaterialJsonV2Document | null>(null);
  const [documentLoading, setDocumentLoading] = useState(false);
  const [documentError, setDocumentError] = useState<string | null>(null);
  const [selectedNodeKey, setSelectedNodeKey] = useState<string | null>(null);
  const [libraryKeyword, setLibraryKeyword] = useState('');
  const [libraryType, setLibraryType] = useState<string>('all');
  const [libraryUnit, setLibraryUnit] = useState<string>('all');
  const [selectedLibraryItemId, setSelectedLibraryItemId] = useState<string | null>(null);
  const [draggingLibraryItemId, setDraggingLibraryItemId] = useState<string | null>(null);
  const [dragOverNodeKey, setDragOverNodeKey] = useState<string | null>(null);
  const [pendingChanges, setPendingChanges] = useState<PendingChange[]>([]);

  const isTeacher = user?.role === 'teacher';

  useEffect(() => {
    if (!selectedMaterialId && library.length > 0) {
      setSelectedMaterialId(library[0].id);
    }
  }, [library, selectedMaterialId]);

  useEffect(() => {
    if (!selectedMaterialId) {
      return;
    }

    let active = true;
    setDocumentLoading(true);
    setDocumentError(null);

    fetchMaterialJsonDocument(selectedMaterialId)
      .then((nextDocument) => {
        if (!active) {
          return;
        }
        setDocument(nextDocument);
        setBaselineDocument(cloneDocument(nextDocument));
        setSelectedNodeKey(toNodeKey({ kind: 'material', materialId: nextDocument.id }));
        setSelectedLibraryItemId(null);
        setPendingChanges([]);
        setDocumentLoading(false);
      })
      .catch((nextError) => {
        if (!active) {
          return;
        }
        setDocument(null);
        setDocumentError(nextError instanceof Error ? nextError.message : 'Unknown error');
        setDocumentLoading(false);
      });

    return () => {
      active = false;
    };
  }, [selectedMaterialId]);

  const selectedNode = selectedNodeKey ? parseNodeKey(selectedNodeKey) : null;
  const selectedUnit =
    document && selectedNode && selectedNode.kind !== 'material'
      ? findUnit(document, selectedNode.unitId)
      : null;
  const selectedContent =
    document && selectedNode && (selectedNode.kind === 'content' || selectedNode.kind === 'resource')
      ? findContent(document, selectedNode.unitId, selectedNode.contentId)
      : null;
  const selectedResource =
    document && selectedNode?.kind === 'resource'
      ? document.assets.find((asset) => asset.id === selectedNode.assetId) ?? null
      : null;

  const targetUnit = selectedNode?.kind === 'unit' || selectedNode?.kind === 'content' || selectedNode?.kind === 'resource'
    ? selectedUnit
    : null;

  const contentLibrary = useMemo<ContentLibraryItem[]>(() => {
    if (!document) {
      return [];
    }

    return document.units.flatMap((unit) =>
      unit.sections.map((content) => ({
        content,
        sourceUnit: unit,
        resources: getResourceLinks(document, content),
        preview: createPreview(content),
      })),
    );
  }, [document]);

  const changeMap = useMemo(() => {
    return pendingChanges.reduce<Record<string, PendingChange>>((result, current) => {
      result[current.id] = current;
      return result;
    }, {});
  }, [pendingChanges]);

  const materialHasChanges = pendingChanges.length > 0;

  function getChangeToneClass(kind: PendingChange['kind']) {
    switch (kind) {
      case 'added':
        return 'change-tone-added';
      case 'updated':
        return 'change-tone-updated';
      case 'deleted':
        return 'change-tone-deleted';
      case 'reordered':
        return 'change-tone-reordered';
      case 'assigned':
        return 'change-tone-assigned';
    }
  }

  function getNodeChangeTone(node: EditorNode) {
    if (node.kind === 'material') {
      return materialHasChanges ? 'change-tone-updated' : '';
    }

    if (node.kind === 'unit') {
      const directChange = changeMap[toNodeKey(node)];
      if (directChange) {
        return getChangeToneClass(directChange.kind);
      }

      const childPrefix = `:${node.unitId}:`;
      const childChange = pendingChanges.find((change) => change.id.includes(childPrefix));
      return childChange ? getChangeToneClass(childChange.kind) : '';
    }

    if (node.kind === 'content') {
      const change = changeMap[toNodeKey(node)];
      return change ? getChangeToneClass(change.kind) : '';
    }

    return '';
  }

  function getNodeChangeClass(node: EditorNode) {
    if (node.kind === 'material') {
      const tone = getNodeChangeTone(node);
      return materialHasChanges ? `materials-tree-node-changed ${tone}`.trim() : '';
    }

    if (node.kind === 'unit') {
      const unitPrefix = `:${node.unitId}`;
      const hasChanges = pendingChanges.some(
        (change) =>
          change.id === toNodeKey(node) ||
          change.id.includes(`${unitPrefix}:`) ||
          change.label.includes(node.unitId),
      );
      const tone = getNodeChangeTone(node);
      return hasChanges ? `materials-tree-node-changed ${tone}`.trim() : '';
    }

    if (node.kind === 'content') {
      const tone = getNodeChangeTone(node);
      return changeMap[toNodeKey(node)] ? `materials-tree-node-changed ${tone}`.trim() : '';
    }

    return '';
  }

  const treeData = useMemo<TreeDataNode[]>(() => {
    if (!document) {
      return [];
    }

    const makeDropTitle = (label: string, node: EditorNode, accent?: string) => {
      const nodeClass = getNodeChangeClass(node);
      const nodeKey = toNodeKey(node);
      const isDropTarget = dragOverNodeKey === nodeKey;

      return (
      <div
        className={`materials-tree-node ${draggingLibraryItemId ? 'materials-tree-node-droppable' : ''} ${isDropTarget ? 'materials-tree-node-drop-target' : ''} ${nodeClass}`}
        onDragEnter={(event) => {
          if (isTeacher || !draggingLibraryItemId) {
            return;
          }
          event.preventDefault();
          event.stopPropagation();
          setDragOverNodeKey(nodeKey);
        }}
        onDragOver={(event) => {
          if (isTeacher || !draggingLibraryItemId) {
            return;
          }
          event.preventDefault();
          event.stopPropagation();
          event.dataTransfer.dropEffect = 'copy';
          if (dragOverNodeKey !== nodeKey) {
            setDragOverNodeKey(nodeKey);
          }
        }}
        onDragLeave={(event) => {
          if (isTeacher || !draggingLibraryItemId) {
            return;
          }
          event.stopPropagation();
          if (dragOverNodeKey === nodeKey) {
            setDragOverNodeKey(null);
          }
        }}
        onDrop={(event) => {
          if (isTeacher || !draggingLibraryItemId) {
            return;
          }
          event.preventDefault();
          event.stopPropagation();
          const dragId = draggingLibraryItemId || event.dataTransfer.getData('text/plain');
          const droppedItem = contentLibrary.find((item) => item.content.id === dragId);
          if (!droppedItem) {
            return;
          }
          assignContentToNode(droppedItem, node);
          setDraggingLibraryItemId(null);
          setDragOverNodeKey(null);
        }}
      >
        <span>{label}</span>
        {accent ? <Tag color={accent}>{accent}</Tag> : null}
      </div>
      );
    };

    return [
      {
        key: toNodeKey({ kind: 'material', materialId: document.id }),
        title: makeDropTitle(document.title, { kind: 'material', materialId: document.id }),
        children: document.units.map((unit) => ({
          key: toNodeKey({ kind: 'unit', materialId: document.id, unitId: unit.id }),
          title: makeDropTitle(unit.title, { kind: 'unit', materialId: document.id, unitId: unit.id }),
          children: unit.sections.map((section) => ({
            key: toNodeKey({
              kind: 'content',
              materialId: document.id,
              unitId: unit.id,
              contentId: section.id,
            }),
            title: makeDropTitle(
              `${section.type} · ${section.title}`,
              {
                kind: 'content',
                materialId: document.id,
                unitId: unit.id,
                contentId: section.id,
              },
              section.type,
            ),
            children: getResourceLinks(document, section).map((asset) => ({
              key: toNodeKey({
                kind: 'resource',
                materialId: document.id,
                unitId: unit.id,
                contentId: section.id,
                assetId: asset.id,
              }),
              title: `${asset.asset_type} · ${asset.file_name}`,
              isLeaf: true,
            })),
          })),
        })),
      },
    ];
  }, [changeMap, contentLibrary, document, dragOverNodeKey, draggingLibraryItemId, isTeacher, materialHasChanges, pendingChanges]);

  const filteredLibrary = useMemo(() => {
    const keyword = libraryKeyword.trim().toLowerCase();
    return contentLibrary.filter((item) => {
      const matchType = libraryType === 'all' || item.content.type === libraryType;
      const matchUnit = libraryUnit === 'all' || item.sourceUnit.id === libraryUnit;
      const matchKeyword =
        keyword.length === 0 ||
        item.content.title.toLowerCase().includes(keyword) ||
        item.sourceUnit.title.toLowerCase().includes(keyword) ||
        item.preview.toLowerCase().includes(keyword);
      return matchType && matchUnit && matchKeyword;
    });
  }, [contentLibrary, libraryKeyword, libraryType, libraryUnit]);

  const selectedLibraryItem =
    filteredLibrary.find((item) => item.content.id === selectedLibraryItemId) ??
    contentLibrary.find((item) => item.content.id === selectedLibraryItemId) ??
    null;

  function updateDocument(mutator: (draft: MaterialJsonV2Document) => void) {
    setDocument((current) => {
      if (!current) {
        return current;
      }
      const draft = cloneDocument(current);
      mutator(draft);
      return draft;
    });
  }

  function registerChange(change: PendingChange) {
    setPendingChanges((current) => {
      const index = current.findIndex((item) => item.id === change.id);
      if (index < 0) {
        return [change, ...current];
      }

      const next = [...current];
      next[index] = change;
      return next;
    });
  }

  function handleTreeDrop(info: Parameters<NonNullable<TreeProps['onDrop']>>[0]) {
    if (!document) {
      return;
    }

    const dragNode = parseNodeKey(String(info.dragNode.key));
    const dropNode = parseNodeKey(String(info.node.key));
    if (!dragNode || !dropNode) {
      return;
    }

    if (dragNode.kind === 'unit' && dropNode.kind === 'unit' && dragNode.materialId === dropNode.materialId) {
      updateDocument((draft) => {
        const dragIndex = draft.units.findIndex((unit) => unit.id === dragNode.unitId);
        const dropIndex = draft.units.findIndex((unit) => unit.id === dropNode.unitId);
        if (dragIndex < 0 || dropIndex < 0) {
          return;
        }
        const [moved] = draft.units.splice(dragIndex, 1);
        const targetIndex = info.dropPosition > dropIndex ? dropIndex + 1 : dropIndex;
        draft.units.splice(targetIndex, 0, moved);
        renumberUnits(draft);
      });
      registerChange({
        id: toNodeKey({ kind: 'material', materialId: dragNode.materialId }),
        label: `已调整单元顺序：${findUnit(document, dragNode.unitId)?.title ?? dragNode.unitId}`,
        kind: 'reordered',
      });
      return;
    }

    if (
      dragNode.kind === 'content' &&
      dropNode.kind === 'content' &&
      dragNode.materialId === dropNode.materialId &&
      dragNode.unitId === dropNode.unitId
    ) {
      updateDocument((draft) => {
        const unit = findUnit(draft, dragNode.unitId);
        if (!unit) {
          return;
        }
        const dragIndex = unit.sections.findIndex((section) => section.id === dragNode.contentId);
        const dropIndex = unit.sections.findIndex((section) => section.id === dropNode.contentId);
        if (dragIndex < 0 || dropIndex < 0) {
          return;
        }
        const [moved] = unit.sections.splice(dragIndex, 1);
        const targetIndex = info.dropPosition > dropIndex ? dropIndex + 1 : dropIndex;
        unit.sections.splice(targetIndex, 0, moved);
        renumberContents(unit);
      });
      registerChange({
        id: toNodeKey({ kind: 'unit', materialId: dragNode.materialId, unitId: dragNode.unitId }),
        label: `已调整内容顺序：${findUnit(document, dragNode.unitId)?.title ?? dragNode.unitId}`,
        kind: 'reordered',
      });
    }
  }

  function removeCurrent() {
    if (!document || !selectedNode || selectedNode.kind === 'material' || isTeacher) {
      return;
    }

    updateDocument((draft) => {
      if (selectedNode.kind === 'unit') {
        const removedUnit = findUnit(draft, selectedNode.unitId);
        draft.units = draft.units.filter((unit) => unit.id !== selectedNode.unitId);
        renumberUnits(draft);
        registerChange({
          id: `deleted:${selectedNode.unitId}`,
          label: `已删除单元：${removedUnit?.title ?? selectedNode.unitId}`,
          kind: 'deleted',
        });
        return;
      }

      if (selectedNode.kind === 'content') {
        const unit = findUnit(draft, selectedNode.unitId);
        if (!unit) {
          return;
        }
        const removedContent = unit.sections.find((section) => section.id === selectedNode.contentId);
        unit.sections = unit.sections.filter((section) => section.id !== selectedNode.contentId);
        renumberContents(unit);
        registerChange({
          id: `deleted:${selectedNode.contentId}`,
          label: `已删除内容：${removedContent?.title ?? selectedNode.contentId}`,
          kind: 'deleted',
        });
        return;
      }

      if (selectedNode.kind === 'resource') {
        const content = findContent(draft, selectedNode.unitId, selectedNode.contentId);
        if (!content) {
          return;
        }
        content.content = removeAssetRef(content.content, selectedNode.assetId);
        registerChange({
          id: toNodeKey({
            kind: 'content',
            materialId: document.id,
            unitId: selectedNode.unitId,
            contentId: selectedNode.contentId,
          }),
          label: `已移除资源：${selectedNode.assetId}`,
          kind: 'updated',
        });
      }
    });
    setSelectedNodeKey(toNodeKey({ kind: 'material', materialId: document.id }));
  }

  function assignContentToNode(item: ContentLibraryItem, node: EditorNode) {
    if (!document || isTeacher) {
      return;
    }

    const unitId =
      node.kind === 'unit'
        ? node.unitId
        : node.kind === 'content'
          ? node.unitId
          : node.kind === 'resource'
            ? node.unitId
            : null;

    if (!unitId) {
      return;
    }

    const copiedContentId = `${item.content.id}-copy-${Date.now()}`;

    updateDocument((draft) => {
      const unit = findUnit(draft, unitId);
      if (!unit) {
        return;
      }

      const copiedContent = structuredClone(item.content);
      copiedContent.id = copiedContentId;
      copiedContent.sort_order = unit.sections.length + 1;
      copiedContent.title =
        unit.id === item.sourceUnit.id ? `${item.content.title}（复制）` : item.content.title;

      unit.sections.push(copiedContent);
      renumberContents(unit);

      for (const asset of item.resources) {
        if (!draft.assets.find((current) => current.id === asset.id)) {
          draft.assets.push(structuredClone(asset));
        }
      }
    });

    registerChange({
      id: toNodeKey({
        kind: 'content',
        materialId: document.id,
        unitId,
        contentId: copiedContentId,
      }),
      label: `已加入内容：${item.content.title}`,
      kind: 'assigned',
    });

    registerChange({
      id: toNodeKey({ kind: 'unit', materialId: document.id, unitId }),
      label: `已向单元加入内容：${item.content.title}`,
      kind: 'updated',
    });

    const targetLabel =
      node.kind === 'unit'
        ? findUnit(document, node.unitId)?.title
        : node.kind === 'content' || node.kind === 'resource'
          ? findUnit(document, node.unitId)?.title
          : document.title;
    messageApi.success(`已把「${item.content.title}」加入 ${targetLabel ?? '当前目录'}`);
  }

  function submitChanges() {
    if (!document || pendingChanges.length === 0) {
      return;
    }

    setBaselineDocument(cloneDocument(document));
    setPendingChanges([]);
    messageApi.success('已确认当前改动。后端持久化下一步接入。');
  }

  function resetChanges() {
    if (!baselineDocument) {
      return;
    }

    setDocument(cloneDocument(baselineDocument));
    setPendingChanges([]);
    messageApi.info('已重置到上次确认状态。');
  }

  function assignContentToTarget(item: ContentLibraryItem) {
    if (!document || !targetUnit) {
      return;
    }
    assignContentToNode(item, {
      kind: 'unit',
      materialId: document.id,
      unitId: targetUnit.id,
    } as EditorNode);
  }

  const summaryText = (() => {
    if (selectedResource) {
      return `当前选中资源：${selectedResource.file_name}`;
    }
    if (selectedContent) {
      return `当前选中内容：${selectedContent.title}`;
    }
    if (selectedUnit) {
      return `当前目标单元：${selectedUnit.title}`;
    }
    if (document) {
      return `当前教材：${document.title}`;
    }
    return '选择教材后查看目录';
  })();

  return (
    <ModuleFrame
      eyebrow="Materials"
      title={isTeacher ? '教学内容' : '教材内容'}
      compact
      summary="页面收成三块：左边切教材，中间整理目录，右边从内容素材库里筛选并加入当前单元。目录支持拖拽，内容和资源都尽量按业务语义展示。"
      metrics={[
        { label: '教材总数', value: String(library.length) },
        { label: '当前单元', value: String(document?.units.length ?? 0) },
        { label: '内容块', value: String(contentLibrary.length) },
      ]}
    >
      {contextHolder}
      <PageToolbar
        title="教材目录与内容素材库"
        description="不再让用户碰 JSON。左边只做教材切换，中间只做目录结构，右边按内容块来筛选和分配，资源作为内容附属信息展示。"
        actions={
          <Space wrap>
            <Button onClick={resetChanges} disabled={!baselineDocument || pendingChanges.length === 0 || isTeacher}>
              重置改动{pendingChanges.length > 0 ? ` (${pendingChanges.length})` : ''}
            </Button>
            <Button type="primary" onClick={submitChanges} disabled={pendingChanges.length === 0 || isTeacher}>
              提交改动{pendingChanges.length > 0 ? ` (${pendingChanges.length})` : ''}
            </Button>
            <Button danger onClick={removeCurrent} disabled={!selectedNode || selectedNode.kind === 'material' || isTeacher}>
              删除当前节点
            </Button>
            {document ? (
              <Button href={getMaterialJsonExportUrl(document.id)} target="_blank">
                导出 JSON
              </Button>
            ) : null}
          </Space>
        }
      />

      {loading ? <Alert type="info" message="正在读取教材列表..." showIcon className="login-alert" /> : null}
      {error ? <Alert type="error" message={`教材列表加载失败：${error}`} showIcon className="login-alert" /> : null}
      {documentLoading ? <Alert type="info" message="正在读取教材目录..." showIcon className="login-alert" /> : null}
      {documentError ? <Alert type="error" message={`教材目录加载失败：${documentError}`} showIcon className="login-alert" /> : null}
      {pendingChanges.length > 0 ? (
        <Alert
          type="warning"
          showIcon
          className="login-alert"
          message={`当前有 ${pendingChanges.length} 项未提交改动`}
          description="所有已改动节点和它们的上级目录都会直接用背景色高亮；删除项不会再出现在树里，会统一列在右侧改动清单中。"
        />
      ) : null}

      <div className="materials-editor-layout">
        <Card title="教材列表" className="module-card materials-pane">
          <List
            dataSource={library}
            renderItem={(item) => (
              <List.Item
                className={[
                  'material-list-item',
                  item.id === selectedMaterialId ? 'material-list-item-active' : '',
                  item.id === selectedMaterialId && materialHasChanges
                    ? `material-list-item-changed change-tone-updated`
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => setSelectedMaterialId(item.id)}
              >
                <Space direction="vertical" size={4} className="full-width">
                  <Space wrap>
                    <Typography.Text strong>{item.title}</Typography.Text>
                    <Tag color={item.status === 'published' ? 'green' : 'orange'}>{item.status}</Tag>
                  </Space>
                  <Typography.Text type="secondary">
                    {item.series} / {item.level} / {item.unit_count} 单元 / {item.resource_count} 资源
                  </Typography.Text>
                </Space>
              </List.Item>
            )}
          />
        </Card>

        <Card title="教材目录" extra={<Typography.Text type="secondary">{summaryText}</Typography.Text>} className="module-card materials-pane">
          {document ? (
            <Tree
              draggable={!isTeacher && !draggingLibraryItemId}
              blockNode
              defaultExpandAll
              treeData={treeData}
              selectedKeys={selectedNodeKey ? [selectedNodeKey] : []}
              onSelect={(keys) => setSelectedNodeKey(String(keys[0] ?? ''))}
              onDrop={handleTreeDrop}
            />
          ) : (
            <Empty description="选择教材后查看目录" />
          )}
        </Card>

        <Card title="内容素材库" className="module-card materials-pane materials-editor-panel">
          <div className="materials-library-toolbar">
            <Space wrap className="full-width">
              <Input
                value={libraryKeyword}
                onChange={(event) => setLibraryKeyword(event.target.value)}
                placeholder="检索标题、单元、摘要"
                className="toolbar-input"
              />
              <Select
                value={libraryType}
                onChange={setLibraryType}
                className="toolbar-select"
                options={[
                  { value: 'all', label: '全部类型' },
                  { value: 'article', label: '文章' },
                  { value: 'dialogue', label: '会话 / 音频' },
                  { value: 'vocabulary', label: '词汇' },
                  { value: 'grammar', label: '语法' },
                  { value: 'exercise', label: '习题' },
                  { value: 'homework', label: '作业' },
                  { value: 'resource', label: '资源' },
                ]}
              />
              <Select
                value={libraryUnit}
                onChange={setLibraryUnit}
                className="toolbar-select"
                options={[
                  { value: 'all', label: '全部单元' },
                  ...(document?.units.map((unit) => ({ value: unit.id, label: unit.title })) ?? []),
                ]}
              />
            </Space>

            <Typography.Text type="secondary" className="materials-library-helper">
              先在中间选中一个目标单元，再从这里把内容块直接加入目录。资源信息会跟着内容一起带过去。
            </Typography.Text>
          </div>

          <div className="materials-library-stack">
            <div className="materials-library-scroll">
              <List
                className="materials-library-list"
                dataSource={filteredLibrary}
                renderItem={(item) => (
                  <List.Item
                    draggable={!isTeacher}
                    className={[
                      'material-list-item',
                      item.content.id === selectedLibraryItemId ? 'material-list-item-active' : '',
                      (() => {
                        const contentNode = {
                          kind: 'content' as const,
                          materialId: document?.id ?? 'material',
                          unitId: item.sourceUnit.id,
                          contentId: item.content.id,
                        };
                        const tone = getNodeChangeTone(contentNode);
                        return changeMap[toNodeKey(contentNode)]
                          ? `material-list-item-changed ${tone}`.trim()
                          : '';
                      })(),
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onDragStart={(event) => {
                      setDraggingLibraryItemId(item.content.id);
                      event.dataTransfer.effectAllowed = 'copy';
                      event.dataTransfer.setData('text/plain', item.content.id);
                    }}
                    onDragEnd={() => {
                      setDraggingLibraryItemId(null);
                      setDragOverNodeKey(null);
                    }}
                    onClick={() => setSelectedLibraryItemId(item.content.id)}
                    actions={[
                      <Button
                        key="assign"
                        type="link"
                        disabled={!targetUnit || isTeacher}
                        onClick={() => assignContentToTarget(item)}
                      >
                        加入当前单元
                      </Button>,
                    ]}
                  >
                    <Space direction="vertical" size={4} className="full-width">
                      <Space wrap>
                        <Typography.Text strong>{item.content.title}</Typography.Text>
                        <Tag color="blue">{item.content.type}</Tag>
                        <Tag>{item.sourceUnit.title}</Tag>
                      </Space>
                      <Typography.Text type="secondary">{item.preview}</Typography.Text>
                      <Typography.Text type="secondary">关联资源 {item.resources.length}</Typography.Text>
                    </Space>
                  </List.Item>
                )}
              />
            </div>

            <Card title="内容详情" className="module-card materials-detail-card">
              <div className="materials-detail-scroll">
                {!selectedLibraryItem ? <Empty description="从左侧选择一个内容块" /> : null}

                {selectedLibraryItem ? (
                  <Space direction="vertical" size={12} className="full-width">
                    <Space wrap>
                      <Typography.Text strong>{selectedLibraryItem.content.title}</Typography.Text>
                      <Tag color="blue">{selectedLibraryItem.content.type}</Tag>
                      <Tag>{selectedLibraryItem.sourceUnit.title}</Tag>
                    </Space>
                    <Typography.Paragraph className="card-description">
                      {selectedLibraryItem.preview}
                    </Typography.Paragraph>
                    <Typography.Text type="secondary">内容结构：</Typography.Text>
                    <pre className="materials-content-preview">
                      {JSON.stringify(selectedLibraryItem.content.content, null, 2)}
                    </pre>
                    <Typography.Text type="secondary">关联资源：</Typography.Text>
                    <List
                      size="small"
                      dataSource={selectedLibraryItem.resources}
                      renderItem={(asset) => (
                        <List.Item
                          actions={[
                            <Button key="preview" type="link" href={`${MEDIA_BASE_URL}${asset.file_url}`} target="_blank">
                              查看
                            </Button>,
                          ]}
                        >
                          <Space wrap>
                            <Typography.Text>{asset.file_name}</Typography.Text>
                            <Tag>{asset.asset_type}</Tag>
                          </Space>
                        </List.Item>
                      )}
                    />
                  </Space>
                ) : null}

                {pendingChanges.length > 0 ? (
                  <>
                    <Typography.Text type="secondary">待提交改动：</Typography.Text>
                    <List
                      size="small"
                      dataSource={pendingChanges}
                      renderItem={(change) => (
                        <List.Item>
                          <Space wrap>
                            <Tag color={getChangeColor(change.kind)}>{getChangeLabel(change.kind)}</Tag>
                            <Typography.Text>{change.label}</Typography.Text>
                          </Space>
                        </List.Item>
                      )}
                    />
                  </>
                ) : null}
              </div>
            </Card>
          </div>
        </Card>
      </div>
    </ModuleFrame>
  );
}

function getChangeLabel(kind: PendingChange['kind']) {
  switch (kind) {
    case 'added':
      return '新增';
    case 'updated':
      return '已修改';
    case 'deleted':
      return '已删除';
    case 'reordered':
      return '已调整';
    case 'assigned':
      return '已分配';
  }
}

function getChangeColor(kind: PendingChange['kind']) {
  switch (kind) {
    case 'added':
      return 'green';
    case 'updated':
      return 'gold';
    case 'deleted':
      return 'red';
    case 'reordered':
      return 'purple';
    case 'assigned':
      return 'blue';
  }
}

function removeAssetRef(value: unknown, targetAssetId: string): Record<string, unknown> {
  if (Array.isArray(value)) {
    return { items: value.filter((item) => item !== targetAssetId) };
  }

  if (!value || typeof value !== 'object') {
    return {};
  }

  const nextValue: Record<string, unknown> = {};
  for (const [key, current] of Object.entries(value)) {
    if (current === targetAssetId) {
      continue;
    }

    if (Array.isArray(current)) {
      nextValue[key] = current.filter((item) => {
        if (item === targetAssetId) {
          return false;
        }
        if (item && typeof item === 'object' && 'asset_ref' in item) {
          return (item as { asset_ref?: string }).asset_ref !== targetAssetId;
        }
        return true;
      });
      continue;
    }

    nextValue[key] = current;
  }
  return nextValue;
}
