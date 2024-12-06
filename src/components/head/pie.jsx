import { Assistant } from '@petercatai/assistant';
import './style.css'; // 确认实际路径

const Pie = () => {
	return (
		<Assistant
			token="d1b94d2c-4893-4862-8351-f9b6632c2492"
			apiDomain="https://api.petercat.ai"
		/>
	);
};

export default Pie;
