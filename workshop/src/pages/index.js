import React from 'react';

import { App } from '../containers';

const Index = ({ pageContext: { pages } }) => <App pages={pages} />;

export default Index;
