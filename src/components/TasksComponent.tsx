import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, message, Modal, PageHeader, Spin, Table, Typography } from 'antd';
import { useEffect, useState } from "react";
import { createNewTask } from "../services";
import { Task } from '../types/Task';

const { Text } = Typography;

type Props = {
	data?: Task[];
};

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
];



function TasksComponent({ data }: Props) {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();

	function createTask(values: { name: string, weight: number }) {
		setLoading(true);
		createNewTask(values).then(() => {
			setLoading(false);
			setIsModalVisible(false);
			message.info("Created new task!");
		})
	}

	useEffect(() => {
		if (isModalVisible) {
			form.resetFields();
			setLoading(false);
		}
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