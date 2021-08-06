import styled from 'styled-components';
import { useState } from 'react';
import { FONTSARRAY, COLORARRAY, HEIGHT, WIDTH } from './Constants';
import { YTicks } from './GraphEl/Ticks/YTicks';
import { XTicks } from './GraphEl/Ticks/XTicks';
import { YTickValue } from './GraphEl/Ticks/YTickValue';
import { XTickValue } from './GraphEl/Ticks/XTickValue';
import { Bars } from './GraphEl/BarGraph/Bars';
import { Line } from './GraphEl/LineChart/Line';
import { BubbleChart } from './GraphEl/BubbleChart/BubbleChart';
import { MultiLine } from './GraphEl/LineChart/MultiLine';
import { BarValues } from './GraphEl/BarGraph/BarValues';

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0 20px 0;
`;

interface GraphCSSSettingsProps {
  borderShadowSettings: 0 | 1 | 2;
  roundedCorner: 0 | 1 | 2;
}

const GraphContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const GraphEl = styled.div<GraphCSSSettingsProps>`
  width: fit-content;
  background-color: #ffffff;
  margin: 15px;
  border-radius: ${props => `${5 * props.roundedCorner}px`};
  border: ${props =>
    props.borderShadowSettings === 1 ? '1px solid #dadada' : '0'};
  box-shadow: ${props =>
    props.borderShadowSettings === 2
      ? '0px 0px 10px rgb(180 180 180 / 50%)'
      : '0 0 0 rgb(180 180 180 / 50%)'};
`;

const BodyArea = styled.div`
  justify-content: center;
`;

interface TitleElSettings {
  font: string;
  bold: boolean;
  uppercase: boolean;
  borderBottom: boolean;
  primaryColor: string;
  colorText: boolean;
  backgroundColorSettings: boolean;
}

const TitleEl = styled.h1<TitleElSettings>`
  margin: 0;
  padding: ${props =>
    props.borderBottom || props.backgroundColorSettings
      ? '25px'
      : '25px 25px 0 25px'};
  font-family: ${props => props.font};
  font-weight: ${props => (props.bold ? '700' : '500')};
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'none')};
  border-bottom: ${props => (props.borderBottom ? '1px solid #DDDDDD' : '0')};
  color: ${props => (props.colorText ? props.primaryColor : 'inherit')};
  background-color: ${props =>
    props.backgroundColorSettings ? '#FAFAFA' : 'transparent'};
`;

interface SvgProps {
  noTopPadding?: boolean;
}

const SVGEl = styled.svg<SvgProps>`
  padding: ${props => (props.noTopPadding ? '0 20px 20px 20px' : '20px')};
`;

interface SubNoteElSettings {
  font: string;
  textColor: 'dark' | 'light';
  alignment: 'left' | 'right';
}

const SubNoteEl = styled.div<SubNoteElSettings>`
  margin: 0 25px;
  padding-bottom: 25px;
  font-family: ${props => props.font};
  font-size: 14px;
  color: ${props => (props.textColor === 'dark' ? '#666666' : '#A4A4A4')};
  display: flex;
  justify-content: ${props =>
    props.alignment === 'left' ? 'flex-start' : 'flex-end'};
`;

interface LinkElSettings {
  linkColor: 0 | 1 | 2;
  linkStyle: 0 | 1 | 2 | 3;
  primaryColor: string;
}

const LinkEl = styled.span<LinkElSettings>`
  color: ${props =>
    props.linkColor === 2
      ? props.primaryColor
      : props.linkColor === 1
      ? '#333333'
      : 'inherit'};
  margin-left: 5px;
  font-weight: ${props => (props.linkStyle === 3 ? '700' : '400')};
  font-style: ${props => (props.linkStyle === 2 ? 'italic' : 'normal')};
  text-decoration: ${props => (props.linkStyle === 1 ? 'underline' : 'none')};
`;

interface KeyContainerAlignment {
  position: 'flex-start' | 'flex-end' | 'center';
  isOverlap: boolean;
}

const KeyContainer = styled.div<KeyContainerAlignment>`
  display: flex;
  width: fit-content;
  margin: ${props =>
    props.position === 'flex-end'
      ? '25px 0 0 auto'
      : props.position === 'center'
      ? '25px auto 0 auto'
      : 0};
  margin-top: 25px;
  padding: 5px 10px;
  margin-bottom: ${props =>
    props.position !== 'flex-start' && props.isOverlap ? '-26px' : 0};
  background-color: ${props =>
    props.position !== 'flex-start' && props.isOverlap
      ? 'rgba(250, 250, 250, 0.8)'
      : 'transparent'};
`;

const KeyContainerNoFlex = styled.div<KeyContainerAlignment>`
  width: fit-content;
  margin: 25px 20px 0 auto;
  padding: 5px 10px;
  margin-bottom: -85px;
  background-color: rgba(250, 250, 250, 0.8);
  border: 1px solid #eee;
`;

const KeyElNoFlex = styled.div`
  display: flex;
  margin: 10px 0;
  align-items: center;
  &:first-of-type {
    margin-top: 0;
  }
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const KeyEl = styled.div`
  display: flex;
  margin: 0 7px;
  align-items: center;
  &:first-of-type {
    margin-left: 0;
  }
  &:last-of-type {
    margin-right: 0;
  }
`;

interface ColorKeyProps {
  fill: string;
}

const ColorKey = styled.div<ColorKeyProps>`
  background-color: ${props => props.fill};
  width: 12px;
  height: 12px;
  margin-right: 5px;
  border-radius: 2px;
`;

interface KeyTitleElProps {
  font: string;
}
const KeyTitleEl = styled.div<KeyTitleElProps>`
  font-family: ${props => props.font};
  font-size: 14px;
  color: #999999;
`;

const KeyDiv = styled.div`
  position: relative;
  padding: 0 25px;
  z-index: 1000;
`;

export const BodyEl = () => {
  const colorIndex = Math.floor(Math.random() * COLORARRAY.length);
  const [keySettings, updateKeySettings] = useState({
    alignment: Math.floor(Math.random() * 3),
    isOverlap: Math.random() > 0.5 ? true : false,
    isKeyVerticle: Math.random() > 0.5 ? true : false,
  });
  const [primaryFont, updatePrimaryFont] = useState(
    FONTSARRAY[Math.floor(Math.random() * FONTSARRAY.length)],
  );
  const [colors, updateColors] = useState({
    primaryColor: COLORARRAY[colorIndex],
    secondaryColor: COLORARRAY[(colorIndex + 1) % COLORARRAY.length],
    tertiaryColor: COLORARRAY[(colorIndex + 2) % COLORARRAY.length],
  });
  const [bgSettings, updateBgSettings] = useState({
    roundedCorner: Math.floor(Math.random() * 3),
    borderShadowSettings: Math.floor(Math.random() * 3),
  });
  const [titleSettings, updateTitleSettings] = useState({
    bold: Math.random() > 0.5 ? true : false,
    uppercase: Math.random() > 0.5 ? true : false,
    borderBottom: Math.random() > 0.5 ? true : false,
    backgroundColorSettings: Math.random() > 0.5 ? true : false,
    colorText: Math.random() > 0.5 ? true : false,
  });
  const [subNoteSettings, updateSubNoteSettings] = useState({
    linkColor: Math.floor(Math.random() * 3),
    linkStyle: Math.floor(Math.random() * 4),
    alignment: Math.random() > 0.5 ? 'left' : 'right',
    textColor: Math.random() > 0.5 ? 'dark' : 'light',
  });
  const [barSettings, updateBarSettings] = useState({
    roundedCorner: Math.floor(Math.random() * 3),
    barWidth: Math.floor(Math.random() * 3),
    isDataValueVisible: Math.random() > 0.5 ? true : false,
    isValueColored: Math.random() > 0.5 ? true : false,
  });
  const [lineSettings, updateLineSettings] = useState({
    curveType: Math.floor(Math.random() * 3),
    isAreaVisible: Math.random() > 0.5 ? true : false,
    isDataPointVisible: Math.random() > 0.5 ? true : false,
    isDataValueVisible: Math.random() > 0.5 ? true : false,
  });
  const [tickSettings, updateTickSettings] = useState({
    isTicksTitleVisible: Math.random() > 0.5 ? true : false,
    isXScaleTicksValueRotated: Math.random() > 0.5 ? true : false,
    isYScaleTicksValueVisible: Math.random() > 0.5 ? true : false,
    yScaleTicksValueAlignment: Math.random() > 0.5 ? 'left' : 'right',
    yScaleTicksValuePosition: Math.random() > 0.5 ? 'top' : 'center',
    barWidth: Math.floor(Math.random() * 3),
    mode: Math.random() > 0.5 ? 'dark' : 'light',
    yTickStyle: Math.floor(Math.random() * 5),
    xTickStyle: Math.floor(Math.random() * 3),
  });
  const updatesSettings = () => {
    const colorIndex = Math.floor(Math.random() * COLORARRAY.length);
    updatePrimaryFont(
      FONTSARRAY[Math.floor(Math.random() * FONTSARRAY.length)],
    );
    updateKeySettings({
      alignment: Math.floor(Math.random() * 3),
      isOverlap: Math.random() > 0.5 ? true : false,
      isKeyVerticle: Math.random() > 0.5 ? true : false,
    });
    updateColors({
      primaryColor: COLORARRAY[colorIndex],
      secondaryColor: COLORARRAY[(colorIndex + 1) % COLORARRAY.length],
      tertiaryColor: COLORARRAY[(colorIndex + 2) % COLORARRAY.length],
    });
    updateBgSettings({
      roundedCorner: Math.floor(Math.random() * 3),
      borderShadowSettings: Math.floor(Math.random() * 3),
    });
    updateTitleSettings({
      bold: Math.random() > 0.5 ? true : false,
      uppercase: Math.random() > 0.5 ? true : false,
      borderBottom: Math.random() > 0.5 ? true : false,
      backgroundColorSettings: Math.random() > 0.5 ? true : false,
      colorText: Math.random() > 0.5 ? true : false,
    });
    updateSubNoteSettings({
      linkColor: Math.floor(Math.random() * 3),
      linkStyle: Math.floor(Math.random() * 4),
      alignment: Math.random() > 0.5 ? 'left' : 'right',
      textColor: Math.random() > 0.5 ? 'dark' : 'light',
    });
    updateBarSettings({
      roundedCorner: Math.floor(Math.random() * 3),
      barWidth: Math.floor(Math.random() * 3),
      isDataValueVisible: Math.random() > 0.5 ? true : false,
      isValueColored: Math.random() > 0.5 ? true : false,
    });
    updateTickSettings({
      isTicksTitleVisible: Math.random() > 0.5 ? true : false,
      isXScaleTicksValueRotated: Math.random() > 0.5 ? true : false,
      isYScaleTicksValueVisible: Math.random() > 0.5 ? true : false,
      yScaleTicksValueAlignment: Math.random() > 0.5 ? 'left' : 'right',
      yScaleTicksValuePosition: Math.random() > 0.5 ? 'top' : 'center',
      barWidth: Math.floor(Math.random() * 3),
      mode: Math.random() > 0.5 ? 'dark' : 'light',
      yTickStyle: Math.floor(Math.random() * 5),
      xTickStyle: Math.floor(Math.random() * 3),
    });
    updateLineSettings({
      curveType: Math.floor(Math.random() * 3),
      isAreaVisible: Math.random() > 0.5 ? true : false,
      isDataPointVisible: Math.random() > 0.5 ? true : false,
      isDataValueVisible: Math.random() > 0.5 ? true : false,
    });
  };
  return (
    <BodyArea>
      <ButtonDiv>
        <button
          onClick={() => {
            updatesSettings();
          }}
        >
          Style Again 🔁
        </button>
      </ButtonDiv>
      <GraphContainer>
        <GraphEl
          roundedCorner={bgSettings.roundedCorner as 0 | 1 | 2}
          borderShadowSettings={bgSettings.borderShadowSettings as 0 | 1 | 2}
        >
          <TitleEl
            font={primaryFont}
            bold={titleSettings.bold}
            uppercase={titleSettings.uppercase}
            borderBottom={titleSettings.borderBottom}
            primaryColor={colors.primaryColor}
            colorText={titleSettings.colorText}
            backgroundColorSettings={titleSettings.backgroundColorSettings}
          >
            Bar Graph
          </TitleEl>
          <SVGEl width={WIDTH + 40} height={HEIGHT + 50}>
            <g>
              <YTicks
                isXScaleTicksValueRotated={
                  tickSettings.isXScaleTicksValueRotated
                }
                isTicksTitleVisible={tickSettings.isTicksTitleVisible}
                isYScaleTicksValueVisible={
                  tickSettings.isYScaleTicksValueVisible
                }
                yScaleTicksValueAlignment={
                  tickSettings.yScaleTicksValueAlignment as 'left' | 'right'
                }
                yScaleTicksValuePosition={
                  tickSettings.yTickStyle === 4
                    ? 'center'
                    : (tickSettings.yScaleTicksValuePosition as
                        | 'top'
                        | 'center')
                }
                tickStyle={tickSettings.yTickStyle as 0 | 1 | 2 | 3 | 4}
              />
              <Bars
                primaryColor={colors.primaryColor}
                roundedCorner={barSettings.roundedCorner as 0 | 1 | 2}
                barWidth={barSettings.barWidth as 0 | 1 | 2}
                isXScaleTicksValueRotated={
                  tickSettings.isXScaleTicksValueRotated
                }
                isYScaleTicksValueVisible={
                  tickSettings.isYScaleTicksValueVisible
                }
                yScaleTicksValueAlignment={
                  tickSettings.yScaleTicksValueAlignment as 'left' | 'right'
                }
                yScaleTicksValuePosition={
                  tickSettings.yTickStyle === 4
                    ? 'center'
                    : (tickSettings.yScaleTicksValuePosition as
                        | 'top'
                        | 'center')
                }
                isTicksTitleVisible={tickSettings.isTicksTitleVisible}
              />
              {tickSettings.yTickStyle === 4 ? (
                <YTicks
                  isXScaleTicksValueRotated={
                    tickSettings.isXScaleTicksValueRotated
                  }
                  isTicksTitleVisible={tickSettings.isTicksTitleVisible}
                  isYScaleTicksValueVisible={
                    tickSettings.isYScaleTicksValueVisible
                  }
                  yScaleTicksValueAlignment={
                    tickSettings.yScaleTicksValueAlignment as 'left' | 'right'
                  }
                  yScaleTicksValuePosition={
                    tickSettings.yTickStyle === 4
                      ? 'center'
                      : (tickSettings.yScaleTicksValuePosition as
                          | 'top'
                          | 'center')
                  }
                  tickStyle={4}
                />
              ) : null}
              <YTickValue
                primaryFont={primaryFont}
                isXScaleTicksValueRotated={
                  tickSettings.isXScaleTicksValueRotated
                }
                isTicksTitleVisible={tickSettings.isTicksTitleVisible}
                isYScaleTicksValueVisible={
                  tickSettings.isYScaleTicksValueVisible
                }
                yScaleTicksValueAlignment={
                  tickSettings.yScaleTicksValueAlignment as 'left' | 'right'
                }
                yScaleTicksValuePosition={
                  tickSettings.yTickStyle === 4
                    ? 'center'
                    : (tickSettings.yScaleTicksValuePosition as
                        | 'top'
                        | 'center')
                }
                color={tickSettings.mode as 'dark' | 'light'}
                tickStyle={tickSettings.yTickStyle as 0 | 1 | 2 | 3 | 4}
              />
              <XTickValue
                primaryFont={primaryFont}
                isXScaleTicksValueRotated={
                  tickSettings.isXScaleTicksValueRotated
                }
                isTicksTitleVisible={tickSettings.isTicksTitleVisible}
                isYScaleTicksValueVisible={
                  tickSettings.isYScaleTicksValueVisible
                }
                yScaleTicksValueAlignment={
                  tickSettings.yScaleTicksValueAlignment as 'left' | 'right'
                }
                yScaleTicksValuePosition={
                  tickSettings.yScaleTicksValuePosition as 'top' | 'center'
                }
                color={tickSettings.mode as 'dark' | 'light'}
                barWidth={barSettings.barWidth as 0 | 1 | 2}
                scaleType={'band'}
              />
              {barSettings.isDataValueVisible ||
              !tickSettings.isYScaleTicksValueVisible ? (
                <BarValues
                  primaryColor={colors.primaryColor}
                  primaryFont={primaryFont}
                  barWidth={barSettings.barWidth as 0 | 1 | 2}
                  isValueColored={barSettings.isValueColored}
                  isXScaleTicksValueRotated={
                    tickSettings.isXScaleTicksValueRotated
                  }
                  isYScaleTicksValueVisible={
                    tickSettings.isYScaleTicksValueVisible
                  }
                  yScaleTicksValueAlignment={
                    tickSettings.yScaleTicksValueAlignment as 'left' | 'right'
                  }
                  yScaleTicksValuePosition={
                    tickSettings.yTickStyle === 4
                      ? 'center'
                      : (tickSettings.yScaleTicksValuePosition as
                          | 'top'
                          | 'center')
                  }
                  isTicksTitleVisible={tickSettings.isTicksTitleVisible}
                />
              ) : null}
            </g>
          </SVGEl>
          <SubNoteEl
            font={primaryFont}
            textColor={subNoteSettings.textColor as 'light' | 'dark'}
            alignment={subNoteSettings.alignment as 'left' | 'right'}
          >
            Source and data credits:
            <LinkEl
              linkColor={subNoteSettings.linkColor as 0 | 1 | 2}
              linkStyle={subNoteSettings.linkStyle as 0 | 1 | 2 | 3}
              primaryColor={colors.primaryColor}
            >
              www.example.com
            </LinkEl>
          </SubNoteEl>
        </GraphEl>
        <GraphEl
          roundedCorner={bgSettings.roundedCorner as 0 | 1 | 2}
          borderShadowSettings={bgSettings.borderShadowSettings as 0 | 1 | 2}
        >
          <TitleEl
            font={primaryFont}
            bold={titleSettings.bold}
            uppercase={titleSettings.uppercase}
            borderBottom={titleSettings.borderBottom}
            primaryColor={colors.primaryColor}
            colorText={titleSettings.colorText}
            backgroundColorSettings={titleSettings.backgroundColorSettings}
          >
            Line Chart
          </TitleEl>
          <SVGEl width={WIDTH + 40} height={HEIGHT + 50}>
            <g transform='translate(0,0)'>
              <YTicks
                isXScaleTicksValueRotated={
                  tickSettings.isXScaleTicksValueRotated
                }
                isTicksTitleVisible={tickSettings.isTicksTitleVisible}
                isYScaleTicksValueVisible={
                  tickSettings.isYScaleTicksValueVisible
                }
                yScaleTicksValueAlignment={
                  tickSettings.yScaleTicksValueAlignment as 'left' | 'right'
                }
                yScaleTicksValuePosition={
                  tickSettings.yTickStyle === 4
                    ? 'center'
                    : (tickSettings.yScaleTicksValuePosition as
                        | 'top'
                        | 'center')
                }
                tickStyle={(tickSettings.yTickStyle % 4) as 0 | 1 | 2 | 3}
              />
              <XTicks
                isXScaleTicksValueRotated={
                  tickSettings.isXScaleTicksValueRotated
                }
                isTicksTitleVisible={tickSettings.isTicksTitleVisible}
                isYScaleTicksValueVisible={
                  tickSettings.isYScaleTicksValueVisible
                }
                yScaleTicksValueAlignment={
                  tickSettings.yScaleTicksValueAlignment as 'left' | 'right'
                }
                yScaleTicksValuePosition={
                  tickSettings.yTickStyle === 4
                    ? 'center'
                    : (tickSettings.yScaleTicksValuePosition as
                        | 'top'
                        | 'center')
                }
                tickStyle={tickSettings.xTickStyle as 0 | 1 | 2}
                isDashed={tickSettings.yTickStyle === 1 ? true : false}
              />
              <Line
                primaryColor={colors.primaryColor}
                primaryFont={primaryFont}
                isXScaleTicksValueRotated={
                  tickSettings.isXScaleTicksValueRotated
                }
                isYScaleTicksValueVisible={
                  tickSettings.isYScaleTicksValueVisible
                }
                yScaleTicksValueAlignment={
                  tickSettings.yScaleTicksValueAlignment as 'left' | 'right'
                }
                yScaleTicksValuePosition={
                  tickSettings.yTickStyle === 4
                    ? 'center'
                    : (tickSettings.yScaleTicksValuePosition as
                        | 'top'
                        | 'center')
                }
                isTicksTitleVisible={tickSettings.isTicksTitleVisible}
                curveType={lineSettings.curveType as 0 | 1 | 2}
                isAreaVisible={lineSettings.isAreaVisible}
                isDataPointVisible={lineSettings.isDataPointVisible}
                isDataValueVisible={lineSettings.isDataValueVisible}
              />
              <YTickValue
                primaryFont={primaryFont}
                isXScaleTicksValueRotated={
                  tickSettings.isXScaleTicksValueRotated
                }
                isTicksTitleVisible={tickSettings.isTicksTitleVisible}
                isYScaleTicksValueVisible={
                  tickSettings.isYScaleTicksValueVisible
                }
                yScaleTicksValueAlignment={
                  tickSettings.yScaleTicksValueAlignment as 'left' | 'right'
                }
                yScaleTicksValuePosition={
                  tickSettings.yTickStyle === 4
                    ? 'center'
                    : (tickSettings.yScaleTicksValuePosition as
                        | 'top'
                        | 'center')
                }
                color={tickSettings.mode as 'dark' | 'light'}
                tickStyle={(tickSettings.yTickStyle % 4) as 0 | 1 | 2 | 3}
              />
              <XTickValue
                primaryFont={primaryFont}
                isXScaleTicksValueRotated={
                  tickSettings.isXScaleTicksValueRotated
                }
                isTicksTitleVisible={tickSettings.isTicksTitleVisible}
                isYScaleTicksValueVisible={
                  tickSettings.isYScaleTicksValueVisible
                }
                yScaleTicksValueAlignment={
                  tickSettings.yScaleTicksValueAlignment as 'left' | 'right'
                }
                yScaleTicksValuePosition={
                  tickSettings.yTickStyle === 4
                    ? 'center'
                    : (tickSettings.yScaleTicksValuePosition as
                        | 'top'
                        | 'center')
                }
                color={tickSettings.mode as 'dark' | 'light'}
                barWidth={barSettings.barWidth as 0 | 1 | 2}
                scaleType={'linear'}
              />
            </g>
          </SVGEl>
          <SubNoteEl
            font={primaryFont}
            textColor={subNoteSettings.textColor as 'light' | 'dark'}
            alignment={subNoteSettings.alignment as 'left' | 'right'}
          >
            Source and data credits:
            <LinkEl
              linkColor={subNoteSettings.linkColor as 0 | 1 | 2}
              linkStyle={subNoteSettings.linkStyle as 0 | 1 | 2 | 3}
              primaryColor={colors.primaryColor}
            >
              www.example.com
            </LinkEl>
          </SubNoteEl>
        </GraphEl>
        <GraphEl
          roundedCorner={bgSettings.roundedCorner as 0 | 1 | 2}
          borderShadowSettings={bgSettings.borderShadowSettings as 0 | 1 | 2}
        >
          <TitleEl
            font={primaryFont}
            bold={titleSettings.bold}
            uppercase={titleSettings.uppercase}
            borderBottom={titleSettings.borderBottom}
            primaryColor={colors.primaryColor}
            colorText={titleSettings.colorText}
            backgroundColorSettings={titleSettings.backgroundColorSettings}
          >
            Multiple Line Chart
          </TitleEl>
          {keySettings.isKeyVerticle && keySettings.alignment === 2 ? (
            <KeyDiv>
              <KeyContainerNoFlex
                position={'flex-end'}
                isOverlap={keySettings.isOverlap}
              >
                <KeyElNoFlex>
                  <ColorKey fill={colors.primaryColor} />
                  <KeyTitleEl font={primaryFont}>Category 1</KeyTitleEl>
                </KeyElNoFlex>
                <KeyElNoFlex>
                  <ColorKey fill={colors.secondaryColor} />
                  <KeyTitleEl font={primaryFont}>Category 2</KeyTitleEl>
                </KeyElNoFlex>
                <KeyElNoFlex>
                  <ColorKey fill={colors.tertiaryColor} />
                  <KeyTitleEl font={primaryFont}>Category 3</KeyTitleEl>
                </KeyElNoFlex>
              </KeyContainerNoFlex>
            </KeyDiv>
          ) : (
            <KeyDiv>
              <KeyContainer
                position={
                  keySettings.alignment === 0
                    ? 'flex-start'
                    : keySettings.alignment === 1
                    ? 'center'
                    : 'flex-end'
                }
                isOverlap={keySettings.isOverlap}
              >
                <KeyEl>
                  <ColorKey fill={colors.primaryColor} />
                  <KeyTitleEl font={primaryFont}>Category 1</KeyTitleEl>
                </KeyEl>
                <KeyEl>
                  <ColorKey fill={colors.secondaryColor} />
                  <KeyTitleEl font={primaryFont}>Category 2</KeyTitleEl>
                </KeyEl>
                <KeyEl>
                  <ColorKey fill={colors.tertiaryColor} />
                  <KeyTitleEl font={primaryFont}>Category 3</KeyTitleEl>
                </KeyEl>
              </KeyContainer>
            </KeyDiv>
          )}
          <SVGEl noTopPadding={true} width={WIDTH + 40} height={HEIGHT + 30}>
            <g transform='translate(0,0)'>
              <YTicks
                isXScaleTicksValueRotated={
                  tickSettings.isXScaleTicksValueRotated
                }
                isTicksTitleVisible={tickSettings.isTicksTitleVisible}
                isYScaleTicksValueVisible={
                  tickSettings.isYScaleTicksValueVisible
                }
                yScaleTicksValueAlignment={
                  tickSettings.yScaleTicksValueAlignment as 'left' | 'right'
                }
                yScaleTicksValuePosition={
                  tickSettings.yTickStyle === 4
                    ? 'center'
                    : (tickSettings.yScaleTicksValuePosition as
                        | 'top'
                        | 'center')
                }
                tickStyle={(tickSettings.yTickStyle % 4) as 0 | 1 | 2 | 3}
              />
              <XTicks
                isXScaleTicksValueRotated={
                  tickSettings.isXScaleTicksValueRotated
                }
                isTicksTitleVisible={tickSettings.isTicksTitleVisible}
                isYScaleTicksValueVisible={
                  tickSettings.isYScaleTicksValueVisible
                }
                yScaleTicksValueAlignment={
                  tickSettings.yScaleTicksValueAlignment as 'left' | 'right'
                }
                yScaleTicksValuePosition={
                  tickSettings.yTickStyle === 4
                    ? 'center'
                    : (tickSettings.yScaleTicksValuePosition as
                        | 'top'
                        | 'center')
                }
                tickStyle={tickSettings.xTickStyle as 0 | 1 | 2}
                isDashed={tickSettings.yTickStyle === 1 ? true : false}
              />
              <MultiLine
                primaryColor={colors.primaryColor}
                secondaryColor={colors.secondaryColor}
                tertiaryColor={colors.tertiaryColor}
                isXScaleTicksValueRotated={
                  tickSettings.isXScaleTicksValueRotated
                }
                isYScaleTicksValueVisible={
                  tickSettings.isYScaleTicksValueVisible
                }
                yScaleTicksValueAlignment={
                  tickSettings.yScaleTicksValueAlignment as 'left' | 'right'
                }
                yScaleTicksValuePosition={
                  tickSettings.yTickStyle === 4
                    ? 'center'
                    : (tickSettings.yScaleTicksValuePosition as
                        | 'top'
                        | 'center')
                }
                isTicksTitleVisible={tickSettings.isTicksTitleVisible}
                curveType={lineSettings.curveType as 0 | 1 | 2}
                isAreaVisible={lineSettings.isAreaVisible}
                isDataPointVisible={lineSettings.isDataPointVisible}
              />
              <YTickValue
                primaryFont={primaryFont}
                isXScaleTicksValueRotated={
                  tickSettings.isXScaleTicksValueRotated
                }
                isTicksTitleVisible={tickSettings.isTicksTitleVisible}
                isYScaleTicksValueVisible={
                  tickSettings.isYScaleTicksValueVisible
                }
                yScaleTicksValueAlignment={
                  tickSettings.yScaleTicksValueAlignment as 'left' | 'right'
                }
                yScaleTicksValuePosition={
                  tickSettings.yTickStyle === 4
                    ? 'center'
                    : (tickSettings.yScaleTicksValuePosition as
                        | 'top'
                        | 'center')
                }
                color={tickSettings.mode as 'dark' | 'light'}
                tickStyle={(tickSettings.yTickStyle % 4) as 0 | 1 | 2 | 3}
              />
              <XTickValue
                primaryFont={primaryFont}
                isXScaleTicksValueRotated={
                  tickSettings.isXScaleTicksValueRotated
                }
                isTicksTitleVisible={tickSettings.isTicksTitleVisible}
                isYScaleTicksValueVisible={
                  tickSettings.isYScaleTicksValueVisible
                }
                yScaleTicksValueAlignment={
                  tickSettings.yScaleTicksValueAlignment as 'left' | 'right'
                }
                yScaleTicksValuePosition={
                  tickSettings.yTickStyle === 4
                    ? 'center'
                    : (tickSettings.yScaleTicksValuePosition as
                        | 'top'
                        | 'center')
                }
                color={tickSettings.mode as 'dark' | 'light'}
                barWidth={barSettings.barWidth as 0 | 1 | 2}
                scaleType={'linear'}
              />
            </g>
          </SVGEl>
          <SubNoteEl
            font={primaryFont}
            textColor={subNoteSettings.textColor as 'light' | 'dark'}
            alignment={subNoteSettings.alignment as 'left' | 'right'}
          >
            Source and data credits:
            <LinkEl
              linkColor={subNoteSettings.linkColor as 0 | 1 | 2}
              linkStyle={subNoteSettings.linkStyle as 0 | 1 | 2 | 3}
              primaryColor={colors.primaryColor}
            >
              www.example.com
            </LinkEl>
          </SubNoteEl>
        </GraphEl>
        <GraphEl
          roundedCorner={bgSettings.roundedCorner as 0 | 1 | 2}
          borderShadowSettings={bgSettings.borderShadowSettings as 0 | 1 | 2}
        >
          <TitleEl
            font={primaryFont}
            bold={titleSettings.bold}
            uppercase={titleSettings.uppercase}
            borderBottom={titleSettings.borderBottom}
            primaryColor={colors.primaryColor}
            colorText={titleSettings.colorText}
            backgroundColorSettings={titleSettings.backgroundColorSettings}
          >
            Bubble Chart
          </TitleEl>
          {keySettings.isKeyVerticle && keySettings.alignment === 2 ? (
            <KeyDiv>
              <KeyContainerNoFlex
                position={'flex-end'}
                isOverlap={keySettings.isOverlap}
              >
                <KeyElNoFlex>
                  <ColorKey fill={colors.primaryColor} />
                  <KeyTitleEl font={primaryFont}>Category 1</KeyTitleEl>
                </KeyElNoFlex>
                <KeyElNoFlex>
                  <ColorKey fill={colors.secondaryColor} />
                  <KeyTitleEl font={primaryFont}>Category 2</KeyTitleEl>
                </KeyElNoFlex>
                <KeyElNoFlex>
                  <ColorKey fill={colors.tertiaryColor} />
                  <KeyTitleEl font={primaryFont}>Category 3</KeyTitleEl>
                </KeyElNoFlex>
              </KeyContainerNoFlex>
            </KeyDiv>
          ) : (
            <KeyDiv>
              <KeyContainer
                position={
                  keySettings.alignment === 0
                    ? 'flex-start'
                    : keySettings.alignment === 1
                    ? 'center'
                    : 'flex-end'
                }
                isOverlap={keySettings.isOverlap}
              >
                <KeyEl>
                  <ColorKey fill={colors.primaryColor} />
                  <KeyTitleEl font={primaryFont}>Category 1</KeyTitleEl>
                </KeyEl>
                <KeyEl>
                  <ColorKey fill={colors.secondaryColor} />
                  <KeyTitleEl font={primaryFont}>Category 2</KeyTitleEl>
                </KeyEl>
                <KeyEl>
                  <ColorKey fill={colors.tertiaryColor} />
                  <KeyTitleEl font={primaryFont}>Category 3</KeyTitleEl>
                </KeyEl>
              </KeyContainer>
            </KeyDiv>
          )}
          <SVGEl noTopPadding={true} width={WIDTH + 40} height={HEIGHT + 30}>
            <g transform='translate(0,0)'>
              <YTicks
                isXScaleTicksValueRotated={
                  tickSettings.isXScaleTicksValueRotated
                }
                isTicksTitleVisible={
                  tickSettings.isTicksTitleVisible &&
                  tickSettings.isYScaleTicksValueVisible
                }
                isYScaleTicksValueVisible={true}
                yScaleTicksValueAlignment={
                  tickSettings.yScaleTicksValueAlignment as 'left' | 'right'
                }
                yScaleTicksValuePosition={
                  tickSettings.yTickStyle === 4
                    ? 'center'
                    : (tickSettings.yScaleTicksValuePosition as
                        | 'top'
                        | 'center')
                }
                tickStyle={(tickSettings.yTickStyle % 4) as 0 | 1 | 2 | 3}
              />
              <XTicks
                isXScaleTicksValueRotated={
                  tickSettings.isXScaleTicksValueRotated
                }
                isTicksTitleVisible={
                  tickSettings.isTicksTitleVisible &&
                  tickSettings.isYScaleTicksValueVisible
                }
                isYScaleTicksValueVisible={true}
                yScaleTicksValueAlignment={
                  tickSettings.yScaleTicksValueAlignment as 'left' | 'right'
                }
                yScaleTicksValuePosition={
                  tickSettings.yTickStyle === 4
                    ? 'center'
                    : (tickSettings.yScaleTicksValuePosition as
                        | 'top'
                        | 'center')
                }
                tickStyle={tickSettings.xTickStyle as 0 | 1 | 2}
                isDashed={tickSettings.yTickStyle === 1 ? true : false}
                isBubbleChart={true}
              />
              <BubbleChart
                primaryColor={colors.primaryColor}
                secondaryColor={colors.secondaryColor}
                tertiaryColor={colors.tertiaryColor}
                primaryFont={primaryFont}
                isXScaleTicksValueRotated={
                  tickSettings.isXScaleTicksValueRotated
                }
                isYScaleTicksValueVisible={
                  tickSettings.isYScaleTicksValueVisible
                }
                yScaleTicksValueAlignment={
                  tickSettings.yScaleTicksValueAlignment as 'left' | 'right'
                }
                yScaleTicksValuePosition={
                  tickSettings.yTickStyle === 4
                    ? 'center'
                    : (tickSettings.yScaleTicksValuePosition as
                        | 'top'
                        | 'center')
                }
                isTicksTitleVisible={tickSettings.isTicksTitleVisible}
                isDataPointVisible={lineSettings.isDataPointVisible}
              />
              <YTickValue
                primaryFont={primaryFont}
                isXScaleTicksValueRotated={
                  tickSettings.isXScaleTicksValueRotated
                }
                isTicksTitleVisible={
                  tickSettings.isTicksTitleVisible &&
                  tickSettings.isYScaleTicksValueVisible
                }
                isYScaleTicksValueVisible={true}
                yScaleTicksValueAlignment={
                  tickSettings.yScaleTicksValueAlignment as 'left' | 'right'
                }
                yScaleTicksValuePosition={
                  tickSettings.yTickStyle === 4
                    ? 'center'
                    : (tickSettings.yScaleTicksValuePosition as
                        | 'top'
                        | 'center')
                }
                color={tickSettings.mode as 'dark' | 'light'}
                tickStyle={(tickSettings.yTickStyle % 4) as 0 | 1 | 2 | 3}
              />
              <XTickValue
                primaryFont={primaryFont}
                isXScaleTicksValueRotated={
                  tickSettings.isXScaleTicksValueRotated
                }
                isTicksTitleVisible={
                  tickSettings.isTicksTitleVisible &&
                  tickSettings.isYScaleTicksValueVisible
                }
                isYScaleTicksValueVisible={true}
                yScaleTicksValueAlignment={
                  tickSettings.yScaleTicksValueAlignment as 'left' | 'right'
                }
                yScaleTicksValuePosition={
                  tickSettings.yTickStyle === 4
                    ? 'center'
                    : (tickSettings.yScaleTicksValuePosition as
                        | 'top'
                        | 'center')
                }
                color={tickSettings.mode as 'dark' | 'light'}
                barWidth={barSettings.barWidth as 0 | 1 | 2}
                scaleType={'linear'}
                isBubbleChart={true}
              />
            </g>
          </SVGEl>
          <SubNoteEl
            font={primaryFont}
            textColor={subNoteSettings.textColor as 'light' | 'dark'}
            alignment={subNoteSettings.alignment as 'left' | 'right'}
          >
            Source and data credits:
            <LinkEl
              linkColor={subNoteSettings.linkColor as 0 | 1 | 2}
              linkStyle={subNoteSettings.linkStyle as 0 | 1 | 2 | 3}
              primaryColor={colors.primaryColor}
            >
              www.example.com
            </LinkEl>
          </SubNoteEl>
        </GraphEl>
      </GraphContainer>
    </BodyArea>
  );
};
