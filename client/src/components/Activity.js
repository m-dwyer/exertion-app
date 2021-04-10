import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'

const Activity = ({ activity }) => {
  return (
    <div
      css={css`
        font-size: 1.5em;
        margin-bottom: 2em;
      `}
    >
      <div>
        <span
          css={css`
            font-weight: bold;
          `}
        >
          {activity.user.username}
        </span>{' '}
        <span>
          completed {activity.duration} minutes of {activity.type.name}
        </span>
      </div>
      <div
        css={css`
          font-style: italic;
        `}
      >
        {activity.comment}
      </div>
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
