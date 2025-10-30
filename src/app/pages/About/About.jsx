import { WieldyContainer } from "@wieldy/components";
import { Typography, Card, Space, Divider } from "antd";
import { InfoCircleOutlined, MailOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const About = () => {
  return (
    <div className="py-8">
      <WieldyContainer>
        <Card>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div>
              <Title level={2}>
                <InfoCircleOutlined className="mr-2" />
                About This Project
              </Title>
            </div>

            <div>
              <Title level={3}>Overview</Title>
              <Paragraph>
                This dashboard presents preliminary results from a research project that measures{" "}
                <Text strong>Internet traffic locality</Text> — the extent to which content accessed from a
                given country is hosted locally within that country versus externally.
              </Paragraph>
              <Paragraph>
                As Internet infrastructure in Africa and other regions continues to develop, understanding
                where web content is hosted has important implications for:
              </Paragraph>
              <ul>
                <li><Text strong>Network performance:</Text> Local hosting reduces latency and improves user experience</li>
                <li><Text strong>Network costs:</Text> Keeping traffic local reduces international transit costs for ISPs</li>
                <li><Text strong>Infrastructure investment:</Text> Identifying gaps in local content hosting can guide infrastructure development</li>
                <li><Text strong>Digital sovereignty:</Text> Understanding reliance on external hosting providers</li>
              </ul>
            </div>

            <Divider />

            <div>
              <Title level={3}>Methodology</Title>
              <Paragraph>
                This research analyzes the hosting locations of content from the{" "}
                <Text strong>Google CrUX Top 1000 websites</Text> for each country. The measurement process
                works as follows:
              </Paragraph>
              <ol>
                <li>
                  <Text strong>URL Collection:</Text> We obtain the most popular 1000 websites visited from
                  each country using Chrome User Experience Report (CrUX) data
                </li>
                <li>
                  <Text strong>Browser-Based Capture:</Text> Using automated browsers with residential proxies,
                  we capture HTTP Archive (HAR) files that record all network requests made when loading these
                  websites from the perspective of each country
                </li>
                <li>
                  <Text strong>Geo-Hints Localization:</Text> We determine hosting locations by extracting
                  geographic hints from CDN (Content Delivery Network) responses, including:
                  <ul>
                    <li>IATA airport codes embedded in CDN server names and headers</li>
                    <li>Geographic identifiers in cache server responses</li>
                    <li>Service-specific locality information (e.g., Netflix Fast.com API, YouTube cache servers)</li>
                  </ul>
                </li>
                <li>
                  <Text strong>Metrics Computation:</Text> We calculate locality scores based on:
                  <ul>
                    <li><Text strong>Count-based metrics:</Text> Percentage of domains hosted locally vs. externally</li>
                    <li><Text strong>Byte-weighted metrics:</Text> Percentage of content bytes served from local vs. external sources</li>
                    <li><Text strong>Per-CDN analysis:</Text> Locality breakdown by CDN provider</li>
                    <li><Text strong>Performance analysis:</Text> Load time comparisons for local vs. external content</li>
                  </ul>
                </li>
              </ol>
            </div>

            <Divider />

            <div>
              <Title level={3}>Key Metrics</Title>
              <Paragraph>
                The dashboard presents several complementary views of traffic locality:
              </Paragraph>
              <ul>
                <li><Text strong>Locality Score:</Text> Simple percentage of domains hosted in the source country</li>
                <li><Text strong>Byte-Weighted Locality:</Text> Percentage of total content bytes served locally (more representative of actual traffic)</li>
                <li><Text strong>Country Matrix:</Text> Which countries are hosting content accessed locally</li>
                <li><Text strong>CDN Analysis:</Text> Locality performance of major CDN providers</li>
                <li><Text strong>Timing Analysis:</Text> Performance implications of local vs. external hosting</li>
              </ul>
            </div>

            <Divider />

            <div>
              <Title level={3}>Project Context</Title>
              <Paragraph>
                This research was conducted as part of the{" "}
                <Text strong>Internet Society's Pulse Research Fellowship</Text> program, which supports
                research into critical Internet infrastructure and policy questions affecting the global
                Internet ecosystem.
              </Paragraph>
            </div>

            <Divider />

            <div>
              <Title level={3}>Important Notes</Title>
              <ul>
                <li>
                  <Text strong>Preliminary Results:</Text> The data presented here represents preliminary
                  findings and is subject to ongoing validation and refinement
                </li>
                <li>
                  <Text strong>Measurement Limitations:</Text> Results reflect hosting locations for popular
                  websites only and may not represent all Internet traffic patterns
                </li>
                <li>
                  <Text strong>Country-Level Analysis:</Text> This dashboard focuses on country-level locality measurements
                </li>
                <li>
                  <Text strong>Geohints Method:</Text> All measurements use the geo-hints localization approach,
                  which relies on geographic identifiers in CDN responses
                </li>
              </ul>
            </div>

            <Divider />

            <div>
              <Title level={3}>Future Directions</Title>
              <Paragraph>Ongoing work includes:</Paragraph>
              <ul>
                <li>Expanding country coverage</li>
                <li>ASN-level (network operator) analysis</li>
                <li>Temporal analysis to track locality changes over time</li>
                <li>Validation of geo-hints accuracy through alternative measurement methods</li>
                <li>Analysis of streaming service locality (Netflix, YouTube, etc.)</li>
              </ul>
            </div>

            <Divider />

            <div>
              <Title level={3}>
                <MailOutlined className="mr-2" />
                Contact
              </Title>
              <Paragraph>
                For questions about this research or to provide feedback, please contact me at{" "}
                <Text code>martthodi238 AT Gmail.com</Text>.
              </Paragraph>
              <Paragraph type="secondary" style={{ marginTop: 24 }}>
                <em>Last updated: October 2025</em>
              </Paragraph>
            </div>
          </Space>
        </Card>
      </WieldyContainer>
    </div>
  );
};

export default About;
