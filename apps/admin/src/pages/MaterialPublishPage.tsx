import { Alert, Button, Card, Empty, List, Space, Tag, Typography, message } from 'antd';
import { useEffect, useMemo, useState } from 'react';

import { ModuleFrame } from '../components/ModuleFrame';
import { useMaterialData } from '../hooks/useMaterialData';
import {
  archiveMaterialReleaseVersion,
  deleteMaterialReleaseVersion,
  fetchMaterialReleaseVersionDetail,
  fetchMaterialReleaseVersions,
  goLiveMaterialReleaseVersion,
  type MaterialLibraryItem,
  type MaterialReleaseVersionDetail,
  type MaterialReleaseVersionItem,
} from '../lib/api';

type PackageSnapshot = Record<string, unknown>;

function getReleaseStatusLabel(status: string) {
  switch (status) {
    case 'live':
      return '线上版本';
    case 'published':
      return '已生成';
    case 'archived':
      return '已归档';
    case 'draft':
      return '待上线';
    default:
      return status;
  }
}

function getReleaseStatusColor(status: string) {
  switch (status) {
    case 'live':
      return 'green';
    case 'published':
      return 'blue';
    case 'archived':
      return 'default';
    case 'draft':
      return 'gold';
    default:
      return 'default';
  }
}

function countUnits(snapshot: PackageSnapshot) {
  const courses = Array.isArray(snapshot.courses) ? snapshot.courses : [];
  return courses.reduce((total, course) => {
    const units =
      course && typeof course === 'object' && Array.isArray((course as { units?: unknown[] }).units)
        ? (course as { units: unknown[] }).units
        : [];
    return total + units.length;
  }, 0);
}

function countContents(snapshot: PackageSnapshot) {
  const courses = Array.isArray(snapshot.courses) ? snapshot.courses : [];
  return courses.reduce((total, course) => {
    const units =
      course && typeof course === 'object' && Array.isArray((course as { units?: unknown[] }).units)
        ? (course as { units: unknown[] }).units
        : [];
    return (
      total +
      units.reduce<number>((unitTotal, unit) => {
        const contents =
          unit && typeof unit === 'object' && Array.isArray((unit as { contents?: unknown[] }).contents)
            ? (unit as { contents: unknown[] }).contents
            : [];
        return unitTotal + contents.length;
      }, 0)
    );
  }, 0);
}

function countResources(snapshot: PackageSnapshot) {
  const courses = Array.isArray(snapshot.courses) ? snapshot.courses : [];
  return courses.reduce((total, course) => {
    const units =
      course && typeof course === 'object' && Array.isArray((course as { units?: unknown[] }).units)
        ? (course as { units: unknown[] }).units
        : [];
    return (
      total +
      units.reduce<number>((unitTotal, unit) => {
        const contents =
          unit && typeof unit === 'object' && Array.isArray((unit as { contents?: unknown[] }).contents)
            ? (unit as { contents: unknown[] }).contents
            : [];
        return (
          unitTotal +
          contents.reduce<number>((contentTotal, content) => {
            const resources =
              content &&
              typeof content === 'object' &&
              Array.isArray((content as { resources?: unknown[] }).resources)
                ? (content as { resources: unknown[] }).resources
                : [];
            return contentTotal + resources.length;
          }, 0)
        );
      }, 0)
    );
  }, 0);
}

function formatDelta(current: number, previous: number) {
  const diff = current - previous;
  if (diff > 0) {
    return `+${diff}`;
  }
  if (diff < 0) {
    return `${diff}`;
  }
  return '0';
}

function getSnapshotUnits(snapshot: PackageSnapshot) {
  const courses = Array.isArray(snapshot.courses) ? snapshot.courses : [];
  return courses.flatMap((course) => {
    const units =
      course && typeof course === 'object' && Array.isArray((course as { units?: unknown[] }).units)
        ? (course as { units: unknown[] }).units
        : [];
    return units
      .map((unit) => {
        if (!unit || typeof unit !== 'object') {
          return null;
        }
        const record = unit as { id?: unknown; title?: unknown };
        return {
          id: String(record.id ?? ''),
          title: String(record.title ?? ''),
        };
      })
      .filter((unit): unit is { id: string; title: string } => Boolean(unit?.id));
  });
}

function getSnapshotContents(snapshot: PackageSnapshot) {
  const courses = Array.isArray(snapshot.courses) ? snapshot.courses : [];
  return courses.flatMap((course) => {
    const units =
      course && typeof course === 'object' && Array.isArray((course as { units?: unknown[] }).units)
        ? (course as { units: unknown[] }).units
        : [];
    return units.flatMap((unit) => {
      if (!unit || typeof unit !== 'object') {
        return [];
      }
      const unitRecord = unit as { title?: unknown; contents?: unknown[] };
      const unitTitle = String(unitRecord.title ?? '');
      const contents = Array.isArray(unitRecord.contents) ? unitRecord.contents : [];
      return contents
        .map((content) => {
          if (!content || typeof content !== 'object') {
            return null;
          }
          const record = content as { id?: unknown; title?: unknown; type?: unknown };
          return {
            id: String(record.id ?? ''),
            title: String(record.title ?? ''),
            type: String(record.type ?? ''),
            unitTitle,
          };
        })
        .filter(
          (
            content,
          ): content is { id: string; title: string; type: string; unitTitle: string } =>
            Boolean(content?.id),
        );
    });
  });
}

function getItemChanges<T extends { id: string }>(current: T[], previous: T[]) {
  const previousIds = new Set(previous.map((item) => item.id));
  const currentIds = new Set(current.map((item) => item.id));
  return {
    added: current.filter((item) => !previousIds.has(item.id)),
    removed: previous.filter((item) => !currentIds.has(item.id)),
  };
}

function getContentTypeLabel(type: string) {
  switch (type) {
    case 'dialogue':
      return '对话';
    case 'article':
      return '课文';
    case 'vocabulary':
      return '词汇';
    case 'grammar':
      return '语法';
    case 'exercise':
      return '习题';
    case 'homework':
      return '作业';
    case 'resource':
      return '资料';
    case 'reading':
      return '阅读';
    case 'listening':
      return '听力';
    default:
      return type || '内容';
  }
}

export function MaterialPublishPage() {
  const { library, loading, error } = useMaterialData();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);
  const [releases, setReleases] = useState<MaterialReleaseVersionItem[]>([]);
  const [selectedReleaseId, setSelectedReleaseId] = useState<string | null>(null);
  const [selectedRelease, setSelectedRelease] = useState<MaterialReleaseVersionDetail | null>(null);
  const [liveReleaseDetail, setLiveReleaseDetail] = useState<MaterialReleaseVersionDetail | null>(null);
  const [previousReleaseDetail, setPreviousReleaseDetail] = useState<MaterialReleaseVersionDetail | null>(null);
  const [releaseLoading, setReleaseLoading] = useState(false);
  const [releaseDetailLoading, setReleaseDetailLoading] = useState(false);
  const [releaseError, setReleaseError] = useState<string | null>(null);

  const selectedMaterial = useMemo(
    () => library.find((item) => item.id === selectedMaterialId) ?? null,
    [library, selectedMaterialId],
  );
  const liveRelease = releases.find((item) => item.is_live) ?? null;
  const selectedReleaseIndex = useMemo(
    () => releases.findIndex((item) => item.id === selectedReleaseId),
    [releases, selectedReleaseId],
  );
  const previousRelease = selectedReleaseIndex >= 0 ? releases[selectedReleaseIndex + 1] ?? null : null;

  useEffect(() => {
    if (!selectedMaterialId && library.length > 0) {
      setSelectedMaterialId(library[0].id);
    }
  }, [library, selectedMaterialId]);

  useEffect(() => {
    if (!selectedMaterialId) {
      setReleases([]);
      setSelectedReleaseId(null);
      setSelectedRelease(null);
      setLiveReleaseDetail(null);
      setPreviousReleaseDetail(null);
      return;
    }

    let active = true;
    setReleaseLoading(true);
    setReleaseError(null);
    setSelectedReleaseId(null);
    setSelectedRelease(null);
    setLiveReleaseDetail(null);
    setPreviousReleaseDetail(null);

    fetchMaterialReleaseVersions(selectedMaterialId)
      .then((nextReleases) => {
        if (!active) {
          return;
        }
        setReleases(nextReleases);
        setSelectedReleaseId(nextReleases[0]?.id ?? null);
        setReleaseLoading(false);
      })
      .catch((nextError) => {
        if (!active) {
          return;
        }
        setReleaseError(nextError instanceof Error ? nextError.message : 'Unknown error');
        setReleaseLoading(false);
      });

    return () => {
      active = false;
    };
  }, [selectedMaterialId]);

  useEffect(() => {
    if (!selectedMaterialId || !selectedReleaseId) {
      setSelectedRelease(null);
      setPreviousReleaseDetail(null);
      return;
    }

    let active = true;
    setReleaseDetailLoading(true);
    setReleaseError(null);

    fetchMaterialReleaseVersionDetail(selectedMaterialId, selectedReleaseId)
      .then((detail) => {
        if (!active) {
          return;
        }
        setSelectedRelease(detail);
        setReleaseDetailLoading(false);
      })
      .catch((nextError) => {
        if (!active) {
          return;
        }
        setSelectedRelease(null);
        setReleaseError(nextError instanceof Error ? nextError.message : 'Unknown error');
        setReleaseDetailLoading(false);
      });

    return () => {
      active = false;
    };
  }, [selectedMaterialId, selectedReleaseId]);

  useEffect(() => {
    if (!selectedMaterialId || !liveRelease) {
      setLiveReleaseDetail(null);
      return;
    }

    if (selectedRelease?.id === liveRelease.id) {
      setLiveReleaseDetail(selectedRelease);
      return;
    }

    let active = true;
    fetchMaterialReleaseVersionDetail(selectedMaterialId, liveRelease.id)
      .then((detail) => {
        if (!active) {
          return;
        }
        setLiveReleaseDetail(detail);
      })
      .catch((nextError) => {
        if (!active) {
          return;
        }
        setLiveReleaseDetail(null);
        setReleaseError(nextError instanceof Error ? nextError.message : 'Unknown error');
      });

    return () => {
      active = false;
    };
  }, [liveRelease, selectedMaterialId, selectedRelease]);

  useEffect(() => {
    if (!selectedMaterialId || !previousRelease) {
      setPreviousReleaseDetail(null);
      return;
    }

    if (selectedRelease?.id === previousRelease.id) {
      setPreviousReleaseDetail(selectedRelease);
      return;
    }

    let active = true;
    fetchMaterialReleaseVersionDetail(selectedMaterialId, previousRelease.id)
      .then((detail) => {
        if (!active) {
          return;
        }
        setPreviousReleaseDetail(detail);
      })
      .catch((nextError) => {
        if (!active) {
          return;
        }
        setPreviousReleaseDetail(null);
        setReleaseError(nextError instanceof Error ? nextError.message : 'Unknown error');
      });

    return () => {
      active = false;
    };
  }, [previousRelease, selectedMaterialId, selectedRelease]);

  const liveSummary = useMemo(() => {
    if (!liveReleaseDetail) {
      return null;
    }
    return {
      units: countUnits(liveReleaseDetail.snapshot_json),
      contents: countContents(liveReleaseDetail.snapshot_json),
      resources: countResources(liveReleaseDetail.snapshot_json),
    };
  }, [liveReleaseDetail]);

  const selectedReleaseSummary = useMemo(() => {
    if (!selectedRelease) {
      return null;
    }
    const currentUnits = countUnits(selectedRelease.snapshot_json);
    const currentContents = countContents(selectedRelease.snapshot_json);
    const currentResources = countResources(selectedRelease.snapshot_json);
    const previousUnits = previousReleaseDetail ? countUnits(previousReleaseDetail.snapshot_json) : 0;
    const previousContents = previousReleaseDetail ? countContents(previousReleaseDetail.snapshot_json) : 0;
    const previousResources = previousReleaseDetail ? countResources(previousReleaseDetail.snapshot_json) : 0;
    return {
      currentUnits,
      currentContents,
      currentResources,
      previousUnits,
      previousContents,
      previousResources,
    };
  }, [previousReleaseDetail, selectedRelease]);

  const selectedReleaseChanges = useMemo(() => {
    if (!selectedRelease) {
      return null;
    }
    return {
      units: getItemChanges(
        getSnapshotUnits(selectedRelease.snapshot_json),
        previousReleaseDetail ? getSnapshotUnits(previousReleaseDetail.snapshot_json) : [],
      ),
      contents: getItemChanges(
        getSnapshotContents(selectedRelease.snapshot_json),
        previousReleaseDetail ? getSnapshotContents(previousReleaseDetail.snapshot_json) : [],
      ),
    };
  }, [previousReleaseDetail, selectedRelease]);

  function reloadReleases(nextSelectedReleaseId?: string | null) {
    if (!selectedMaterialId) {
      return Promise.resolve();
    }
    setReleaseLoading(true);
    setReleaseError(null);
    return fetchMaterialReleaseVersions(selectedMaterialId)
      .then((nextReleases) => {
        setReleases(nextReleases);
        setSelectedReleaseId(nextSelectedReleaseId ?? nextReleases[0]?.id ?? null);
        setReleaseLoading(false);
      })
      .catch((nextError) => {
        setReleaseError(nextError instanceof Error ? nextError.message : 'Unknown error');
        setReleaseLoading(false);
      });
  }

  function handleGoLive(releaseId: string) {
    if (!selectedMaterialId) {
      return;
    }
    goLiveMaterialReleaseVersion(selectedMaterialId, releaseId)
      .then((detail) => {
        messageApi.success(`版本 ${detail.version_number} 已上线。`);
        return reloadReleases(detail.id);
      })
      .catch((nextError) => {
        messageApi.error(nextError instanceof Error ? nextError.message : '上线失败');
      });
  }

  function handleArchive(releaseId: string) {
    if (!selectedMaterialId) {
      return;
    }
    archiveMaterialReleaseVersion(selectedMaterialId, releaseId)
      .then((detail) => {
        messageApi.success(`版本 ${detail.version_number} 已下线并归档。`);
        return reloadReleases(detail.id);
      })
      .catch((nextError) => {
        messageApi.error(nextError instanceof Error ? nextError.message : '下线归档失败');
      });
  }

  function handleDelete(releaseId: string) {
    if (!selectedMaterialId) {
      return;
    }
    deleteMaterialReleaseVersion(selectedMaterialId, releaseId)
      .then(() => {
        messageApi.success(`版本 ${selectedRelease?.version_number ?? ''} 已删除。`);
        return reloadReleases(null);
      })
      .catch((nextError) => {
        messageApi.error(nextError instanceof Error ? nextError.message : '删除版本失败');
      });
  }

  const summaryText = selectedMaterial
    ? `当前内容包：${selectedMaterial.title}`
    : '先在左侧选择一个内容包';
  const liveSummaryText = !liveRelease || !liveSummary
    ? '当前没有线上版本'
    : `当前线上：${liveRelease.version_number} · ${liveSummary.units} 单元 / ${liveSummary.contents} 内容 / ${liveSummary.resources} 资源`;

  return (
    <ModuleFrame
      eyebrow="发布台"
      title="发布管理"
      compact
      summary="版本由教材内容页提交后自动生成。这里不再负责生成版本，只负责查看历史版本、上线版本和下线归档。"
      metrics={[
        { label: '内容包', value: String(library.length) },
        { label: '当前版本数', value: String(releases.length) },
        { label: '当前线上', value: liveRelease?.version_number ?? '未上线' },
      ]}
    >
      {contextHolder}

      {loading ? <Alert type="info" message="正在读取内容包列表..." showIcon className="login-alert" /> : null}
      {error ? <Alert type="error" message={`内容包列表加载失败：${error}`} showIcon className="login-alert" /> : null}
      {releaseError ? <Alert type="error" message={`版本数据加载失败：${releaseError}`} showIcon className="login-alert" /> : null}

      <Card
        title="版本工作台"
        extra={<Typography.Text type="secondary">{summaryText}</Typography.Text>}
        className="module-card materials-workbench-card"
      >
        <div className="materials-workbench publish-workbench">
          <div className="materials-workbench-toolbar">
            <div className="materials-workbench-toolbar-row">
              <Typography.Text type="secondary" className="materials-library-helper">
                教材内容页中的“提交改动”会自动新增一个版本。发布管理只做版本查看、上线和下线归档。
              </Typography.Text>
              <Typography.Text type="secondary">{liveSummaryText}</Typography.Text>
            </div>
          </div>

          <div className="publish-header-row">
            <div className="materials-pane-header materials-pane-header-standalone">
              <Typography.Text strong>内容包列表</Typography.Text>
              <Typography.Text type="secondary">{library.length} 个内容包</Typography.Text>
            </div>
            <div className="materials-pane-header materials-pane-header-standalone">
              <Typography.Text strong>版本列表</Typography.Text>
              <Typography.Text type="secondary">
                {selectedMaterial ? `${selectedMaterial.title} · ${releases.length} 个版本` : '请先选择一个内容包'}
              </Typography.Text>
            </div>
            <div className="materials-pane-header materials-pane-header-standalone">
              <Typography.Text strong>版本详情</Typography.Text>
              <Typography.Text type="secondary">
                {selectedRelease ? `${selectedRelease.version_number} · ${getReleaseStatusLabel(selectedRelease.status)}` : '请选择一个版本'}
              </Typography.Text>
            </div>
          </div>

          <div className="publish-content-row">
            <div className="materials-pane materials-pane-embedded">
              <div className="materials-pane-scroll">
                <List
                  dataSource={library}
                  renderItem={(item: MaterialLibraryItem) => (
                    <List.Item
                      className={[
                        'material-list-item',
                        item.id === selectedMaterialId ? 'material-list-item-active' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => setSelectedMaterialId(item.id)}
                    >
                      <Space direction="vertical" size={4} className="full-width">
                        <Typography.Text strong>{item.title}</Typography.Text>
                        <Typography.Text type="secondary">
                          {item.series} / {item.level} / {item.unit_count} 单元 / {item.resource_count} 资源
                        </Typography.Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </div>
            </div>

            <div className="materials-pane materials-pane-embedded">
              <div className="materials-pane-scroll">
                <List
                  loading={releaseLoading}
                  dataSource={releases}
                  locale={{ emptyText: '当前内容包还没有版本记录' }}
                  renderItem={(item) => (
                    <List.Item
                      className={[
                        'material-list-item',
                        item.id === selectedReleaseId ? 'material-list-item-active' : '',
                        item.is_live ? 'material-release-live-item' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => setSelectedReleaseId(item.id)}
                    >
                      <Space direction="vertical" size={4} className="full-width">
                        <Space wrap>
                          <Typography.Text strong>{item.version_number}</Typography.Text>
                          <Tag color={getReleaseStatusColor(item.status)}>
                            {getReleaseStatusLabel(item.status)}
                          </Tag>
                          {item.is_live ? <Tag color="green">当前线上</Tag> : null}
                        </Space>
                        <Typography.Text type="secondary">{item.note || '未填写版本说明'}</Typography.Text>
                        <Typography.Text type="secondary">
                          {item.published_by ?? '未记录提交人'}
                          {item.published_at ? ` · ${new Date(item.published_at).toLocaleString()}` : ''}
                        </Typography.Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </div>
            </div>

            <div className="materials-pane materials-pane-embedded">
              <div className="materials-pane-scroll">
                {releaseDetailLoading ? (
                  <Alert type="info" message="正在读取版本详情..." showIcon className="login-alert" />
                ) : null}
                {!selectedRelease && !releaseDetailLoading ? <Empty description="从左侧选择一个版本查看详情" /> : null}
                {selectedRelease ? (
                  <Space direction="vertical" size={14} className="full-width">
                    <div className="materials-detail-block">
                      <Space wrap>
                        <Typography.Text strong>{selectedRelease.version_number}</Typography.Text>
                        <Tag color={getReleaseStatusColor(selectedRelease.status)}>
                          {getReleaseStatusLabel(selectedRelease.status)}
                        </Tag>
                        {selectedRelease.is_live ? <Tag color="green">当前线上</Tag> : null}
                      </Space>
                      <Typography.Paragraph className="materials-detail-paragraph">
                        {selectedRelease.note || '未填写版本说明'}
                      </Typography.Paragraph>
                    </div>

                    <div className="material-release-diff-grid">
                      <div className="material-release-diff-item">
                        <Typography.Text type="secondary">内容包</Typography.Text>
                        <Typography.Paragraph className="materials-detail-paragraph">
                          {selectedRelease.material_title}
                        </Typography.Paragraph>
                      </div>
                      <div className="material-release-diff-item">
                        <Typography.Text type="secondary">提交时间</Typography.Text>
                        <Typography.Paragraph className="materials-detail-paragraph">
                          {selectedRelease.published_at
                            ? new Date(selectedRelease.published_at).toLocaleString()
                            : '未记录'}
                        </Typography.Paragraph>
                      </div>
                      <div className="material-release-diff-item">
                        <Typography.Text type="secondary">单元数</Typography.Text>
                        <Typography.Paragraph className="materials-detail-paragraph">
                          {countUnits(selectedRelease.snapshot_json)}
                        </Typography.Paragraph>
                      </div>
                      <div className="material-release-diff-item">
                        <Typography.Text type="secondary">内容 / 资源</Typography.Text>
                        <Typography.Paragraph className="materials-detail-paragraph">
                          {countContents(selectedRelease.snapshot_json)} 内容 / {countResources(selectedRelease.snapshot_json)} 资源
                        </Typography.Paragraph>
                      </div>
                    </div>

                    <div className="materials-detail-block">
                      <Typography.Text type="secondary">相对上一版差异</Typography.Text>
                      {selectedReleaseSummary ? (
                        previousRelease ? (
                          <div className="material-release-diff-grid material-release-diff-grid-compact">
                            <div className="material-release-diff-item">
                              <Typography.Text type="secondary">对比版本</Typography.Text>
                              <Typography.Paragraph className="materials-detail-paragraph">
                                {previousRelease.version_number}
                              </Typography.Paragraph>
                            </div>
                            <div className="material-release-diff-item">
                              <Typography.Text type="secondary">单元变化</Typography.Text>
                              <Typography.Paragraph className="materials-detail-paragraph">
                                {formatDelta(selectedReleaseSummary.currentUnits, selectedReleaseSummary.previousUnits)}
                              </Typography.Paragraph>
                            </div>
                            <div className="material-release-diff-item">
                              <Typography.Text type="secondary">内容变化</Typography.Text>
                              <Typography.Paragraph className="materials-detail-paragraph">
                                {formatDelta(selectedReleaseSummary.currentContents, selectedReleaseSummary.previousContents)}
                              </Typography.Paragraph>
                            </div>
                            <div className="material-release-diff-item">
                              <Typography.Text type="secondary">资源变化</Typography.Text>
                              <Typography.Paragraph className="materials-detail-paragraph">
                                {formatDelta(selectedReleaseSummary.currentResources, selectedReleaseSummary.previousResources)}
                              </Typography.Paragraph>
                            </div>
                          </div>
                        ) : (
                          <Typography.Paragraph className="materials-detail-paragraph">
                            这是当前内容包的首个版本，暂时没有上一版可对比。
                          </Typography.Paragraph>
                        )
                      ) : null}
                    </div>

                    {selectedReleaseChanges && previousRelease ? (
                      <div className="materials-detail-block">
                        <Typography.Text type="secondary">具体变更内容</Typography.Text>
                        <div className="material-release-change-columns">
                          <div className="material-release-change-group">
                            <Typography.Text strong>新增单元</Typography.Text>
                            {selectedReleaseChanges.units.added.length > 0 ? (
                              <ul className="material-release-change-list">
                                {selectedReleaseChanges.units.added.slice(0, 5).map((unit) => (
                                  <li key={unit.id}>{unit.title}</li>
                                ))}
                              </ul>
                            ) : (
                              <Typography.Paragraph className="materials-detail-paragraph">
                                本次没有新增单元。
                              </Typography.Paragraph>
                            )}
                          </div>
                          <div className="material-release-change-group">
                            <Typography.Text strong>移除单元</Typography.Text>
                            {selectedReleaseChanges.units.removed.length > 0 ? (
                              <ul className="material-release-change-list">
                                {selectedReleaseChanges.units.removed.slice(0, 5).map((unit) => (
                                  <li key={unit.id}>{unit.title}</li>
                                ))}
                              </ul>
                            ) : (
                              <Typography.Paragraph className="materials-detail-paragraph">
                                本次没有移除单元。
                              </Typography.Paragraph>
                            )}
                          </div>
                          <div className="material-release-change-group">
                            <Typography.Text strong>新增内容</Typography.Text>
                            {selectedReleaseChanges.contents.added.length > 0 ? (
                              <ul className="material-release-change-list">
                                {selectedReleaseChanges.contents.added.slice(0, 5).map((content) => (
                                  <li key={content.id}>
                                    {getContentTypeLabel(content.type)}：{content.title}
                                    {content.unitTitle ? ` · ${content.unitTitle}` : ''}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <Typography.Paragraph className="materials-detail-paragraph">
                                本次没有新增内容。
                              </Typography.Paragraph>
                            )}
                          </div>
                          <div className="material-release-change-group">
                            <Typography.Text strong>移除内容</Typography.Text>
                            {selectedReleaseChanges.contents.removed.length > 0 ? (
                              <ul className="material-release-change-list">
                                {selectedReleaseChanges.contents.removed.slice(0, 5).map((content) => (
                                  <li key={content.id}>
                                    {getContentTypeLabel(content.type)}：{content.title}
                                    {content.unitTitle ? ` · ${content.unitTitle}` : ''}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <Typography.Paragraph className="materials-detail-paragraph">
                                本次没有移除内容。
                              </Typography.Paragraph>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </Space>
                ) : null}
              </div>
            </div>
          </div>

          <div className="materials-workbench-footer">
            <Space wrap>
              <Button
                type="primary"
                onClick={() => selectedRelease && handleGoLive(selectedRelease.id)}
                disabled={!selectedRelease || selectedRelease.is_live}
              >
                上线所选版本
              </Button>
              <Button
                danger
                onClick={() => selectedRelease && handleArchive(selectedRelease.id)}
                disabled={!selectedRelease || selectedRelease.status === 'archived'}
              >
                下线并归档
              </Button>
              <Button
                onClick={() => selectedRelease && handleDelete(selectedRelease.id)}
                disabled={!selectedRelease || selectedRelease.is_live}
              >
                删除所选版本
              </Button>
              <Typography.Text type="secondary">
                版本在教材内容页提交后自动生成；线上版本需要先下线归档后才能删除。
              </Typography.Text>
            </Space>
          </div>
        </div>
      </Card>
    </ModuleFrame>
  );
}
