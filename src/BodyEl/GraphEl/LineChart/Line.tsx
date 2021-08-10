import { DATA } from '../../Constants';
import { scaleLinear } from 'd3-scale';
import { line, area, curveLinear, curveMonotoneX, curveStep } from 'd3-shape';
import { getMargin } from '../../Utils';

interface Props {
  primaryColor: string;
  primaryFont: string;
  isXScaleTicksValueRotated: boolean;
  isYScaleTicksValueVisible: boolean;
  yScaleTicksValueAlignment: 'left' | 'right';
  yScaleTicksValuePosition: 'top' | 'center';
  isTicksTitleVisible: boolean;
  curveType: 0 | 1 | 2;
  isAreaVisible: boolean;
  isDataPointVisible: boolean;
  isDataValueVisible: boolean;
  width: number;
  height: number;
  darkMode: boolean;
}

export const Line = (props: Props) => {
  const {
    primaryColor,
    primaryFont,
    isXScaleTicksValueRotated,
    isYScaleTicksValueVisible,
    yScaleTicksValueAlignment,
    yScaleTicksValuePosition,
    isTicksTitleVisible,
    curveType,
    isAreaVisible,
    isDataPointVisible,
    isDataValueVisible,
    width,
    height,
    darkMode,
  } = props;
  const margin = getMargin(
    isYScaleTicksValueVisible,
    isTicksTitleVisible,
    yScaleTicksValuePosition,
    yScaleTicksValueAlignment,
    isXScaleTicksValueRotated,
  );
  const graphHeight = height - margin.top - margin.bottom;
  const graphWidth = width - margin.left - margin.right;
  const yScale = scaleLinear().domain([0, 10000]).range([graphHeight, 0]);
  const xScale = scaleLinear()
    .range([0, graphWidth])
    .domain([0, DATA.length - 1]);
  const l = line()
    .x((_d, i) => xScale(i))
    .y((d: any) => yScale(d.value))
    .curve(
      curveType === 0
        ? curveLinear
        : curveType === 1
        ? curveMonotoneX
        : curveStep,
    );
  const a = area()
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
  return (
    <g transform={`translate(${margin.left},${margin.top})`}>
      <path
        d={l(DATA as any) as string}
        fill='none'
        stroke={primaryColor}
        strokeWidth={2}
      />
      {isAreaVisible ? (
        <path d={a(DATA as any) as string} fill={primaryColor} opacity='0.3' />
      ) : null}
      {isDataValueVisible ? (
        <>
          {DATA.map((d, i) => (
            <g key={i} transform={`translate(${xScale(i)},${yScale(d.value)})`}>
              <rect
                x={-20}
                y={isDataPointVisible ? -25 : -13}
                width={40}
                height={20}
                fill={darkMode ? '#07090A' : '#FFF'}
                opacity={darkMode ? 0.5 : 0.7}
                rx={2}
                ry={2}
              />
              <text
                fontFamily={primaryFont}
                x={0}
                y={0}
                dy={isDataPointVisible ? -10 : 3}
                fill={darkMode ? '#CCC' : '#666666'}
                fontSize={14}
                fontWeight='700'
                textAnchor='middle'
              >
                {d.value}
              </text>
            </g>
          ))}
        </>
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
    </g>
  );
};
