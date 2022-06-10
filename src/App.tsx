import { Table, Tabs, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { LogRow } from '../types/LogRow';
import './App.css';
import { getAll } from './services';

const { Title } = Typography;
const { TabPane } = Tabs;

const columns = [
  {
    title: 'Kto',
    dataIndex: 'who',
    key: 'who',
  },
  {
    title: 'Opis',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Ilość',
    dataIndex: 'count',
    key: 'count',
  },
];

function App() {
  const [data, setData] = useState<LogRow[]>();

  function getNum() {
    getAll()
      .then((res) => {
        setData(res.data);
      })
  }

  useEffect(() => {
    getNum();
  }, []);

  return (
    <div className="app">
      <Title level={2}>Bitwa o mieszkanie</Title>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Historia" key="1">
          <Table
            dataSource={data}
            columns={columns}
            size="small"
          />
        </TabPane>
        <TabPane tab="Podsumowanie" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
