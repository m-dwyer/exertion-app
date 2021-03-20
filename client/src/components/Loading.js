import React from 'react'
import PropTypes from 'prop-types'

const Loading = ({ loading, children }) => {
  if (loading) {
    return <div>Loading..</div>
  }

  return <> {children} </>
}

Loading.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.any
}

export default Loading
