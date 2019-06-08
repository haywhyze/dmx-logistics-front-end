import React from 'react';
import { Grid, Segment, Label, List } from 'semantic-ui-react';

export default ({ listItems, label }) => (
  <Grid.Column>
    <Segment>
    <Label size='tiny' attached='top left'> {label}</Label>
    <List divided relaxed>
      {listItems}
    </List>
    </Segment>
  </Grid.Column>
);