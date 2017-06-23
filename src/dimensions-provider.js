/**
 * Copyright (c) 2017 Chris Baker <mail.chris.baker@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import DimensionsContextKey from './context-key';
import DimensionsContextTypes from './context-types';
import DimensionsPropTypes from './prop-types';
import Window from './window';
import debounce from './debounce';

export default class DimensionsProvider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = Window.getDimensions();
    this.onWindowResized = debounce(this.onWindowResized.bind(this), props.debounce);
  }

  onWindowResized(e) {
    this.setState(e);
  }

  componentWillMount() {
    this.listeners = [
      Window.addResizeListener(this.onWindowResized)
    ];
  }

  componentWillUnmount() {
    this.listeners.forEach(listener => listener.remove());
  }

  shouldComponentUpdate(props, state) {
    if (typeof this.props.width === 'undefined') {
      if (this.state.width !== state.width) {
        return true;
      }
    }

    if (typeof this.props.height === 'undefined') {
      if (this.state.height !== state.height) {
        return true;
      }
    }

    return (
      (this.props.children !== props.children) ||
      (this.props.debounce !== props.debounce) ||
      (this.props.height !== props.height) ||
      (this.props.width !== props.width)
    );
  }

  getChildContext() {
    return {
      [DimensionsContextKey]: {
        width: this.props.width || this.state.width,
        height: this.props.height || this.state.height
      }
    };
  }

  render() {
    return this.props.children;
  }
}

DimensionsProvider.displayName = 'DimensionsProvider';

DimensionsProvider.propTypes = {
  ...DimensionsPropTypes,
  children: PropTypes.node,
  debounce: PropTypes.number
};

DimensionsProvider.defaultProps = {
  children: null,
  debounce: 200
};

DimensionsProvider.childContextTypes = DimensionsContextTypes;
