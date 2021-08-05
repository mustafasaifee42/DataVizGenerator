import { DATA, HEIGHT, WIDTH, BARSMARGINSIDE } from '../../Constants';
import { scaleLinear, scaleBand } from 'd3-scale';
import { getMargin } from '../../Utils';

interface Props {
  primaryColor: string;
  primaryFont: string;
  barWidth: 0 | 1 | 2;
  isXScaleTicksValueRotated: boolean;
  isYScaleTicksValueVisible: boolean;
  yScaleTicksValueAlignment: 'left' | 'right';
  yScaleTicksValuePosition: 'top' | 'center';
  isTicksTitleVisible: boolean;
  isValueColored: boolean;
}

export const BarValues = (props: Props) => {
  const {
    primaryColor,
    barWidth,
    isXScaleTicksValueRotated,
    isYScaleTicksValueVisible,
    yScaleTicksValueAlignment,
    yScaleTicksValuePosition,
    isTicksTitleVisible,
    primaryFont,
    isValueColored,
  } = props;
  const margin = getMargin(
    isYScaleTicksValueVisible,
    isTicksTitleVisible,
    yScaleTicksValuePosition,
    yScaleTicksValueAlignment,
    isXScaleTicksValueRotated,
  );
  const paddingInner = barWidth === 0 ? 0.1 : barWidth === 1 ? 0.25 : 0.5;
  const barsOffset =
    isYScaleTicksValueVisible && yScaleTicksValuePosition === 'top'
      ? BARSMARGINSIDE
      : 0;
  const graphHeight = HEIGHT - margin.top - margin.bottom;
  const graphWidth = WIDTH - margin.left - margin.right - barsOffset;
  const yScale = scaleLinear().domain([0, 10000]).range([graphHeight, 0]);
  const xScale = scaleBand()
    .range([0, graphWidth])
    .domain(DATA.map(d => d.month))
    .paddingInner(paddingInner)
    .paddingOuter(0.2);
  return (
    <g
      transform={`translate(${
        yScaleTicksValueAlignment === 'left'
          ? margin.left + barsOffset
          : margin.left
      },${margin.top})`}
    >
      {DATA.map((d, i) => {
        return (
          <text
            key={i}
            fontFamily={primaryFont}
            x={(xScale(d.month) as number) + xScale.bandwidth() / 2}
            y={yScale(d.value)}
            dy={-5}
            fill={isValueColored ? primaryColor : '#666666'}
            fontSize={14}
            fontWeight='700'
            textAnchor='middle'
          >
            {d.value}
          </text>
        );
      })}
    </g>
  );
};
