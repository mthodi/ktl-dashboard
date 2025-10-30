import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Spin, Alert, Row, Col, Statistic, Select, Button, Descriptions, List, Table } from 'antd';
import {
  ArrowLeftOutlined,
  GlobalOutlined,
  DatabaseOutlined,
  CloudServerOutlined,
  ApartmentOutlined
} from '@ant-design/icons';
import { fetchCountryMetrics, fetchCountryHistory, fetchCountrySnapshot } from '@/_utilities/api';
import {
  formatLocalityScore,
  formatDate,
  formatBytes,
  formatNumber
} from '@/_utilities/formatters';
import LocalityPieChart from '@/_components/Charts/LocalityPieChart';
import LocalityTrendChart from '@/_components/Charts/LocalityTrendChart';

const { Option } = Select;

/**
 * Country Detail Page
 * Displays comprehensive metrics for a specific country
 */
export default function CountryDetail() {
  const { code } = useParams();
  const navigate = useNavigate();
  const countryCode = code.toUpperCase();

  const [metrics, setMetrics] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    loadCountryData();
  }, [countryCode]);

  async function loadCountryData() {
    try {
      setLoading(true);
      const [metricsData, historyData] = await Promise.all([
        fetchCountryMetrics(countryCode),
        fetchCountryHistory(countryCode)
      ]);

      setMetrics(metricsData);
      setHistory(historyData);
      setSelectedDate(metricsData.snapshot_date);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSnapshotChange(date) {
    try {
      setLoading(true);
      const snapshotData = await fetchCountrySnapshot(countryCode, date);
      setMetrics(snapshotData);
      setSelectedDate(date);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading && !metrics) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spin size="large" tip="Loading country metrics...">
          <div style={{ padding: 50 }} />
        </Spin>
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error Loading Country Metrics"
        description={error}
        type="error"
        showIcon
        action={
          <Button onClick={() => navigate('/dashboards/countries')}>
            Back to Countries
          </Button>
        }
      />
    );
  }

  if (!metrics) {
    return (
      <Alert
        message="No Data Available"
        description={`No metrics data found for country ${countryCode}`}
        type="info"
        showIcon
        action={
          <Button onClick={() => navigate('/dashboards/countries')}>
            Back to Countries
          </Button>
        }
      />
    );
  }

  const summary = metrics.summary || {};
  const payload = metrics.payload || {};

  // Prepare chart data
  const pieChartData = summary.byte_weighted_locality ? {
    local_bytes: summary.byte_weighted_locality.local_size || 0,
    external_bytes: summary.byte_weighted_locality.external_size || 0,
    local_percentage: summary.byte_weighted_locality.local_pct || 0,
    external_percentage: summary.byte_weighted_locality.external_pct || 0,
  } : null;

  const trendChartData = history.map(h => ({
    date: h.snapshot_date,
    locality_score: h.locality_score
  }));

  return (
    <div className="grid gap-8 grid-cols-12">
      {/* Header Section */}
      <div className="col-span-full">
        <Card>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Button
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate('/dashboards/countries')}
              >
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold mb-1">{metrics.country_name}</h1>
                <p className="text-gray-500">
                  {metrics.country_code} • {metrics.region}
                </p>
              </div>
            </div>
            <div>
              <Select
                value={selectedDate}
                onChange={handleSnapshotChange}
                style={{ width: 200 }}
                placeholder="Select snapshot date"
                loading={loading}
              >
                {history.map(h => (
                  <Option key={h.snapshot_date} value={h.snapshot_date}>
                    {formatDate(h.snapshot_date)}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </Card>
      </div>

      {/* Primary Metrics Cards */}
      <div className="col-span-full">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={8} xl={4}>
            <Card>
              <Statistic
                title="Locality Score"
                value={formatLocalityScore(payload.locality_score)}
                valueStyle={{ color: payload.locality_score >= 0.55 ? '#3f8600' : '#cf1322' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8} xl={5}>
            <Card>
              <Statistic
                title="Byte Weighted Locality Score"
                value={formatLocalityScore(payload.byte_weighted_locality_score.local_content_pct)}
                valueStyle={{ color: payload.byte_weighted_locality_score.local_content_pct >= 0.55 ? '#3f8600' : '#cf1322' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8} xl={5}>
            <Card>
              <Statistic
                title="Total Countries"
                value={summary.counts.total_countries || 0}
                prefix={<GlobalOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={5}>
            <Card>
              <Statistic
                title="Total ASNs"
                value={summary.counts.total_asns || 0}
                prefix={<ApartmentOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={5}>
            <Card>
              <Statistic
                title="Total CDNs"
                value={summary.counts.total_cdns || 0}
                prefix={<CloudServerOutlined />}
              />
            </Card>
          </Col>
        </Row>
      </div>

      {/* Top Countries, ASNs, CDNs */}
      <div className="col-span-full">
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={8}>
            <Card title="Top Countries by Content Size" size="small">
              <List
                dataSource={summary.top_countries || []}
                renderItem={(item) => (
                  <List.Item>
                    <div className="flex justify-between w-full">
                      <span>{item.code}</span>
                      <span className="font-semibold">{formatLocalityScore(item.pct_bytes)}</span>
                    </div>
                  </List.Item>
                )}
                locale={{ emptyText: 'No data available' }}
              />
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="Top ASNs by Content Size" size="small">
              <List
                dataSource={summary.top_asns || []}
                renderItem={(item) => (
                  <List.Item>
                    <div className="flex justify-between w-full">
                      <span>{item.asn}</span>
                      <span className="font-semibold">{formatLocalityScore(item.pct_bytes)}</span>
                    </div>
                  </List.Item>
                )}
                locale={{ emptyText: 'No data available' }}
              />
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="Top CDNs by Content Size" size="small">
              <List
                dataSource={summary.top_cdns || []}
                renderItem={(item) => (
                  <List.Item>
                    <div className="flex justify-between w-full">
                      <span>{item.cdn}</span>
                      <span className="font-semibold">{formatLocalityScore(item.pct_bytes)}</span>
                    </div>
                  </List.Item>
                )}
                locale={{ emptyText: 'No data available' }}
              />
            </Card>
          </Col>
        </Row>
      </div>

       {/* Locality Matrix Table */}
      <div className="col-span-full">
        <Card title="Locality Matrix - ASN Distribution">
          <Table
            dataSource={payload.locality_matrix || []}
            columns={[
              {
                title: 'ASN',
                dataIndex: 'hosting_asn',
                key: 'hosting_asn',
                sorter: (a, b) => a.hosting_asn.localeCompare(b.hosting_asn),
                width: 120,
              },
              {
                title: 'ASN Name',
                dataIndex: 'hosting_asn_name',
                key: 'hosting_asn_name',
                ellipsis: true,
              },
              {
                title: 'Country',
                dataIndex: 'hosting_country',
                key: 'hosting_country',
                sorter: (a, b) => a.hosting_country.localeCompare(b.hosting_country),
                width: 100,
                filters: [...new Set((payload.locality_matrix || []).map(item => item.hosting_country))]
                  .sort()
                  .map(country => ({ text: country, value: country })),
                onFilter: (value, record) => record.hosting_country === value,
              },
              {
                title: 'Total Bytes',
                dataIndex: 'total_bytes',
                key: 'total_bytes',
                render: (bytes) => formatBytes(bytes),
                sorter: (a, b) => a.total_bytes - b.total_bytes,
                align: 'right',
                width: 130,
              },
              {
                title: 'Bytes %',
                dataIndex: 'percent_bytes',
                key: 'percent_bytes',
                render: (pct) => formatLocalityScore(pct),
                sorter: (a, b) => a.percent_bytes - b.percent_bytes,
                align: 'right',
                width: 100,
              },
              {
                title: 'Total Domains',
                dataIndex: 'total_domains',
                key: 'total_domains',
                render: (count) => formatNumber(count),
                sorter: (a, b) => a.total_domains - b.total_domains,
                align: 'right',
                width: 130,
              },
              {
                title: 'Domains %',
                dataIndex: 'percent_domains',
                key: 'percent_domains',
                render: (pct) => formatLocalityScore(pct),
                sorter: (a, b) => a.percent_domains - b.percent_domains,
                align: 'right',
                width: 110,
              },
            ]}
            rowKey={(record) => `${record.hosting_asn}-${record.hosting_country}`}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50', '100'],
              showTotal: (total) => `Total ${total} ASNs`,
            }}
            size="small"
            scroll={{ x: 'max-content' }}
            locale={{ emptyText: 'No locality matrix data available' }}
          />
        </Card>
      </div>

      {/* Charts */}
      <div className="col-span-full">
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card title="Byte-Weighted Locality Distribution">
              {pieChartData ? (
                <LocalityPieChart data={pieChartData} />
              ) : (
                <div className="text-center py-8 text-gray-500">No chart data available</div>
              )}
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="Locality Score Trend">
              {trendChartData && trendChartData.length > 0 ? (
                <LocalityTrendChart data={trendChartData} />
              ) : (
                <div className="text-center py-8 text-gray-500">No trend data available</div>
              )}
            </Card>
          </Col>
        </Row>
      </div>

      {/* Metadata */}
      <div className="col-span-full">
        <Card title="Snapshot Metadata">
          <Descriptions bordered size="small">
            <Descriptions.Item label="Snapshot Date" span={3}>
              {formatDate(metrics.snapshot_date)}
            </Descriptions.Item>
            <Descriptions.Item label="Data Version" span={3}>
              {metrics.data_version || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Source URL" span={3}>
              {metrics.source_url ? (
                <a href={metrics.source_url} target="_blank" rel="noopener noreferrer">
                  {metrics.source_url}
                </a>
              ) : (
                'N/A'
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Last Updated" span={3}>
              {formatDate(metrics.updated_at)}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </div>
  );
}
