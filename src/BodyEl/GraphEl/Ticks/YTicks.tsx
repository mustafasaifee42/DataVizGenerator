import { HEIGHT, WIDTH } from '../../Constants';
import { scaleLinear } from 'd3-scale';
import { getMargin } from '../../Utils';

interface Props {
  isXScaleTicksValueRotated: boolean;
  isTicksTitleVisible: boolean;
  isYScaleTicksValueVisible: boolean;
  yScaleTicksValueAlignment: 'left' | 'right';
  yScaleTicksValuePosition: 'top' | 'center';
  tickStyle: 0 | 1 | 2 | 3 | 4;
}
export const YTicks = (props: Props) => {
  const {
    isYScaleTicksValueVisible,
    yScaleTicksValueAlignment,
    yScaleTicksValuePosition,
    isXScaleTicksValueRotated,
    isTicksTitleVisible,
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
        <g>
          {tickValues.map((d, i) => (
            <line
              x1={
                tickStyle === 4
                  ? 0
                  : yScaleTicksValueAlignment === 'left'
                  ? 0
                  : yScaleTicksValuePosition !== 'center' || tickStyle !== 3
                  ? 0
                  : graphWidth
              }
              y1={yScale(d)}
              x2={
                tickStyle === 4
                  ? graphWidth
                  : yScaleTicksValueAlignment === 'right'
                  ? graphWidth
                  : yScaleTicksValuePosition !== 'center' || tickStyle !== 3
                  ? graphWidth
                  : 10
              }
              y2={yScale(d)}
              stroke={
                tickStyle === 4
                  ? '#FFFFFF'
                  : tickStyle === 1
                  ? '#AAAAAA'
                  : '#DDDDDD'
              }
              strokeWidth={1}
              strokeDasharray={tickStyle === 1 ? '8' : '0'}
              key={i}
            />
          ))}
        </g>
      ) : null}
    </g>
  );
};
