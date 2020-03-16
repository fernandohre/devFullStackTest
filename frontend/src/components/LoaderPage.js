import React from 'react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

const LoaderPage = () => (
  <Segment>
    <Dimmer active>
      <Loader />
    </Dimmer>

  </Segment>
)

export default LoaderPage
