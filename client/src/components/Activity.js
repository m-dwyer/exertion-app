import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'

const Activity = ({ activity }) => {
  return (
    <div>
      <span
        css={css`
          font-weight: bold;
        `}
      >
        {activity.user.username}
      </span>{' '}
      completed {activity.duration} minutes of {activity.type.name}-{' '}
      {activity.comment}
    </div>
  )
}

Activity.propTypes = {
  activity: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string
    }),
    type: PropTypes.shape({
      name: PropTypes.string
    }),
    duration: PropTypes.number
  })
}

export default Activity
