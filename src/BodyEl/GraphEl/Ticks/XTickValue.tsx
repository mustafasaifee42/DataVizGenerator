import { DATA, HEIGHT, WIDTH, BARSMARGINSIDE } from '../../Constants';
import { scaleBand, scaleLinear } from 'd3-scale';
import { getMargin } from '../../Utils';

interface Props {
  primaryFont: string;
  isXScaleTicksValueRotated: boolean;
  isTicksTitleVisible: boolean;
  isYScaleTicksValueVisible: boolean;
  yScaleTicksValueAlignment: 'left' | 'right';
  yScaleTicksValuePosition: 'top' | 'center';
  color: 'dark' | 'light';
  barWidth: 0 | 1 | 2;
  scaleType: 'linear' | 'band';
  isBubbleChart?: boolean;
}

export const XTickValue = (props: Props) => {
  const {
    isYScaleTicksValueVisible,
    yScaleTicksValueAlignment,
    yScaleTicksValuePosition,
    barWidth,
    isXScaleTicksValueRotated,
    isTicksTitleVisible,
    color,
    primaryFont,
    scaleType,
    isBubbleChart,
  } = props;
  const margin = getMargin(
    isYScaleTicksValueVisible,
    isTicksTitleVisible,
    yScaleTicksValuePosition,
    yScaleTicksValueAlignment,
    isXScaleTicksValueRotated,
  );
  const barsOffset =
    scaleType === 'band' &&
    isYScaleTicksValueVisible &&
    yScaleTicksValuePosition === 'top'
      ? BARSMARGINSIDE
      : 0;
  const graphHeight = HEIGHT - margin.top - margin.bottom;
  const graphWidth = WIDTH - margin.left - margin.right - barsOffset;
  const paddingInner = barWidth === 0 ? 0.1 : barWidth === 1 ? 0.25 : 0.5;
  const xScale = scaleBand()
    .range([0, graphWidth])
    .domain(DATA.map(d => d.month))
    .paddingInner(paddingInner)
    .paddingOuter(0.2);
  const xScaleLinear = scaleLinear()
    .range([0, graphWidth])
    .domain(isBubbleChart ? [0, 10000] : [0, DATA.length - 1]);
  const bubbleArray = [0, 2000, 4000, 6000, 8000, 10000];
  return (
    <g
      transform={`translate(${
        yScaleTicksValueAlignment === 'left'
          ? margin.left + barsOffset
          : margin.left
      },${margin.top})`}
    >
      {isBubbleChart ? (
        <>
          {bubbleArray.map((d, i) => {
            return (
              <g
                transform={`translate(${xScaleLinear(d)},${
                  isXScaleTicksValueRotated
                    ? graphHeight + 10
                    : graphHeight + 20
                })`}
                key={i}
              >
                <text
                  fontFamily={primaryFont}
                  fontSize={14}
                  x={0}
                  y={0}
                  fill={color === 'dark' ? '#666666' : '#AAAAAA'}
                  textAnchor={isXScaleTicksValueRotated ? 'end' : 'middle'}
                  transform={
                    isXScaleTicksValueRotated ? 'rotate(-60)' : 'rotate(0)'
                  }
                >
                  {d}
                </text>
              </g>
            );
          })}
        </>
      ) : (
        <>
          {DATA.map((d, i) => {
            return (
              <g
                transform={`translate(${
                  scaleType === 'band'
                    ? (xScale(d.month) as number) + xScale.bandwidth() / 2
                    : xScaleLinear(i)
                },${
                  isXScaleTicksValueRotated
                    ? graphHeight + 10
                    : graphHeight + 20
                })`}
                key={i}
              >
                <text
                  fontFamily={primaryFont}
                  fontSize={14}
                  x={0}
                  y={0}
                  fill={color === 'dark' ? '#666666' : '#AAAAAA'}
                  textAnchor={isXScaleTicksValueRotated ? 'end' : 'middle'}
                  transform={
                    isXScaleTicksValueRotated ? 'rotate(-60)' : 'rotate(0)'
                  }
                >
                  {d.month}
                </text>
              </g>
            );
          })}
        </>
      )}
      {isTicksTitleVisible && isYScaleTicksValueVisible ? (
        <text
          fontFamily={primaryFont}
          fontSize={18}
          x={graphWidth / 2}
          y={isXScaleTicksValueRotated ? graphHeight + 60 : graphHeight + 50}
          fontWeight='700'
          textAnchor='middle'
          fill={color === 'dark' ? '#333333' : '#999999'}
        >
          {isBubbleChart ? 'Production Value' : 'Months of the Year'}
        </text>
      ) : null}
    </g>
  );
};
