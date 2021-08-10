import {
  TICKTITLEHEIGHT,
  TICKVALUEWIDTH,
  MARGINSIDE,
  MARGINTOP,
} from '../Constants';

export const getLeftMarginValue = (
  isTickValueVisible: boolean,
  isTickTitleVisible: boolean,
  tickValuePosition: 'center' | 'top',
  yScaleTicksValueAlignment: 'left' | 'right',
) => {
  const offsetBecauseOfTick = isTickValueVisible
    ? tickValuePosition === 'center'
      ? TICKVALUEWIDTH
      : 0
    : 0;
  const offsetBecauseOfTitle =
    isTickTitleVisible && isTickValueVisible ? TICKTITLEHEIGHT : 0;
  const finalValue =
    yScaleTicksValueAlignment === 'left'
      ? offsetBecauseOfTick + offsetBecauseOfTitle + MARGINSIDE
      : MARGINSIDE;
  return finalValue;
};

export const getRightMarginValue = (
  isTickValueVisible: boolean,
  isTickTitleVisible: boolean,
  tickValuePosition: 'center' | 'top',
  yScaleTicksValueAlignment: 'left' | 'right',
) => {
  const offsetBecauseOfTick = isTickValueVisible
    ? tickValuePosition === 'center'
      ? TICKVALUEWIDTH
      : 0
    : 0;
  const offsetBecauseOfTitle =
    isTickTitleVisible && isTickValueVisible ? TICKTITLEHEIGHT : 0;
  const padding = isTickValueVisible && tickValuePosition === 'center' ? 5 : 0;
  const finalValue =
    yScaleTicksValueAlignment === 'right'
      ? offsetBecauseOfTick + offsetBecauseOfTitle + padding + MARGINSIDE
      : MARGINSIDE;
  return finalValue;
};

export const getBottomMarginValue = (
  isTickValueVisible: boolean,
  isTickTitleVisible: boolean,
  isXScaleTicksValueRotated: boolean,
) => {
  const titleOffset =
    isTickTitleVisible && isTickValueVisible ? TICKTITLEHEIGHT : 0;
  const graphHeight = isXScaleTicksValueRotated
    ? 37 + titleOffset
    : 27 + titleOffset;
  return graphHeight;
};

export const getMargin = (
  isValueVisible: boolean,
  isTitleVisible: boolean,
  valuePosition: 'center' | 'top',
  yScaleValueAlignment: 'left' | 'right',
  isXScaleValueRotated: boolean,
) => {
  const margin = {
    top: MARGINTOP,
    bottom: getBottomMarginValue(
      isValueVisible,
      isTitleVisible,
      isXScaleValueRotated,
    ),
    left: getLeftMarginValue(
      isValueVisible,
      isTitleVisible,
      valuePosition,
      yScaleValueAlignment,
    ),
    right: getRightMarginValue(
      isValueVisible,
      isTitleVisible,
      valuePosition,
      yScaleValueAlignment,
    ),
  };
  return margin;
};
