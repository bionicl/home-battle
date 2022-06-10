import { Tabs, Typography } from 'antd';
import './App.css';

const { Title, Text, Link } = Typography;
const { TabPane } = Tabs;


function App() {
  return (
    <div className="app">
      <Title level={2}>Bitwa o mieszkanie</Title>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Historia" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Podsumowanie" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
