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
import withDimensions from './with-dimensions';

class MediaQuery extends React.PureComponent {
  render() {
    const isMatch = (
      (this.props.minWidth <= this.props.width) &&
      (this.props.width <= this.props.maxWidth) &&
      (this.props.minHeight <= this.props.height) &&
      (this.props.height <= this.props.maxHeight)
    );

    return isMatch ? this.props.children : null;
  }
}

MediaQuery.displayName = 'MediaQuery';

MediaQuery.propTypes = {
  children: PropTypes.node,
  height: PropTypes.number.isRequired,
  maxHeight: PropTypes.number,
  maxWidth: PropTypes.number,
  minHeight: PropTypes.number,
  minWidth: PropTypes.number,
  width: PropTypes.number.isRequired
};

MediaQuery.defaultProps = {
  children: null,
  maxHeight: Number.MAX_VALUE,
  maxWidth: Number.MAX_VALUE,
  minHeight: 0,
  minWidth: 0
};

export default withDimensions(MediaQuery);
