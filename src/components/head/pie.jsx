import { Assistant } from '@petercatai/assistant';
import './style.css'; // 确认实际路径

const Pie = () => {
	return (
		<Assistant
			token="d27b92a3-5bde-412a-bce3-d3b6b4113b43"
			apiDomain="https://api.petercat.ai"
		/>
	);
};

export default Pie;
