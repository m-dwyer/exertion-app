import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'
import PersonCircle from '../assets/person-circle-outline.svg'

import { store } from '../store'

const Activity = ({ activity }) => {
  const { state } = useContext(store)
  const { theme } = state

  return (
    <div
      css={css`
        font-size: 1.5em;
        display: flex;
        align-items: center;
      `}
    >
      <PersonCircle
        css={css`
          width: 100px;
          fill: ${theme.colors.foreground1};
          margin-right: 0.5em;
        `}
      />
      <div>
        <div
          css={css`
            margin-bottom: 1em;
          `}
        >
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
