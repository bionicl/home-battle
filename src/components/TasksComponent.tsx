import { Table } from 'antd';
import { Task } from '../types/Task';

type Props = {
	data?: Task[];
};

const descriptionColumns = [
	{
		title: 'Klucz',
		dataIndex: 'key',
		key: 'key',
	},
	{
		title: 'Nazwa',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Waga',
		dataIndex: 'weight',
		key: 'weight',
	},
];

function TasksComponent({ data }: Props) {
	return (
		<Table
			dataSource={data}
			columns={descriptionColumns}
			size="small"
		/>
	)
}

export default TasksComponent;