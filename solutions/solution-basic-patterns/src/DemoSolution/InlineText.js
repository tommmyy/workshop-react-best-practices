import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'theme-ui';

const InlineText = forwardRef((props, ref) => <Text as="p" ref={ref} {...props} />);

InlineText.displayName = 'InlineText';
InlineText.propTypes = { children: PropTypes.node };

export default InlineText;
