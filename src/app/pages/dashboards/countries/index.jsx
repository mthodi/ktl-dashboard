import { useEffect, useState } from 'react';
import { Card, Table, Input, Spin, Alert, Row, Col, Statistic } from 'antd';
import { GlobalOutlined, DatabaseOutlined, CalendarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { fetchCountries } from '@/_utilities/api';
import { formatLocalityScore, formatDate } from '@/_utilities/formatters';

const { Search } = Input;

/**
 * Countries Landing Page
 * Displays a list of all countries with their latest metrics
 */
export default function CountriesPage() {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    loadCountries();
  }, []);

  useEffect(() => {
    if (searchText) {
      const filtered = countries.filter(country =>
        country.name.toLowerCase().includes(searchText.toLowerCase()) ||
        country.iso_alpha2.toLowerCase().includes(searchText.toLowerCase()) ||
        country.iso_alpha3.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  }, [searchText, countries]);

  async function loadCountries() {
    try {
      setLoading(true);
      const data = await fetchCountries();
      setCountries(data);
      setFilteredCountries(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const columns = [
    {
      title: 'Country Code',
      dataIndex: 'iso_alpha2',
      key: 'iso_alpha2',
      sorter: (a, b) => a.iso_alpha2.localeCompare(b.iso_alpha2),
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Country Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Region',
      dataIndex: 'region',
      key: 'region',
      sorter: (a, b) => a.region.localeCompare(b.region),
    },
    {
      title: 'Latest Snapshot',
      dataIndex: 'latest_snapshot_date',
      key: 'latest_snapshot_date',
      sorter: (a, b) => new Date(a.latest_snapshot_date) - new Date(b.latest_snapshot_date),
      render: (date) => formatDate(date),
    },
    {
      title: 'Locality Score',
      dataIndex: 'latest_locality_score',
      key: 'latest_locality_score',
      sorter: (a, b) => a.latest_locality_score - b.latest_locality_score,
      render: (score) => formatLocalityScore(score),
    },
    {
      title: 'Snapshots',
      dataIndex: 'snapshot_count',
      key: 'snapshot_count',
      sorter: (a, b) => a.snapshot_count - b.snapshot_count,
    },
  ];

  // Calculate summary statistics
  const totalCountries = countries.length;
  const totalSnapshots = countries.reduce((sum, c) => sum + c.snapshot_count, 0);
  const avgLocalityScore = countries.length > 0
    ? countries.reduce((sum, c) => sum + c.latest_locality_score, 0) / countries.length
    : 0;

  if (error) {
    return (
      <Alert
        message="Error Loading Countries"
        description={error}
        type="error"
        showIcon
      />
    );
  }

  return (
    <div className="grid gap-8 grid-cols-12">
      {/* Summary Statistics */}
      <div className="col-span-full">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Total Countries"
                value={totalCountries}
                prefix={<GlobalOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Total Snapshots"
                value={totalSnapshots}
                prefix={<DatabaseOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Avg Locality Score"
                value={formatLocalityScore(avgLocalityScore)}
                prefix={<CalendarOutlined />}
              />
            </Card>
          </Col>
        </Row>
      </div>

      {/* Countries Table */}
      <div className="col-span-full">
        <Card
          title="Countries"
          extra={
            <Search
              placeholder="Search countries..."
              allowClear
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />
          }
        >
          <Table
            columns={columns}
            dataSource={filteredCountries}
            rowKey="iso_alpha2"
            loading={loading}
            pagination={{
              pageSize: 20,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} countries`,
            }}
            onRow={(record) => ({
              onClick: () => navigate(`/dashboards/countries/${record.iso_alpha2.toLowerCase()}`),
              style: { cursor: 'pointer' },
            })}
          />
        </Card>
      </div>
    </div>
  );
}
