import React from 'react';
import addons from '@storybook/addons';

import Panel from './container/Panel';

const ADDON_ID = 'storybook-addon-chucknorris';
const PANEL_ID = `${ADDON_ID}/addon-panel`;

const addChannel = api => {
  const channel = addons.getChannel();

  addons.addPanel(PANEL_ID, {
    title: '👊🏼 Chuck',
    render() {
      return <Panel channel={addons.getChannel()} api={api} />;
    },
  });
};

const init = () => {
  addons.register(ADDON_ID, addChannel);
};

export { init, addChannel };
