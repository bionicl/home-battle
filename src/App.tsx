import { Tabs, Typography } from 'antd';
import { useEffect, useState } from 'react';
import './App.css';
import { getAll } from './services';

const { Title, Text, Link } = Typography;
const { TabPane } = Tabs;



function App() {
  const [num, setNum] = useState(0);

  function getNum() {
    getAll()
      .then((res) => {
        console.log(res.data);
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
