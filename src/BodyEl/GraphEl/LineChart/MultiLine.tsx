import { DATA, HEIGHT, WIDTH } from '../../Constants';
import { scaleLinear } from 'd3-scale';
import { line, area, curveLinear, curveMonotoneX, curveStep } from 'd3-shape';
import { getMargin } from '../../Utils';

interface Props {
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  isXScaleTicksValueRotated: boolean;
  isYScaleTicksValueVisible: boolean;
  yScaleTicksValueAlignment: 'left' | 'right';
  yScaleTicksValuePosition: 'top' | 'center';
  isTicksTitleVisible: boolean;
  curveType: 0 | 1 | 2;
  isDataPointVisible: boolean;
  isAreaVisible: boolean;
}

export const MultiLine = (props: Props) => {
  const {
    primaryColor,
    secondaryColor,
    tertiaryColor,
    isXScaleTicksValueRotated,
    isYScaleTicksValueVisible,
    yScaleTicksValueAlignment,
    yScaleTicksValuePosition,
    isTicksTitleVisible,
    curveType,
    isDataPointVisible,
    isAreaVisible,
  } = props;
  const margin = getMargin(
    isYScaleTicksValueVisible,
    isTicksTitleVisible,
    yScaleTicksValuePosition,
    yScaleTicksValueAlignment,
    isXScaleTicksValueRotated,
  );
  const graphHeight = HEIGHT - margin.top - margin.bottom;
  const graphWidth = WIDTH - margin.left - margin.right;
  const yScale = scaleLinear().domain([0, 10000]).range([graphHeight, 0]);
  const xScale = scaleLinear()
    .range([0, graphWidth])
    .domain([0, DATA.length - 1]);
  const l1 = line()
    .x((_d, i) => xScale(i))
    .y((d: any) => yScale(d.value))
    .curve(
      curveType === 0
        ? curveLinear
        : curveType === 1
        ? curveMonotoneX
        : curveStep,
    );
  const l2 = line()
    .x((_d, i) => xScale(i))
    .y((d: any) => yScale(d.value1))
    .curve(
      curveType === 0
        ? curveLinear
        : curveType === 1
        ? curveMonotoneX
        : curveStep,
    );
  const l3 = line()
    .x((_d, i) => xScale(i))
    .y((d: any) => yScale(d.value2))
    .curve(
      curveType === 0
        ? curveLinear
        : curveType === 1
        ? curveMonotoneX
        : curveStep,
    );
  const a1 = area()
    .x((_d, i) => xScale(i))
    .y0(yScale(0))
    .y1((d: any) => yScale(d.value))
    .curve(
      curveType === 0
        ? curveLinear
        : curveType === 1
        ? curveMonotoneX
        : curveStep,
    );
  const a2 = area()
    .x((_d, i) => xScale(i))
    .y0(yScale(0))
    .y1((d: any) => yScale(d.value1))
    .curve(
      curveType === 0
        ? curveLinear
        : curveType === 1
        ? curveMonotoneX
        : curveStep,
    );
  const a3 = area()
    .x((_d, i) => xScale(i))
    .y0(yScale(0))
    .y1((d: any) => yScale(d.value2))
    .curve(
      curveType === 0
        ? curveLinear
        : curveType === 1
        ? curveMonotoneX
        : curveStep,
    );
  return (
    <g transform={`translate(${margin.left},${margin.top})`}>
      <path
        d={l1(DATA as any) as string}
        fill='none'
        stroke={primaryColor}
        strokeWidth={2}
      />
      {isAreaVisible ? (
        <path d={a1(DATA as any) as string} fill={primaryColor} opacity='0.3' />
      ) : null}
      {isDataPointVisible ? (
        <>
          {DATA.map((d, i) => (
            <circle
              key={i}
              cx={xScale(i)}
              cy={yScale(d.value)}
              r={4}
              fill={primaryColor}
            />
          ))}
        </>
      ) : null}
      <path
        d={l2(DATA as any) as string}
        fill='none'
        stroke={secondaryColor}
        strokeWidth={2}
      />
      {isAreaVisible ? (
        <path
          d={a2(DATA as any) as string}
          fill={secondaryColor}
          opacity='0.3'
        />
      ) : null}
      {isDataPointVisible ? (
        <>
          {DATA.map((d, i) => (
            <circle
              key={i}
              cx={xScale(i)}
              cy={yScale(d.value1)}
              r={4}
              fill={secondaryColor}
            />
          ))}
        </>
      ) : null}
      <path
        d={l3(DATA as any) as string}
        fill='none'
        stroke={tertiaryColor}
        strokeWidth={2}
      />
      {isAreaVisible ? (
        <path
          d={a3(DATA as any) as string}
          fill={tertiaryColor}
          opacity='0.3'
        />
      ) : null}
      {isDataPointVisible ? (
        <>
          {DATA.map((d, i) => (
            <circle
              key={i}
              cx={xScale(i)}
              cy={yScale(d.value2)}
              r={4}
              fill={tertiaryColor}
            />
          ))}
        </>
      ) : null}
    </g>
  );
};
