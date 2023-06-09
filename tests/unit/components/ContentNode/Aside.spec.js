/**
 * This source file is part of the Swift.org open source project
 *
 * Copyright (c) 2021-2023 Apple Inc. and the Swift project authors
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See https://swift.org/LICENSE.txt for license information
 * See https://swift.org/CONTRIBUTORS.txt for Swift project authors
*/

import { shallowMount } from '@vue/test-utils';
import Aside from 'docc-render/components/ContentNode/Aside.vue';

describe('Aside', () => {
  it('renders an <aside>', () => {
    const wrapper = shallowMount(Aside, {
      propsData: {
        kind: 'note',
      },
    });
    expect(wrapper.is('aside')).toBe(true);
    expect(wrapper.classes('note')).toBe(true);
    expect(wrapper.attributes('aria-label')).toBe('note');
  });

  it('renders a label', () => {
    const wrapper = shallowMount(Aside, {
      propsData: {
        kind: 'experiment',
      },
    });
    let label = wrapper.find('.label');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('aside-kind.experiment');

    wrapper.setProps({ kind: 'important' });
    label = wrapper.find('.label');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('aside-kind.important');

    wrapper.setProps({ kind: 'note' });
    label = wrapper.find('.label');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('aside-kind.note');

    wrapper.setProps({ kind: 'tip' });
    label = wrapper.find('.label');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('aside-kind.tip');

    wrapper.setProps({ kind: 'warning' });
    label = wrapper.find('.label');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('aside-kind.warning');

    wrapper.setProps({ kind: 'note', name: 'Custom Name' });
    label = wrapper.find('.label');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('Custom Name');
  });

  it('renders slot content', () => {
    const wrapper = shallowMount(Aside, {
      propsData: {
        kind: 'important',
      },
      slots: {
        default: '<p>foo</p>',
      },
    });

    const content = wrapper.find('.label + p');
    expect(content.exists()).toBe(true);
    expect(content.text()).toBe('foo');
  });
});
