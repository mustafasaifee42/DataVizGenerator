import { DATA } from '../../Constants';
import { scaleLinear } from 'd3-scale';
import { getMargin } from '../../Utils';

interface Props {
  primaryFont: string;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  isXScaleTicksValueRotated: boolean;
  isYScaleTicksValueVisible: boolean;
  yScaleTicksValueAlignment: 'left' | 'right';
  yScaleTicksValuePosition: 'top' | 'center';
  isTicksTitleVisible: boolean;
  isDataPointVisible: boolean;
  width: number;
  height: number;
  darkMode: boolean;
}

export const BubbleChart = (props: Props) => {
  const {
    primaryColor,
    primaryFont,
    secondaryColor,
    tertiaryColor,
    isXScaleTicksValueRotated,
    isYScaleTicksValueVisible,
    yScaleTicksValueAlignment,
    yScaleTicksValuePosition,
    isTicksTitleVisible,
    isDataPointVisible,
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
  const xScale = scaleLinear().range([0, graphWidth]).domain([0, 10000]);
  const rScale = scaleLinear().range([2, 25]).domain([0, 10000]);
  return (
    <g transform={`translate(${margin.left},${margin.top})`}>
      {DATA.map((d, i) => (
        <g key={i}>
          <circle
            cx={xScale(d.value)}
            cy={yScale(d.value1)}
            r={rScale(d.value2)}
            fill={
              i % 3 === 0
                ? primaryColor
                : i % 3 === 1
                ? secondaryColor
                : tertiaryColor
            }
            fillOpacity='0.3'
            strokeWidth='1'
            stroke={
              i % 3 === 0
                ? primaryColor
                : i % 3 === 1
                ? secondaryColor
                : tertiaryColor
            }
          />
          {isDataPointVisible ? (
            <text
              x={xScale(d.value)}
              y={yScale(d.value1)}
              fill={darkMode ? '#EEE' : '#333333'}
              fontFamily={primaryFont}
              fontSize='10px'
              dy={3}
              textAnchor='middle'
              fontWeight='700'
            >
              {d.month}
            </text>
          ) : null}
        </g>
      ))}
    </g>
  );
};
