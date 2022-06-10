import { Spin, Table, Typography } from 'antd';
import { HistoryRow } from '../types/HistoryRow';
import { Task } from '../types/Task';

const { Text } = Typography;

type Props = {
	data?: HistoryRow[];
	tasks?: Task[];
};

function HistoryComponent({ data, tasks }: Props) {
	const tasksColumns = [
		{
			title: 'Kto',
			dataIndex: 'who',
			key: 'who',
		},
		{
			title: 'Opis',
			dataIndex: 'description',
			key: 'description',
			render: (description: string, record: HistoryRow) => {
				var searchResult = tasks?.find(e => e.key === description);
				return (
					searchResult ? <Text>{searchResult.name}</Text> : <Spin />
				)
			}
		},
		{
			title: 'Ilość',
			dataIndex: 'count',
			key: 'count',
		},
	];

	return (
		<Table
			dataSource={data}
			columns={tasksColumns}
			size="small"
		/>
	)
}

export default HistoryComponent;