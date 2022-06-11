import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, message, Modal, PageHeader, Spin, Table, Typography } from 'antd';
import { useEffect, useState } from "react";
import { createNewTask, removeTask } from "../services";
import { Task } from '../types/Task';

const { Text, Link } = Typography;

type Props = {
	data?: Task[];
	refreshData: (newData: Task[]) => void;
};

function TasksComponent({ data, refreshData }: Props) {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();

	const descriptionColumns = [
		{
			title: 'Nazwa',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Klucz',
			dataIndex: 'key',
			key: 'key',
			render: (key: string) => <Text type="warning">{key}</Text>
		},
		{
			title: 'Waga',
			dataIndex: 'weight',
			key: 'weight',
		},
		{
			title: 'Akcje',
			dataIndex: 'action',
			key: 'action',
			render: (key: string, entry: Task) => <Link onClick={() => removeTaskAction(entry)} type="danger">Usuń</Link>
		},
	];

	function removeTaskAction(task: Task) {
		removeTask(task.Id).then((res) => {
			refreshData(res.data);
			message.info("Usunięto zadanie!");
		})
	}

	function createTask(values: { name: string, weight: number }) {
		setLoading(true);
		createNewTask(values).then((res) => {
			setLoading(false);
			setIsModalVisible(false);
			refreshData(res.data)
			message.info("Dodano zadanie!");
		})
	}

	useEffect(() => {
		if (isModalVisible) {
			form.resetFields();
			setLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isModalVisible])

	return (
		<>
			{data ?
				<PageHeader
					style={{ padding: 0 }}
					title="Zadania"
					extra={
						<Button
							onClick={() => setIsModalVisible(true)}
							icon={<PlusOutlined />}
							type="primary">Utwórz
						</Button>}
				>
					<Table
						dataSource={data}
						columns={descriptionColumns}
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
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 20 }}
					form={form}
					onFinish={createTask}
				>
					<Form.Item name="name" label="Nazwa" rules={[{ required: true, message: "Uzupełnij nazwę" }]}>
						<Input placeholder="Podaj nazwę" />
					</Form.Item>
					<Form.Item name="weight" label="Waga" rules={[{ required: true, message: "Uzupełnij wagę" }]}>
						<InputNumber min={1} max={4} />
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}

export default TasksComponent;