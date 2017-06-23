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

import { Dimensions } from 'react-native';

function addWindowResizeListener(fn) {
  function onWindowResized() {
    fn({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  function remove() {
    window.removeEventListener('resize', onWindowResized);
  }

  window.addEventListener('resize', onWindowResized);
  return { remove };
}

function addDimensionsChangedListener(fn) {
  function onDimensionsChanged(e) {
    fn({
      width: e.window.width,
      height: e.window.height
    });
  }

  function remove() {
    Dimensions.removeEventListener('change', onDimensionsChanged);
  }

  Dimensions.addEventListener('change', onDimensionsChanged);
  return { remove };
}

export default class Window {
  static addResizeListener(fn) {
    if (typeof window.addEventListener === 'function') {
      return addWindowResizeListener(fn);
    }

    return addDimensionsChangedListener(fn);
  }

  static getDimensions() {
    if (typeof window.addEventListener === 'function') {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      };
    }

    return Dimensions.get('window');
  }
}
