import { Tabs, Typography } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import './App.css';
import HistoryComponent from './components/HistoryComponent';
import ProgressComponent from './components/ProgressComponent';
import TasksComponent from './components/TasksComponent';
import { getAllHistory, getAllTasks, getProgress } from './services';
import { HistoryRow } from './types/HistoryRow';
import { Progress } from './types/Progress';
import { Task } from './types/Task';

const { Title } = Typography;
const { TabPane } = Tabs;

function App() {
  const [historyRows, setHistoryRows] = useState<HistoryRow[]>();
  const [tasks, setTasks] = useState<Task[]>();
  const [progress, setProgress] = useState<Progress>();

  useEffect(() => {
    getAllHistory()
      .then((res) => {
        setHistoryRows(res.data);
      })
    getAllTasks()
      .then((res) => {
        setTasks(res.data);
      })
    downloadProgress();
  }, []);

  function refreshTasks(newData: Task[]) {
    setTasks(newData);
    downloadProgress();
  }

  function refreshHistory(newData: HistoryRow[]) {
    setHistoryRows(newData);
    downloadProgress();
  }

  function downloadProgress() {
    getProgress()
      .then((res) => {
        setProgress(res.data);
      })
  }

  moment.locale('pl')

  return (
    <div className="app">
      <Title style={{ marginTop: 48 }} level={2}>⚔️ Bitwa o mieszkanie</Title>
      <ProgressComponent progress={progress} />
      <Tabs defaultActiveKey="1">
        <TabPane tab="Historia" key="1">
          <HistoryComponent data={historyRows} tasks={tasks} refreshData={refreshHistory} />
        </TabPane>
        <TabPane tab="Zadania" key="2">
          <TasksComponent data={tasks} refreshData={refreshTasks} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
