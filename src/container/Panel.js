import PropTypes from 'prop-types';
import React from 'react';

import { randomJoke } from './../api/chuck';
import { default as PanelPage } from '../component/Panel';

export const state = {
  error: '',
  isLoading: false,
  joke: {
    category: '',
    icon_url: '',
    id: '',
    url: '',
    value: '',
  },
};

export default class Panel extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = state;
    this.onRandomJoke = this.onRandomJoke.bind(this);
  }

  componentDidMount() {
    this.props.channel.on('chucknorris-io/jokes/randomJoke', this.onRandomJoke);
    this.stopListeningOnStory = this.props.api.onStory(this.onRandomJoke);
  }

  componentWillUnmount() {
    if (this.stopListeningOnStory) {
      this.stopListeningOnStory();
    }

    this.unmounted = true;
    this.props.channel.removeListener(
      'chucknorris-io/jokes/randomJoke',
      this.onRandomJoke
    );
  }

  onRandomJoke() {
    this.setState({ isLoading: !state.isLoading }, () => {
      randomJoke()
        .then(joke => {
          this.setState({ isLoading: state.isLoading, joke: joke });
        })
        .catch(error => {
          this.setState({
            error,
            isLoading: state.isLoading,
            joke: state.joke,
          });
        });
    });
  }

  render() {
    return (
      <PanelPage
        error={this.state.error}
        isLoading={this.state.isLoading}
        joke={this.state.joke}
      />
    );
  }
}

Panel.propTypes = {
  api: PropTypes.object.isRequired,
  channel: PropTypes.object.isRequired,
};
