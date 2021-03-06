import React from 'react';
import { scaleLinear } from 'd3-scale';
import { mount } from 'enzyme';

import { FunnelChart } from '../../../src';

describe('FunnelChart', () => {
  const funnelData = [
    { observation: 1, value: 100 },
    { observation: 2, value: 85 },
    { observation: 3, value: 42 },
    { observation: 4, value: 37 },
    { observation: 5, value: 12 },
  ];

  const props = {
    data: funnelData,
    x: d => d.value,
    y: d => d.observation,
    pathClassName: 'path-class',
    horizontal: true,
    xScale: scaleLinear()
      .domain([-1, 0, 1])
      .range([0, 30]),
    yScale: scaleLinear()
      .domain([0, 10])
      .range([0, 30]),
    pathStyle: { fill: 'yellow' },
  };

  it('renders a funnel chart', () => {
    const chart = mount(<FunnelChart {...props} />);
    const group = chart.find('g.rct-funnel-chart');
    expect(group).toHaveLength(1);
    expect(group.find('path')).toHaveLength(props.data.length - 1);

    group.find('path').forEach(path => {
      const pathD = path.instance().getAttribute('d');

      expect(pathD).not.toContain('NaN');
    });

    const lastPath = group.find('path').last();
    const pathData = lastPath.instance().getAttribute('d');
    expect(pathData).toEqual('M1140,12L390,15L-330,15L-1080,12Z');
  });

  it('passes props correctly', () => {
    const chart = mount(<FunnelChart {...props} />);
    const lastPath = chart.find('path').last();
    expect(lastPath.props().className).toContain(props.pathClassName);
    expect(lastPath.props().style).toHaveProperty('fill', props.pathStyle.fill);
    expect(typeof lastPath.props().d).toBe('string');
  });
});
