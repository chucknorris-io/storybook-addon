import PropTypes from 'prop-types';
import React from 'react';

import LoaderIllustration from './illustration/LoaderIllustration';

const styles = {
  link: {
    marginLeft: '3px',
  },
  wrapper: {
    margin: 10,
    fontFamily: 'Arial',
    fontSize: 14,
    color: '#444',
    width: '100%',
    overflow: 'auto',
  },
  loading: {
    color: '#777',
    marginLeft: '10px',
    top: '-5px',
    position: 'relative',
  },
};

export default class Panel extends React.Component {
  render() {
    if (this.props.error)
      return (
        <div style={styles.wrapper}>
          <span>{this.state.error}</span>
        </div>
      );

    if (this.props.isLoading)
      return (
        <div style={styles.wrapper}>
          <LoaderIllustration />
          <span style={styles.loading}>Loading ...</span>
        </div>
      );

    if (this.props.joke)
      return (
        <div style={styles.wrapper}>
          <span>{this.props.joke.value}</span>
          <a href={this.props.joke.url} style={styles.link} target="_blank">
            (src)
          </a>
        </div>
      );

    return (
      <div style={styles.wrapper}>
        <span>Something went wrong</span>
      </div>
    );
  }
}

Panel.propTypes = {
  error: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  joke: PropTypes.object.isRequired,
};
