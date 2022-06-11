import { Tabs, Typography } from 'antd';
import { useEffect, useState } from 'react';
import './App.css';
import HistoryComponent from './components/HistoryComponent';
import TasksComponent from './components/TasksComponent';
import { getAllHistory, getAllTasks } from './services';
import { HistoryRow } from './types/HistoryRow';
import { Task } from './types/Task';

const { Title } = Typography;
const { TabPane } = Tabs;

function App() {
  const [historyRows, setHistoryRows] = useState<HistoryRow[]>();
  const [tasks, setTasks] = useState<Task[]>();

  useEffect(() => {
    getAllHistory()
      .then((res) => {
        setHistoryRows(res.data);
      })
    getAllTasks()
      .then((res) => {
        setTasks(res.data);
      })
  }, []);

  function refreshTasks(newData: Task[]) {
    setTasks(newData);
  }

  return (
    <div className="app">
      <Title style={{ marginTop: 48 }} level={2}>⚔️ Bitwa o mieszkanie</Title>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Historia" key="1">
          <HistoryComponent data={historyRows} tasks={tasks} />
        </TabPane>
        <TabPane tab="Zadania" key="2">
          <TasksComponent data={tasks} refreshData={refreshTasks} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
