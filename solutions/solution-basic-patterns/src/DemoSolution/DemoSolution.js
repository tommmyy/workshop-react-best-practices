import React from 'react';
import { Box } from 'theme-ui';

import InlineText from './InlineText';

const Demo = () => (
		<Box>
			<InlineText
				ref={(textRef) => {
					console.log(textRef);
				}}
			>
				InlineText
			</InlineText>
		</Box>
	);

export default Demo;
