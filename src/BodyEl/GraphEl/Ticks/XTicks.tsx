import { DATA } from '../../Constants';
import { scaleLinear } from 'd3-scale';
import { getMargin } from '../../Utils';

interface Props {
  isXScaleTicksValueRotated: boolean;
  isTicksTitleVisible: boolean;
  isYScaleTicksValueVisible: boolean;
  yScaleTicksValueAlignment: 'left' | 'right';
  yScaleTicksValuePosition: 'top' | 'center';
  tickStyle: 0 | 1 | 2;
  isDashed: boolean;
  isBubbleChart?: boolean;
  width: number;
  height: number;
  darkMode: boolean;
}

export const XTicks = (props: Props) => {
  const {
    isYScaleTicksValueVisible,
    yScaleTicksValueAlignment,
    yScaleTicksValuePosition,
    isXScaleTicksValueRotated,
    isTicksTitleVisible,
    tickStyle,
    isDashed,
    isBubbleChart,
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
  const xScale = scaleLinear()
    .range([0, graphWidth])
    .domain(isBubbleChart ? [0, 10000] : [0, 11]);
  const bubbleArray = [0, 2000, 4000, 6000, 8000, 10000];
  return (
    <>
      {tickStyle !== 0 ? (
        <g transform={`translate(${margin.left},${margin.top})`}>
          {isBubbleChart ? (
            <>
              {bubbleArray.map((d, i) => (
                <line
                  x1={xScale(d)}
                  y1={tickStyle === 1 ? graphHeight + 5 : 0}
                  x2={xScale(d)}
                  y2={graphHeight}
                  stroke={
                    tickStyle === 2 && isDashed
                      ? '#AAAAAA'
                      : tickStyle === 1
                      ? '#666666'
                      : '#DDDDDD'
                  }
                  strokeWidth={1}
                  strokeDasharray={tickStyle === 2 && isDashed ? '8' : '0'}
                  key={i}
                  opacity={darkMode ? 0.3 : 1}
                />
              ))}
            </>
          ) : (
            <>
              {DATA.map((_d, i) =>
                i % 2 === 0 ? (
                  <line
                    x1={xScale(i)}
                    y1={tickStyle === 1 ? graphHeight + 5 : 0}
                    x2={xScale(i)}
                    y2={graphHeight}
                    stroke={
                      tickStyle === 2 && isDashed
                        ? '#AAAAAA'
                        : tickStyle === 1
                        ? '#666666'
                        : '#DDDDDD'
                    }
                    strokeWidth={1}
                    strokeDasharray={tickStyle === 2 && isDashed ? '8' : '0'}
                    key={i}
                    opacity={darkMode ? 0.3 : 1}
                  />
                ) : null,
              )}
            </>
          )}
        </g>
      ) : null}
    </>
  );
};
