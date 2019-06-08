import React from 'react';
import { List } from 'semantic-ui-react';

export default ({ header, description, iconName }) => (
  <List.Item>
    <List.Icon name={iconName} size='large' verticalAlign='middle'/>
    <List.Content>
      <List.Header>
        {header}:
      </List.Header>
      <List.Description style={{ color: '#990000' }}>
        {description}
      </List.Description>
    </List.Content>
  </List.Item>
);