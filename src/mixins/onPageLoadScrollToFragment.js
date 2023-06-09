/**
 * This source file is part of the Swift.org open source project
 *
 * Copyright (c) 2021 Apple Inc. and the Swift project authors
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See https://swift.org/LICENSE.txt for license information
 * See https://swift.org/CONTRIBUTORS.txt for Swift project authors
*/

import AppStore from 'docc-render/stores/AppStore';
import ImageLoadingStrategy from 'docc-render/constants/ImageLoadingStrategy';
import scrollToElement from 'docc-render/mixins/scrollToElement';

function waitForImageToLoad(img) {
  return new Promise((resolve, reject) => {
    if (img.complete) {
      resolve();
    } else {
      img.addEventListener('load', resolve, { once: true });
      img.addEventListener('error', reject, { once: true });
    }
  });
}

function waitForImagesToLoad() {
  return Promise.allSettled(
    [...document.getElementsByTagName('img')].map(waitForImageToLoad),
  );
}

export default {
  mixins: [scrollToElement],
  mounted() {
    this.scrollToElementIfAnchorPresent();
  },
  updated() {
    this.scrollToElementIfAnchorPresent();
  },
  methods: {
    async scrollToElementIfAnchorPresent() {
      const { hash } = this.$route;
      if (!hash) {
        return;
      }

      // Use "eager" loading for all images since they need to be loaded so
      // that any dynamic height adjustments can be accounted for
      const { imageLoadingStrategy } = AppStore.state;
      AppStore.setImageLoadingStrategy(ImageLoadingStrategy.eager);

      // Before scrolling, wait for the next tick to ensure that the page has
      // been fully rendered with the Vue lifecycle and also wait for any
      // images to load since those will also add to the height of the page.
      await this.$nextTick();
      await waitForImagesToLoad();

      this.scrollToElement(hash);

      // Restore the original image loading strategy after scrolling
      AppStore.setImageLoadingStrategy(imageLoadingStrategy);
    },
  },
};
