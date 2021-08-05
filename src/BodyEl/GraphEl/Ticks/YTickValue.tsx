import { HEIGHT, WIDTH } from '../../Constants';
import { scaleLinear } from 'd3-scale';
import { getMargin } from '../../Utils';

interface Props {
  primaryFont: string;
  isXScaleTicksValueRotated: boolean;
  isTicksTitleVisible: boolean;
  isYScaleTicksValueVisible: boolean;
  yScaleTicksValueAlignment: 'left' | 'right';
  yScaleTicksValuePosition: 'top' | 'center';
  color: 'dark' | 'light';
  tickStyle: 0 | 1 | 2 | 3 | 4;
}

export const YTickValue = (props: Props) => {
  const {
    isYScaleTicksValueVisible,
    yScaleTicksValueAlignment,
    yScaleTicksValuePosition,
    isXScaleTicksValueRotated,
    isTicksTitleVisible,
    color,
    primaryFont,
    tickStyle,
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
  const tickValues = [0, 2000, 4000, 6000, 8000, 10000];
  return (
    <g transform={`translate(${margin.left},${margin.top})`}>
      {isYScaleTicksValueVisible ? (
        <>
          {tickValues.map((d, i) => (
            <text
              fontFamily={primaryFont}
              fontSize={12}
              x={yScaleTicksValueAlignment === 'left' ? 0 : graphWidth}
              y={yScale(d)}
              dy={
                yScaleTicksValuePosition === 'center' || tickStyle === 4
                  ? 4
                  : -4
              }
              textAnchor={
                yScaleTicksValueAlignment === 'left'
                  ? yScaleTicksValuePosition === 'center' || tickStyle === 4
                    ? 'end'
                    : 'start'
                  : yScaleTicksValuePosition === 'center' || tickStyle === 4
                  ? 'start'
                  : 'end'
              }
              dx={
                yScaleTicksValuePosition === 'center'
                  ? yScaleTicksValueAlignment === 'left'
                    ? -5
                    : 5
                  : 0
              }
              fill={color === 'dark' ? '#666666' : '#AAAAAA'}
              key={i}
            >
              {d}
            </text>
          ))}
        </>
      ) : null}
      {isTicksTitleVisible && isYScaleTicksValueVisible ? (
        <g
          transform={`translate(${
            yScaleTicksValueAlignment === 'left'
              ? yScaleTicksValuePosition === 'top'
                ? -20
                : -50
              : yScaleTicksValuePosition === 'top'
              ? graphWidth + 20
              : graphWidth + 70
          },${graphHeight / 2})`}
        >
          <text
            fontFamily={primaryFont}
            fontSize={18}
            x={0}
            y={0}
            fontWeight='700'
            textAnchor='middle'
            fill={color === 'dark' ? '#333333' : '#999999'}
            transform='rotate(-90)'
          >
            Sales Per Month
          </text>
        </g>
      ) : null}
    </g>
  );
};
