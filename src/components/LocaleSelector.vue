<!--
  This source file is part of the Swift.org open source project

  Copyright (c) 2023 Apple Inc. and the Swift project authors
  Licensed under Apache License v2.0 with Runtime Library Exception

  See https://swift.org/LICENSE.txt for license information
  See https://swift.org/CONTRIBUTORS.txt for Swift project authors
-->

<template>
  <div class="locale-selector">
    <select
      :value="$i18n.locale"
      :aria-label="$t('select-language')"
      @change="updateRouter"
    >
      <option
        v-for="{ slug, name, code } in locales"
        :key="slug"
        :value="slug"
        :lang="code"
      >
        {{ name }}
      </option>
    </select>
    <ChevronThickIcon class="icon-inline" />
  </div>
</template>

<script>
import ChevronThickIcon from 'theme/components/Icons/ChevronThickIcon.vue';
import locales from 'theme/lang/locales.json';
import { defaultLocale } from 'theme/lang/index.js';
import { updateLocale } from 'docc-render/utils/i18n-utils';

export default {
  name: 'LocaleSelector',
  components: {
    ChevronThickIcon,
  },
  data() {
    return {
      locales,
    };
  },
  methods: {
    updateRouter({ target: { value: slug } }) {
      this.$router.push({
        params: {
          locale: slug === defaultLocale ? null : slug,
        },
      });
      updateLocale(slug, this);
    },
  },
};

</script>
<style scoped lang="scss">
@import 'docc-render/styles/_core.scss';

select {
  @include font-styles(locale-selector);
  color: var(--color-fill-blue);
  padding-right: 15px;
  appearance: none;
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}

.locale-selector {
  position: relative;
}

.svg-icon.icon-inline {
  position: absolute;
  fill: var(--color-fill-blue);
  right: 2px;
  bottom: 7px;
  height: 5px;
}
</style>