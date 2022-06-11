import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, InputNumber, message, Modal, PageHeader, Select, Space, Spin, Table, Tooltip, Typography } from 'antd';
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import 'moment/locale/pl';
import { useState } from 'react';
import { createNewHistoryRow, removeHistoryRow } from "../services";
import { HistoryRow, HistoryRowPartial } from '../types/HistoryRow';
import { Task } from '../types/Task';

const { Text, Link } = Typography;

type Props = {
	data?: HistoryRow[];
	tasks?: Task[];
	refreshData: (newData: HistoryRow[]) => void;
};

function HistoryComponent({ data, tasks, refreshData }: Props) {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();

	moment.locale("pl");

	const tasksColumns = [
		{
			title: 'Data',
			dataIndex: 'date',
			key: 'date',
			render: (date: string) => (
				<Tooltip title={moment(date?.toString()).format("LLL")}>
					<Text>{moment(date?.toString()).fromNow()}</Text>
				</Tooltip>
			)
		},
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
					searchResult ?
						<Space>
							<Text>{searchResult.name}</Text>
							<Text type="secondary">x{record.count}</Text>
						</Space> : <Spin />
				)
			}
		},
		{
			title: 'Akcje',
			dataIndex: 'action',
			key: 'action',
			render: (key: string, entry: HistoryRow) => <Link onClick={() => removeRowAction(entry)} type="danger">Usuń</Link>
		},
	];

	function removeRowAction(task: HistoryRow) {
		removeHistoryRow(task.Id).then((res) => {
			refreshData(res.data);
			message.info("Usunięto rząd!");
		})
	}

	function createRowAction(values: HistoryRowPartial) {
		setLoading(true);
		createNewHistoryRow(values).then((res) => {
			setLoading(false);
			setIsModalVisible(false);
			refreshData(res.data)
			message.info("Dodano rząd!");
		})
	}

	function openCreateNewModal() {
		if (tasks && tasks?.length > 0) {
			setIsModalVisible(true);
		} else {
			Modal.warning({
				title: 'Brak zadań',
				content: 'Utwórz zadania aby rozpocząć',
			});
		}
	}

	return (
		<>
			{data ?
				<PageHeader
					style={{ padding: 0 }}
					title="Historia"
					extra={
						<Button
							onClick={() => openCreateNewModal()}
							icon={<PlusOutlined />}
							type="primary">Utwórz
						</Button>}
				>
					<Table

						dataSource={data}
						columns={tasksColumns}
						size="small"
						pagination={false}
					/>
				</PageHeader>
				: <Spin style={{ marginTop: 24 }} />}
			<Modal
				title="Utwórz zadanie"
				visible={isModalVisible}
				width={420}
				onCancel={() => setIsModalVisible(false)}
				footer={[
					<Button key="back" onClick={() => setIsModalVisible(false)}>Anuluj</Button>,
					<Button type="primary" loading={loading} key="submit" onClick={() => form.submit()}>Utwórz</Button>
				]}
			>

				<Form
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 18 }}
					form={form}
					onFinish={createRowAction}
					initialValues={{
						date: moment(),
						who: "Zofia",
						description: (tasks && tasks?.length > 0) ? tasks[0].key : undefined,
						count: 1
					}}
				>
					<Form.Item name="date" label="Data" rules={[{ required: true, message: "Uzupełnij nazwę" }]}>
						<DatePicker showTime style={{ width: "100%" }} placeholder="Data" />
					</Form.Item>
					<Form.Item name="who" label="Kto" rules={[{ required: true, message: "Uzupełnij wagę" }]}>
						<Select>
							<Select.Option value="Maciej">Maciej</Select.Option>
							<Select.Option value="Zofia">Zofia</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item name="description" label="Zadanie" rules={[{ required: true, message: "Wybierz zadanie" }]}>
						<Select>
							{tasks?.map((task) => (
								<Select.Option value={task.key}>{task.name}</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item name="count" label="Ilość" rules={[{ required: true, message: "Uzupełnij ilość" }]}>
						<InputNumber min={1} max={4} />
					</Form.Item>
					<Form.Item name="notes" label="Opis">
						<TextArea rows={4} placeholder="Opcjonalne" />
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}

export default HistoryComponent;