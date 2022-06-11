import { Space, Spin, Typography } from "antd";
import { Progress } from "../types/Progress";

const { Title, Text } = Typography;

type Props = {
	progress?: Progress
};

function ProgressComponent({ progress }: Props) {
	var whoHasMore = "";
	if (progress) {
		if (progress.maciejPoints > progress.zofiaPoints)
			whoHasMore = "maciej";
		else if (progress.maciejPoints < progress.zofiaPoints)
			whoHasMore = "zofia";
	}

	return (
		progress ? (
			<Space>
				<Space direction="vertical">
					<Title
						type={whoHasMore === "maciej" ? "success" : undefined}
						style={{ marginBottom: -8 }}
						level={2}>{progress?.maciejPoints}
					</Title>
					<Text>Maciej 🦄</Text>
				</Space>
				<Text>vs</Text>
				<Space direction="vertical">
					<Title
						type={whoHasMore === "zofia" ? "success" : undefined}
						style={{ marginBottom: -8 }}
						level={2}>{progress?.zofiaPoints}</Title>
					<Text>Zofia 🥦</Text>
				</Space>
			</Space>
		) : <Spin />
	)
}

export default ProgressComponent;