import styled from 'styled-components';
import { useState } from 'react';
import {
  FONTSARRAY,
  COLORARRAY,
  HEIGHT,
  COLUMNWIDTH,
  BGCOLORARRAY,
  CARDBGCOLORARRAY,
} from './Constants';
import { YTicks } from './GraphEl/Ticks/YTicks';
import { XTicks } from './GraphEl/Ticks/XTicks';
import { YTickValue } from './GraphEl/Ticks/YTickValue';
import { XTickValue } from './GraphEl/Ticks/XTickValue';
import { Bars } from './GraphEl/BarGraph/Bars';
import { Line } from './GraphEl/LineChart/Line';
import { BubbleChart } from './GraphEl/BubbleChart/BubbleChart';
import { MultiLine } from './GraphEl/LineChart/MultiLine';
import { BarValues } from './GraphEl/BarGraph/BarValues';
import { DashboardIcon, CustomerIcon, SettingsIcon } from './Icons';

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0 20px 0;
`;

interface GraphCSSSettingsProps {
  borderShadowSettings: 0 | 1 | 2;
  roundedCorner: 0 | 1 | 2;
  background: string;
  darkMode: boolean;
}

const GraphContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px 0;
`;

const GraphEl = styled.div<GraphCSSSettingsProps>`
  width: fit-content;
  background-color: ${props => props.background};
  margin: 10px;
  border-radius: ${props => `${5 * props.roundedCorner}px`};
  border: ${props =>
    props.borderShadowSettings === 1
      ? props.darkMode
        ? '1px solid #666666'
        : '1px solid #DDD'
      : '0'};
  box-shadow: ${props =>
    props.borderShadowSettings === 2
      ? 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
      : '0 0 0 rgb(180 180 180 / 50%)'};
`;

interface StatsHeaderContainerProps {
  borderShadowSettings: 0 | 1 | 2;
  roundedCorner: 0 | 1 | 2;
  background: string;
  darkMode: boolean;
  combined: boolean;
  width: number;
}

const StatsHeaderContainer = styled.div<StatsHeaderContainerProps>`
  width: ${props => `${props.width}px`};
  display: flex;
  flex-wrap: nowrap;
  background-color: ${props => (props.combined ? props.background : 'initial')};
  margin: 10px;
  border-radius: ${props =>
    props.combined ? `${5 * props.roundedCorner}px` : '0'};
  border: ${props =>
    props.borderShadowSettings === 1 && props.combined
      ? props.darkMode
        ? '1px solid #666666'
        : '1px solid #DDD'
      : '0'};
  box-shadow: ${props =>
    props.borderShadowSettings === 2 && props.combined
      ? 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
      : '0 0 0 rgb(180 180 180 / 50%)'};
`;

const StatsHeaderEl = styled.div<StatsHeaderContainerProps>`
  width: ${props => `${props.width}px`};
  flex-wrap: nowrap;
  background-color: ${props =>
    !props.combined ? props.background : 'initial'};
  margin: 0 10px;
  border-radius: ${props =>
    !props.combined ? `${5 * props.roundedCorner}px` : '0'};
  border: ${props =>
    props.borderShadowSettings === 1 && !props.combined
      ? props.darkMode
        ? '1px solid #666666'
        : '1px solid #DDD'
      : '0'};
  box-shadow: ${props =>
    props.borderShadowSettings === 2 && !props.combined
      ? 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
      : '0 0 0 rgb(180 180 180 / 50%)'};
  &:first-of-type {
    margin-left: 0;
  }
  &:last-of-type {
    margin-right: 0;
  }
`;

interface StatHeaderTitleProps {
  font: string;
  bold: boolean;
  uppercase: boolean;
  darkMode: boolean;
}

const StatHeaderTitle = styled.div<StatHeaderTitleProps>`
  font-family: ${props => props.font};
  font-weight: 700;
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'none')};
  font-size: ${props => (props.uppercase ? '14px' : '16px')};
  color: ${props => (props.darkMode ? '#AAA' : '#999')};
  margin-top: 10px;
  padding: 0 10px;
`;

interface StatHeaderValueProps {
  font: string;
  darkMode: boolean;
  colorText: boolean;
  primaryColor: string;
  fontSizeLarge: boolean;
}

const StatHeaderValue = styled.div<StatHeaderValueProps>`
  font-family: ${props => props.font};
  margin: 10px 0 5px 0;
  font-weight: 700;
  font-size: ${props => (props.fontSizeLarge ? '30px' : '24px')};
  padding: 0 10px;
  color: ${props =>
    props.colorText ? props.primaryColor : props.darkMode ? '#EEE' : '#333'};
`;

interface StatHeaderSubNoteProps {
  font: string;
  darkMode: boolean;
}

const StatHeaderSubNote = styled.div<StatHeaderSubNoteProps>`
  font-family: ${props => props.font};
  font-weight: 16px;
  color: ${props => (props.darkMode ? '#AAA' : '#999')};
  margin-bottom: 10px;
  padding: 0 10px;
`;
const BodyArea = styled.div`
  justify-content: center;
`;

interface TitleElSettings {
  font: string;
  uppercase: boolean;
  borderBottom: boolean;
  primaryColor: string;
  colorText: boolean;
  backgroundColorSettings: boolean;
  darkMode: boolean;
}

const TitleEl = styled.h1<TitleElSettings>`
  margin: 0;
  padding: ${props =>
    props.borderBottom || props.backgroundColorSettings
      ? '25px'
      : '25px 25px 0 25px'};
  font-family: ${props => props.font};
  font-weight: 700;
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'none')};
  border-bottom: ${props =>
    props.borderBottom
      ? props.darkMode
        ? '1px solid #444'
        : '1px solid #DDDDDD'
      : '0'};
  color: ${props =>
    props.colorText
      ? props.primaryColor
      : props.darkMode
      ? '#FFFFFF'
      : '#333333'};
  background-color: ${props =>
    props.backgroundColorSettings ? '#FAFAFA' : 'transparent'};
`;

interface SvgProps {
  noTopPadding?: boolean;
}

const SVGEl = styled.svg<SvgProps>`
  padding: ${props => (props.noTopPadding ? '0 10px' : '20px 10px 0 10px')};
`;

interface SubNoteElSettings {
  font: string;
  textColor: 'dark' | 'light';
  alignment: 'left' | 'right';
  darkMode: boolean;
}

const SubNoteEl = styled.div<SubNoteElSettings>`
  margin: 0 25px;
  padding: 15px 0;
  font-family: ${props => props.font};
  font-size: 14px;
  color: ${props =>
    props.darkMode
      ? '#AAA'
      : props.textColor === 'dark'
      ? '#666666'
      : '#A4A4A4'};
  display: flex;
  justify-content: ${props =>
    props.alignment === 'left' ? 'flex-start' : 'flex-end'};
`;

interface LinkElSettings {
  linkColor: 0 | 1 | 2;
  linkStyle: 0 | 1 | 2 | 3;
  primaryColor: string;
  darkMode: boolean;
}

const LinkEl = styled.span<LinkElSettings>`
  color: ${props =>
    props.linkColor === 2
      ? props.primaryColor
      : props.linkColor === 1
      ? props.darkMode
        ? '#EEE'
        : '#333333'
      : 'inherit'};
  margin-left: 5px;
  font-weight: ${props => (props.linkStyle === 3 ? '700' : '400')};
  font-style: ${props => (props.linkStyle === 2 ? 'italic' : 'normal')};
  text-decoration: ${props => (props.linkStyle === 1 ? 'underline' : 'none')};
`;

interface KeyContainerAlignment {
  position: 'flex-start' | 'flex-end' | 'center';
  isOverlap: boolean;
  darkMode: boolean;
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
      ? props.darkMode
        ? 'rgba(7, 9, 10, 0.7)'
        : 'rgba(250, 250, 250, 0.7)'
      : 'transparent'};
`;

const KeyContainerNoFlex = styled.div<KeyContainerAlignment>`
  width: fit-content;
  margin: 25px 20px 0 auto;
  padding: 5px 10px;
  margin-bottom: -85px;
  background-color: ${props =>
    props.darkMode ? 'rgba(7, 9, 10, 0.7)' : 'rgba(250, 250, 250, 0.7)'};
  border: 1px solid ${props => (props.darkMode ? '#444' : '#EEE')};
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
  darkMode: boolean;
}
const KeyTitleEl = styled.div<KeyTitleElProps>`
  font-family: ${props => props.font};
  font-size: 14px;
  color: ${props => (props.darkMode ? '#CCC' : '#999999')};
`;

const KeyDiv = styled.div`
  position: relative;
  padding: 0 25px;
  z-index: 1000;
`;
interface DashboardAreaProp {
  background: string;
}
const DashBoardArea = styled.div<DashboardAreaProp>`
  width: 1280px;
  margin: 0 auto 40px auto;
  background-color: ${props => props.background};
  color: ${props => (props.background === '#2D393E' ? '#FFF' : '#333333')};
`;

const ProfileEl = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const ProfileElSideSmall = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0px;
  margin-bottom: 20px;
  width: 100%;
`;

interface Mode {
  darkMode: boolean;
}

const ProfileElSideLarge = styled.div<Mode>`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0px;
  padding: 10px;
  border-top: 1px solid ${props => (props.darkMode ? '#666' : '#CCC')};
  font-weight: 700;
  width: 100%;
  img {
    margin-right: 10px;
  }
`;

const ProfileImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 100px;
  margin: 0 5px;
`;

interface HeaderProps {
  background: string;
  borderShadowSettings?: 0 | 1 | 2;
  darkMode: boolean;
}

const HeaderTop = styled.div<HeaderProps>`
  align-items: center;
  background-color: ${props => props.background};
  border-bottom: ${props =>
    props.borderShadowSettings === 1
      ? props.darkMode
        ? '1px solid #666666'
        : '1px solid #CCC'
      : '0'};
  box-shadow: ${props =>
    props.borderShadowSettings === 2
      ? '0px 3px 15px 0px rgb(32 33 36 / 25%)'
      : '0 0 0 rgb(180 180 180 / 50%)'};
`;

const TopHeader = styled.div<HeaderProps>`
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.background};
  border-bottom: ${props =>
    props.darkMode ? '1px solid #666666' : '1px solid #CCC'};
  color: ${props => (props.darkMode ? '#FFFFFF' : '#333')};
`;

interface HeaderTitleProps {
  fontColor: string;
  font: string;
}

const HeaderTitle = styled.div<HeaderTitleProps>`
  font-size: 20px;
  text-transform: uppercase;
  color: ${props => props.fontColor};
  font-family: ${props => props.font};
`;

const NavHeader = styled.div`
  display: flex;
  padding: 0 20px;
  width: 100%;
`;

interface NavElProps {
  color: string;
  bottomBorder?: boolean;
}

const NavEl = styled.div<NavElProps>`
  display: flex;
  margin-right: 40px;
  padding: 15px 0 12px 0;
  border-bottom: ${props =>
    props.bottomBorder
      ? `3px solid ${props.color}`
      : '3px solid rgba(0,0,0,0)'};
  align-items: center;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 700;
  color: ${props => props.color};
`;

const IconEl = styled.div`
  margin-right: 5px;
  height: 24px;
`;

const BodyContainer = styled.div`
  display: flex;
`;

interface HeaderSideProps {
  darkMode: boolean;
  background: string;
  borderShadowSettings?: 0 | 1 | 2;
}

const HeaderSideSmall = styled.div<HeaderSideProps>`
  min-width: ${props => (props.borderShadowSettings === 1 ? '99px' : '100px')};
  background-color: ${props => props.background};
  position: relative;
  border-right: ${props =>
    props.borderShadowSettings === 1
      ? props.darkMode
        ? '1px solid #666666'
        : '1px solid #CCC'
      : '0'};
  box-shadow: ${props =>
    props.borderShadowSettings === 2
      ? '3px 0px 15px 0px rgb(32 33 36 / 25%)'
      : '0 0 0 rgb(180 180 180 / 50%)'};
`;

const HeaderSideLarge = styled.div<HeaderSideProps>`
  min-width: ${props => (props.borderShadowSettings === 1 ? '159px' : '160px')};
  background-color: ${props => props.background};
  position: relative;
  border-right: ${props =>
    props.borderShadowSettings === 1
      ? props.darkMode
        ? '1px solid #666666'
        : '1px solid #CCC'
      : '0'};
  box-shadow: ${props =>
    props.borderShadowSettings === 2
      ? '3px 0px 15px 0px rgb(32 33 36 / 25%)'
      : '0 0 0 rgb(180 180 180 / 50%)'};
`;

interface NavElSidebarSmallProps {
  fontColor: string;
}

const NavElSidebarSmall = styled.div<NavElSidebarSmallProps>`
  margin: 30px 0;
  font-size: 12px;
  font-weight: 700;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  color: ${props => props.fontColor};
`;

const NavElSidebarLarge = styled.div<NavElSidebarSmallProps>`
  margin: 25px 0;
  padding: 0 15px;
  font-size: 16px;
  align-items: center;
  display: flex;
  justify-content: flex-start;
  color: ${props => props.fontColor};
`;

const IconElSmall = styled.div`
  margin-bottom: 10px;
  width: 100%;
  height: 24px;
  margin: auto;
  display: flex;
  justify-content: center;
`;

const IconElLarge = styled.div`
  margin-right: 5px;
  height: 24px;
`;

export const BodyEl = () => {
  const bgColorIndex = Math.floor(Math.random() * 3);
  const colorIndex = Math.floor(Math.random() * COLORARRAY.length);
  const layout = Math.floor(Math.random() * 3);
  const borderShadowSettings = Math.floor(Math.random() * 3);

  const [dashboardLayoutSettings, updateDashboardLayoutSettings] = useState({
    backgroundColor: BGCOLORARRAY[bgColorIndex],
    darkMode: bgColorIndex === 2 ? true : false,
    selection: Math.random() > 0.5 ? 'colored' : 'outline',
    primaryFont: FONTSARRAY[Math.floor(Math.random() * FONTSARRAY.length)],
    statHeaderCombined: Math.random() > 0.5 ? true : false,
    headerSettings: {
      layout: layout,
      fontColor: Math.random() > 0.5 ? true : false,
      bottomBorder: Math.random() > 0.5 ? true : false,
      backgroundColor:
        borderShadowSettings === 0 ||
        (borderShadowSettings === 2 && bgColorIndex === 2)
          ? CARDBGCOLORARRAY[bgColorIndex]
          : BGCOLORARRAY[bgColorIndex],
      borderShadowSettings:
        bgColorIndex === 2 && borderShadowSettings === 2
          ? 0
          : borderShadowSettings,
    },
  });

  const [keySettings, updateKeySettings] = useState({
    alignment: Math.floor(Math.random() * 3),
    isOverlap: Math.random() > 0.5 ? true : false,
    isKeyVerticle: Math.random() > 0.5 ? true : false,
  });

  const [colors, updateColors] = useState({
    primaryColor: COLORARRAY[colorIndex],
    secondaryColor: COLORARRAY[(colorIndex + 1) % COLORARRAY.length],
    tertiaryColor: COLORARRAY[(colorIndex + 2) % COLORARRAY.length],
  });

  const [cardBgSettings, updateCardBgSettings] = useState({
    roundedCorner: Math.floor(Math.random() * 3),
    backgroundColor:
      Math.random() < 0.5 ||
      borderShadowSettings === 0 ||
      (borderShadowSettings === 2 && bgColorIndex === 2)
        ? CARDBGCOLORARRAY[bgColorIndex]
        : BGCOLORARRAY[bgColorIndex],
    borderShadowSettings:
      bgColorIndex === 2 && borderShadowSettings === 2
        ? 0
        : borderShadowSettings,
  });

  const [dimensions, setDimensions] = useState({
    twoColumnWidth:
      borderShadowSettings === 1
        ? COLUMNWIDTH[layout].twoColumn - 22
        : COLUMNWIDTH[layout].twoColumn - 20,
    threeColumnWidth:
      borderShadowSettings === 1
        ? COLUMNWIDTH[layout].threeColumn - 22
        : COLUMNWIDTH[layout].threeColumn - 20,
    oneColumnWidth:
      borderShadowSettings === 1
        ? COLUMNWIDTH[layout].oneColumn - 22
        : COLUMNWIDTH[layout].oneColumn - 20,
    fullWidth:
      borderShadowSettings === 1
        ? COLUMNWIDTH[layout].fullWidth - 2
        : COLUMNWIDTH[layout].fullWidth,
    height: HEIGHT,
  });

  const [titleSettings, updateTitleSettings] = useState({
    bold: Math.random() > 0.5 ? true : false,
    uppercase: Math.random() > 0.5 ? true : false,
    borderBottom: Math.random() > 0.5 ? true : false,
    backgroundColorSettings:
      Math.random() > 0.5 && bgColorIndex !== 2 ? true : false,
    colorText: Math.random() > 0.5 ? true : false,
    valueFontSizeLarge: Math.random() > 0.5 ? true : false,
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
    const bgColorIndex = Math.floor(Math.random() * 3);
    const layout = Math.floor(Math.random() * 3);
    const borderShadowSettings = Math.floor(Math.random() * 3);

    updateDashboardLayoutSettings({
      backgroundColor: BGCOLORARRAY[bgColorIndex],
      darkMode: bgColorIndex === 2 ? true : false,
      selection: Math.random() > 0.5 ? 'colored' : 'outline',
      primaryFont: FONTSARRAY[Math.floor(Math.random() * FONTSARRAY.length)],
      statHeaderCombined: Math.random() > 0.5 ? true : false,
      headerSettings: {
        layout: layout,
        fontColor: Math.random() > 0.5 ? true : false,
        bottomBorder: Math.random() > 0.5 ? true : false,
        backgroundColor:
          borderShadowSettings === 0 ||
          (borderShadowSettings === 2 && bgColorIndex === 2)
            ? CARDBGCOLORARRAY[bgColorIndex]
            : BGCOLORARRAY[bgColorIndex],
        borderShadowSettings:
          bgColorIndex === 2 && borderShadowSettings === 2
            ? 0
            : borderShadowSettings,
      },
    });
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
    updateCardBgSettings({
      roundedCorner: Math.floor(Math.random() * 3),
      borderShadowSettings:
        bgColorIndex === 2 && borderShadowSettings === 2
          ? 0
          : borderShadowSettings,
      backgroundColor:
        Math.random() < 0.5 ||
        borderShadowSettings === 0 ||
        (borderShadowSettings === 2 && bgColorIndex === 2)
          ? CARDBGCOLORARRAY[bgColorIndex]
          : BGCOLORARRAY[bgColorIndex],
    });
    updateTitleSettings({
      bold: Math.random() > 0.5 ? true : false,
      uppercase: Math.random() > 0.5 ? true : false,
      borderBottom: Math.random() > 0.5 ? true : false,
      backgroundColorSettings:
        Math.random() > 0.5 && bgColorIndex !== 2 ? true : false,
      colorText: Math.random() > 0.5 ? true : false,
      valueFontSizeLarge: Math.random() > 0.5 ? true : false,
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
    setDimensions({
      twoColumnWidth:
        borderShadowSettings === 1
          ? COLUMNWIDTH[layout].twoColumn - 22
          : COLUMNWIDTH[layout].twoColumn - 20,
      threeColumnWidth:
        borderShadowSettings === 1
          ? COLUMNWIDTH[layout].threeColumn - 22
          : COLUMNWIDTH[layout].threeColumn - 20,
      oneColumnWidth:
        borderShadowSettings === 1
          ? COLUMNWIDTH[layout].oneColumn - 22
          : COLUMNWIDTH[layout].oneColumn - 20,
      fullWidth:
        borderShadowSettings === 1
          ? COLUMNWIDTH[layout].fullWidth - 2
          : COLUMNWIDTH[layout].fullWidth,
      height: HEIGHT,
    });
  };
  console.log(dashboardLayoutSettings.headerSettings.layout);
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
      <DashBoardArea background={dashboardLayoutSettings.backgroundColor}>
        {dashboardLayoutSettings.headerSettings.layout === 0 ? (
          <HeaderTop
            darkMode={dashboardLayoutSettings.darkMode}
            background={dashboardLayoutSettings.headerSettings.backgroundColor}
            borderShadowSettings={
              dashboardLayoutSettings.headerSettings.borderShadowSettings as
                | 0
                | 1
                | 2
            }
          >
            <TopHeader
              background={
                dashboardLayoutSettings.headerSettings.backgroundColor
              }
              darkMode={dashboardLayoutSettings.darkMode}
            >
              <HeaderTitle
                font={dashboardLayoutSettings.primaryFont}
                fontColor={
                  dashboardLayoutSettings.headerSettings.fontColor
                    ? colors.primaryColor
                    : dashboardLayoutSettings.darkMode
                    ? '#FFF'
                    : '#333'
                }
              >
                <span className='bold'>Dashboard</span>Bot
              </HeaderTitle>
              <ProfileEl>
                <ProfileImg
                  src={'https://i.pravatar.cc/42'}
                  alt-text='Profile Img'
                />
                <>John Doe</>
              </ProfileEl>
            </TopHeader>
            <NavHeader>
              <NavEl
                color={colors.primaryColor}
                bottomBorder={
                  dashboardLayoutSettings.headerSettings.bottomBorder
                }
              >
                <IconEl>
                  <DashboardIcon color={colors.primaryColor} />
                </IconEl>
                <>Dashboard</>
              </NavEl>
              <NavEl color={dashboardLayoutSettings.darkMode ? '#999' : '#AAA'}>
                <IconEl>
                  <CustomerIcon
                    color={dashboardLayoutSettings.darkMode ? '#999' : '#AAA'}
                  />
                </IconEl>
                <>Customers</>
              </NavEl>
              <NavEl color={dashboardLayoutSettings.darkMode ? '#999' : '#AAA'}>
                <IconEl>
                  <SettingsIcon
                    color={dashboardLayoutSettings.darkMode ? '#999' : '#AAA'}
                  />
                </IconEl>
                <>Settings</>
              </NavEl>
            </NavHeader>
          </HeaderTop>
        ) : null}
        <BodyContainer>
          {dashboardLayoutSettings.headerSettings.layout === 1 ? (
            <HeaderSideSmall
              darkMode={dashboardLayoutSettings.darkMode}
              background={
                dashboardLayoutSettings.headerSettings.backgroundColor
              }
              borderShadowSettings={
                dashboardLayoutSettings.headerSettings.borderShadowSettings as
                  | 0
                  | 1
                  | 2
              }
            >
              <div>
                <NavElSidebarSmall fontColor={colors.primaryColor}>
                  <IconElSmall>
                    <DashboardIcon color={colors.primaryColor} />
                  </IconElSmall>
                  <>Dashboard</>
                </NavElSidebarSmall>
                <NavElSidebarSmall
                  fontColor={dashboardLayoutSettings.darkMode ? '#999' : '#AAA'}
                >
                  <IconElSmall>
                    <CustomerIcon
                      color={dashboardLayoutSettings.darkMode ? '#999' : '#AAA'}
                    />
                  </IconElSmall>
                  <>Customers</>
                </NavElSidebarSmall>
                <NavElSidebarSmall
                  fontColor={dashboardLayoutSettings.darkMode ? '#999' : '#AAA'}
                >
                  <IconElSmall>
                    <SettingsIcon
                      color={dashboardLayoutSettings.darkMode ? '#999' : '#AAA'}
                    />
                  </IconElSmall>
                  <>Settings</>
                </NavElSidebarSmall>
              </div>
              <ProfileElSideSmall>
                <ProfileImg
                  src={'https://i.pravatar.cc/42'}
                  alt-text='Profile Img'
                />
              </ProfileElSideSmall>
            </HeaderSideSmall>
          ) : null}
          {dashboardLayoutSettings.headerSettings.layout === 2 ? (
            <HeaderSideLarge
              darkMode={dashboardLayoutSettings.darkMode}
              background={
                dashboardLayoutSettings.headerSettings.backgroundColor
              }
              borderShadowSettings={
                dashboardLayoutSettings.headerSettings.borderShadowSettings as
                  | 0
                  | 1
                  | 2
              }
            >
              <div>
                <NavElSidebarLarge fontColor={colors.primaryColor}>
                  <IconElLarge>
                    <DashboardIcon color={colors.primaryColor} />
                  </IconElLarge>
                  <>Dashboard</>
                </NavElSidebarLarge>
                <NavElSidebarLarge
                  fontColor={dashboardLayoutSettings.darkMode ? '#999' : '#AAA'}
                >
                  <IconElLarge>
                    <CustomerIcon
                      color={dashboardLayoutSettings.darkMode ? '#999' : '#AAA'}
                    />
                  </IconElLarge>
                  <>Customers</>
                </NavElSidebarLarge>
                <NavElSidebarLarge
                  fontColor={dashboardLayoutSettings.darkMode ? '#999' : '#AAA'}
                >
                  <IconElLarge>
                    <SettingsIcon
                      color={dashboardLayoutSettings.darkMode ? '#999' : '#AAA'}
                    />
                  </IconElLarge>
                  <>Settings</>
                </NavElSidebarLarge>
              </div>
              <ProfileElSideLarge darkMode={dashboardLayoutSettings.darkMode}>
                <ProfileImg
                  src={'https://i.pravatar.cc/42'}
                  alt-text='Profile Img'
                />
                <>John Doe</>
              </ProfileElSideLarge>
            </HeaderSideLarge>
          ) : null}
          <GraphContainer>
            <StatsHeaderContainer
              combined={dashboardLayoutSettings.statHeaderCombined}
              roundedCorner={cardBgSettings.roundedCorner as 0 | 1 | 2}
              borderShadowSettings={
                cardBgSettings.borderShadowSettings as 0 | 1 | 2
              }
              background={cardBgSettings.backgroundColor}
              darkMode={dashboardLayoutSettings.darkMode}
              width={dimensions.fullWidth}
            >
              <StatsHeaderEl
                combined={dashboardLayoutSettings.statHeaderCombined}
                roundedCorner={cardBgSettings.roundedCorner as 0 | 1 | 2}
                borderShadowSettings={
                  cardBgSettings.borderShadowSettings as 0 | 1 | 2
                }
                background={cardBgSettings.backgroundColor}
                darkMode={dashboardLayoutSettings.darkMode}
                width={dimensions.oneColumnWidth + 20}
              >
                <StatHeaderTitle
                  font={dashboardLayoutSettings.primaryFont}
                  bold={titleSettings.bold}
                  uppercase={titleSettings.uppercase}
                  darkMode={dashboardLayoutSettings.darkMode}
                >
                  New Subscribers
                </StatHeaderTitle>
                <StatHeaderValue
                  font={dashboardLayoutSettings.primaryFont}
                  darkMode={dashboardLayoutSettings.darkMode}
                  colorText={titleSettings.colorText}
                  primaryColor={colors.primaryColor}
                  fontSizeLarge={titleSettings.valueFontSizeLarge}
                >
                  456
                </StatHeaderValue>
                <StatHeaderSubNote
                  font={dashboardLayoutSettings.primaryFont}
                  darkMode={dashboardLayoutSettings.darkMode}
                >
                  <span className='bold' style={{ color: '#257675' }}>
                    +34%
                  </span>{' '}
                  vs Last Month
                </StatHeaderSubNote>
              </StatsHeaderEl>
              <StatsHeaderEl
                combined={dashboardLayoutSettings.statHeaderCombined}
                roundedCorner={cardBgSettings.roundedCorner as 0 | 1 | 2}
                borderShadowSettings={
                  cardBgSettings.borderShadowSettings as 0 | 1 | 2
                }
                background={cardBgSettings.backgroundColor}
                darkMode={dashboardLayoutSettings.darkMode}
                width={dimensions.oneColumnWidth + 20}
              >
                <StatHeaderTitle
                  font={dashboardLayoutSettings.primaryFont}
                  bold={titleSettings.bold}
                  uppercase={titleSettings.uppercase}
                  darkMode={dashboardLayoutSettings.darkMode}
                >
                  New Videos
                </StatHeaderTitle>
                <StatHeaderValue
                  font={dashboardLayoutSettings.primaryFont}
                  darkMode={dashboardLayoutSettings.darkMode}
                  colorText={titleSettings.colorText}
                  primaryColor={colors.primaryColor}
                  fontSizeLarge={titleSettings.valueFontSizeLarge}
                >
                  1256
                </StatHeaderValue>
                <StatHeaderSubNote
                  font={dashboardLayoutSettings.primaryFont}
                  darkMode={dashboardLayoutSettings.darkMode}
                >
                  <span className='bold' style={{ color: '#d14124' }}>
                    -5%
                  </span>{' '}
                  vs Last Month
                </StatHeaderSubNote>
              </StatsHeaderEl>
              <StatsHeaderEl
                combined={dashboardLayoutSettings.statHeaderCombined}
                roundedCorner={cardBgSettings.roundedCorner as 0 | 1 | 2}
                borderShadowSettings={
                  cardBgSettings.borderShadowSettings as 0 | 1 | 2
                }
                background={cardBgSettings.backgroundColor}
                darkMode={dashboardLayoutSettings.darkMode}
                width={dimensions.oneColumnWidth + 20}
              >
                <StatHeaderTitle
                  font={dashboardLayoutSettings.primaryFont}
                  bold={titleSettings.bold}
                  uppercase={titleSettings.uppercase}
                  darkMode={dashboardLayoutSettings.darkMode}
                >
                  Engagement
                </StatHeaderTitle>
                <StatHeaderValue
                  font={dashboardLayoutSettings.primaryFont}
                  darkMode={dashboardLayoutSettings.darkMode}
                  colorText={titleSettings.colorText}
                  primaryColor={colors.primaryColor}
                  fontSizeLarge={titleSettings.valueFontSizeLarge}
                >
                  75
                  <span
                    style={{
                      fontSize: titleSettings.valueFontSizeLarge
                        ? '20px'
                        : '16px',
                      fontWeight: 500,
                    }}
                  >
                    {' '}
                    %
                  </span>
                </StatHeaderValue>
                <StatHeaderSubNote
                  font={dashboardLayoutSettings.primaryFont}
                  darkMode={dashboardLayoutSettings.darkMode}
                >
                  <span className='bold' style={{ color: '#257675' }}>
                    +12%
                  </span>{' '}
                  vs Last Month
                </StatHeaderSubNote>
              </StatsHeaderEl>
              <StatsHeaderEl
                combined={dashboardLayoutSettings.statHeaderCombined}
                roundedCorner={cardBgSettings.roundedCorner as 0 | 1 | 2}
                borderShadowSettings={
                  cardBgSettings.borderShadowSettings as 0 | 1 | 2
                }
                background={cardBgSettings.backgroundColor}
                darkMode={dashboardLayoutSettings.darkMode}
                width={dimensions.oneColumnWidth + 20}
              >
                <StatHeaderTitle
                  font={dashboardLayoutSettings.primaryFont}
                  bold={titleSettings.bold}
                  uppercase={titleSettings.uppercase}
                  darkMode={dashboardLayoutSettings.darkMode}
                >
                  Avg. Watch Time
                </StatHeaderTitle>
                <StatHeaderValue
                  font={dashboardLayoutSettings.primaryFont}
                  darkMode={dashboardLayoutSettings.darkMode}
                  colorText={titleSettings.colorText}
                  primaryColor={colors.primaryColor}
                  fontSizeLarge={titleSettings.valueFontSizeLarge}
                >
                  4.3
                  <span
                    style={{
                      fontSize: titleSettings.valueFontSizeLarge
                        ? '20px'
                        : '16px',
                      fontWeight: 500,
                    }}
                  >
                    {' '}
                    Mins
                  </span>
                </StatHeaderValue>
                <StatHeaderSubNote
                  font={dashboardLayoutSettings.primaryFont}
                  darkMode={dashboardLayoutSettings.darkMode}
                >
                  <span className='bold' style={{ color: '#d14124' }}>
                    -23%
                  </span>{' '}
                  vs Last Month
                </StatHeaderSubNote>
              </StatsHeaderEl>
            </StatsHeaderContainer>
            <GraphEl
              roundedCorner={cardBgSettings.roundedCorner as 0 | 1 | 2}
              borderShadowSettings={
                cardBgSettings.borderShadowSettings as 0 | 1 | 2
              }
              background={cardBgSettings.backgroundColor}
              darkMode={dashboardLayoutSettings.darkMode}
            >
              <TitleEl
                font={dashboardLayoutSettings.primaryFont}
                uppercase={titleSettings.uppercase}
                borderBottom={titleSettings.borderBottom}
                primaryColor={colors.primaryColor}
                colorText={titleSettings.colorText}
                backgroundColorSettings={titleSettings.backgroundColorSettings}
                darkMode={dashboardLayoutSettings.darkMode}
              >
                Bar Graph
              </TitleEl>
              <SVGEl
                width={dimensions.twoColumnWidth + 20}
                height={dimensions.height + 20}
              >
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
                    width={dimensions.twoColumnWidth}
                    height={dimensions.height}
                    darkMode={dashboardLayoutSettings.darkMode}
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
                    width={dimensions.twoColumnWidth}
                    height={dimensions.height}
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
                        tickSettings.yScaleTicksValueAlignment as
                          | 'left'
                          | 'right'
                      }
                      yScaleTicksValuePosition={
                        tickSettings.yTickStyle === 4
                          ? 'center'
                          : (tickSettings.yScaleTicksValuePosition as
                              | 'top'
                              | 'center')
                      }
                      tickStyle={4}
                      width={dimensions.twoColumnWidth}
                      height={dimensions.height}
                      darkMode={dashboardLayoutSettings.darkMode}
                    />
                  ) : null}
                  <YTickValue
                    primaryFont={dashboardLayoutSettings.primaryFont}
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
                    width={dimensions.twoColumnWidth}
                    height={dimensions.height}
                    darkMode={dashboardLayoutSettings.darkMode}
                  />
                  <XTickValue
                    primaryFont={dashboardLayoutSettings.primaryFont}
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
                    width={dimensions.twoColumnWidth}
                    height={dimensions.height}
                    darkMode={dashboardLayoutSettings.darkMode}
                  />
                  {barSettings.isDataValueVisible ||
                  !tickSettings.isYScaleTicksValueVisible ? (
                    <BarValues
                      primaryColor={colors.primaryColor}
                      primaryFont={dashboardLayoutSettings.primaryFont}
                      barWidth={barSettings.barWidth as 0 | 1 | 2}
                      isValueColored={barSettings.isValueColored}
                      isXScaleTicksValueRotated={
                        tickSettings.isXScaleTicksValueRotated
                      }
                      isYScaleTicksValueVisible={
                        tickSettings.isYScaleTicksValueVisible
                      }
                      yScaleTicksValueAlignment={
                        tickSettings.yScaleTicksValueAlignment as
                          | 'left'
                          | 'right'
                      }
                      yScaleTicksValuePosition={
                        tickSettings.yTickStyle === 4
                          ? 'center'
                          : (tickSettings.yScaleTicksValuePosition as
                              | 'top'
                              | 'center')
                      }
                      isTicksTitleVisible={tickSettings.isTicksTitleVisible}
                      width={dimensions.twoColumnWidth}
                      height={dimensions.height}
                      darkMode={dashboardLayoutSettings.darkMode}
                    />
                  ) : null}
                </g>
              </SVGEl>
              <SubNoteEl
                font={dashboardLayoutSettings.primaryFont}
                textColor={subNoteSettings.textColor as 'light' | 'dark'}
                alignment={subNoteSettings.alignment as 'left' | 'right'}
                darkMode={dashboardLayoutSettings.darkMode}
              >
                Source and data credits:
                <LinkEl
                  linkColor={subNoteSettings.linkColor as 0 | 1 | 2}
                  linkStyle={subNoteSettings.linkStyle as 0 | 1 | 2 | 3}
                  primaryColor={colors.primaryColor}
                  darkMode={dashboardLayoutSettings.darkMode}
                >
                  www.example.com
                </LinkEl>
              </SubNoteEl>
            </GraphEl>
            <GraphEl
              roundedCorner={cardBgSettings.roundedCorner as 0 | 1 | 2}
              borderShadowSettings={
                cardBgSettings.borderShadowSettings as 0 | 1 | 2
              }
              background={cardBgSettings.backgroundColor}
              darkMode={dashboardLayoutSettings.darkMode}
            >
              <TitleEl
                font={dashboardLayoutSettings.primaryFont}
                uppercase={titleSettings.uppercase}
                borderBottom={titleSettings.borderBottom}
                primaryColor={colors.primaryColor}
                colorText={titleSettings.colorText}
                backgroundColorSettings={titleSettings.backgroundColorSettings}
                darkMode={dashboardLayoutSettings.darkMode}
              >
                Line Chart
              </TitleEl>
              <SVGEl
                width={dimensions.twoColumnWidth + 20}
                height={dimensions.height + 20}
              >
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
                    width={dimensions.twoColumnWidth}
                    height={dimensions.height}
                    darkMode={dashboardLayoutSettings.darkMode}
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
                    width={dimensions.twoColumnWidth}
                    height={dimensions.height}
                    darkMode={dashboardLayoutSettings.darkMode}
                  />
                  <Line
                    primaryColor={colors.primaryColor}
                    primaryFont={dashboardLayoutSettings.primaryFont}
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
                    width={dimensions.twoColumnWidth}
                    height={dimensions.height}
                    darkMode={dashboardLayoutSettings.darkMode}
                  />
                  <YTickValue
                    primaryFont={dashboardLayoutSettings.primaryFont}
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
                    width={dimensions.twoColumnWidth}
                    height={dimensions.height}
                    darkMode={dashboardLayoutSettings.darkMode}
                  />
                  <XTickValue
                    primaryFont={dashboardLayoutSettings.primaryFont}
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
                    width={dimensions.twoColumnWidth}
                    height={dimensions.height}
                    darkMode={dashboardLayoutSettings.darkMode}
                  />
                </g>
              </SVGEl>
              <SubNoteEl
                font={dashboardLayoutSettings.primaryFont}
                textColor={subNoteSettings.textColor as 'light' | 'dark'}
                alignment={subNoteSettings.alignment as 'left' | 'right'}
                darkMode={dashboardLayoutSettings.darkMode}
              >
                Source and data credits:
                <LinkEl
                  linkColor={subNoteSettings.linkColor as 0 | 1 | 2}
                  linkStyle={subNoteSettings.linkStyle as 0 | 1 | 2 | 3}
                  primaryColor={colors.primaryColor}
                  darkMode={dashboardLayoutSettings.darkMode}
                >
                  www.example.com
                </LinkEl>
              </SubNoteEl>
            </GraphEl>
            <GraphEl
              roundedCorner={cardBgSettings.roundedCorner as 0 | 1 | 2}
              borderShadowSettings={
                cardBgSettings.borderShadowSettings as 0 | 1 | 2
              }
              background={cardBgSettings.backgroundColor}
              darkMode={dashboardLayoutSettings.darkMode}
            >
              <TitleEl
                font={dashboardLayoutSettings.primaryFont}
                uppercase={titleSettings.uppercase}
                borderBottom={titleSettings.borderBottom}
                primaryColor={colors.primaryColor}
                colorText={titleSettings.colorText}
                backgroundColorSettings={titleSettings.backgroundColorSettings}
                darkMode={dashboardLayoutSettings.darkMode}
              >
                Multiple Line Chart
              </TitleEl>
              {keySettings.isKeyVerticle && keySettings.alignment === 2 ? (
                <KeyDiv>
                  <KeyContainerNoFlex
                    position={'flex-end'}
                    isOverlap={keySettings.isOverlap}
                    darkMode={dashboardLayoutSettings.darkMode}
                  >
                    <KeyElNoFlex>
                      <ColorKey fill={colors.primaryColor} />
                      <KeyTitleEl
                        font={dashboardLayoutSettings.primaryFont}
                        darkMode={dashboardLayoutSettings.darkMode}
                      >
                        Category 1
                      </KeyTitleEl>
                    </KeyElNoFlex>
                    <KeyElNoFlex>
                      <ColorKey fill={colors.secondaryColor} />
                      <KeyTitleEl
                        font={dashboardLayoutSettings.primaryFont}
                        darkMode={dashboardLayoutSettings.darkMode}
                      >
                        Category 2
                      </KeyTitleEl>
                    </KeyElNoFlex>
                    <KeyElNoFlex>
                      <ColorKey fill={colors.tertiaryColor} />
                      <KeyTitleEl
                        font={dashboardLayoutSettings.primaryFont}
                        darkMode={dashboardLayoutSettings.darkMode}
                      >
                        Category 3
                      </KeyTitleEl>
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
                    darkMode={dashboardLayoutSettings.darkMode}
                  >
                    <KeyEl>
                      <ColorKey fill={colors.primaryColor} />
                      <KeyTitleEl
                        font={dashboardLayoutSettings.primaryFont}
                        darkMode={dashboardLayoutSettings.darkMode}
                      >
                        Category 1
                      </KeyTitleEl>
                    </KeyEl>
                    <KeyEl>
                      <ColorKey fill={colors.secondaryColor} />
                      <KeyTitleEl
                        font={dashboardLayoutSettings.primaryFont}
                        darkMode={dashboardLayoutSettings.darkMode}
                      >
                        Category 2
                      </KeyTitleEl>
                    </KeyEl>
                    <KeyEl>
                      <ColorKey fill={colors.tertiaryColor} />
                      <KeyTitleEl
                        font={dashboardLayoutSettings.primaryFont}
                        darkMode={dashboardLayoutSettings.darkMode}
                      >
                        Category 3
                      </KeyTitleEl>
                    </KeyEl>
                  </KeyContainer>
                </KeyDiv>
              )}
              <SVGEl
                noTopPadding={true}
                width={dimensions.twoColumnWidth + 20}
                height={dimensions.height}
              >
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
                    width={dimensions.twoColumnWidth}
                    height={dimensions.height}
                    darkMode={dashboardLayoutSettings.darkMode}
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
                    width={dimensions.twoColumnWidth}
                    height={dimensions.height}
                    darkMode={dashboardLayoutSettings.darkMode}
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
                    width={dimensions.twoColumnWidth}
                    height={dimensions.height}
                  />
                  <YTickValue
                    primaryFont={dashboardLayoutSettings.primaryFont}
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
                    width={dimensions.twoColumnWidth}
                    height={dimensions.height}
                    darkMode={dashboardLayoutSettings.darkMode}
                  />
                  <XTickValue
                    primaryFont={dashboardLayoutSettings.primaryFont}
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
                    width={dimensions.twoColumnWidth}
                    height={dimensions.height}
                    darkMode={dashboardLayoutSettings.darkMode}
                  />
                </g>
              </SVGEl>
              <SubNoteEl
                font={dashboardLayoutSettings.primaryFont}
                textColor={subNoteSettings.textColor as 'light' | 'dark'}
                alignment={subNoteSettings.alignment as 'left' | 'right'}
                darkMode={dashboardLayoutSettings.darkMode}
              >
                Source and data credits:
                <LinkEl
                  linkColor={subNoteSettings.linkColor as 0 | 1 | 2}
                  linkStyle={subNoteSettings.linkStyle as 0 | 1 | 2 | 3}
                  primaryColor={colors.primaryColor}
                  darkMode={dashboardLayoutSettings.darkMode}
                >
                  www.example.com
                </LinkEl>
              </SubNoteEl>
            </GraphEl>
            <GraphEl
              roundedCorner={cardBgSettings.roundedCorner as 0 | 1 | 2}
              borderShadowSettings={
                cardBgSettings.borderShadowSettings as 0 | 1 | 2
              }
              background={cardBgSettings.backgroundColor}
              darkMode={dashboardLayoutSettings.darkMode}
            >
              <TitleEl
                font={dashboardLayoutSettings.primaryFont}
                uppercase={titleSettings.uppercase}
                borderBottom={titleSettings.borderBottom}
                primaryColor={colors.primaryColor}
                colorText={titleSettings.colorText}
                backgroundColorSettings={titleSettings.backgroundColorSettings}
                darkMode={dashboardLayoutSettings.darkMode}
              >
                Bubble Chart
              </TitleEl>
              {keySettings.isKeyVerticle && keySettings.alignment === 2 ? (
                <KeyDiv>
                  <KeyContainerNoFlex
                    position={'flex-end'}
                    isOverlap={keySettings.isOverlap}
                    darkMode={dashboardLayoutSettings.darkMode}
                  >
                    <KeyElNoFlex>
                      <ColorKey fill={colors.primaryColor} />
                      <KeyTitleEl
                        font={dashboardLayoutSettings.primaryFont}
                        darkMode={dashboardLayoutSettings.darkMode}
                      >
                        Category 1
                      </KeyTitleEl>
                    </KeyElNoFlex>
                    <KeyElNoFlex>
                      <ColorKey fill={colors.secondaryColor} />
                      <KeyTitleEl
                        font={dashboardLayoutSettings.primaryFont}
                        darkMode={dashboardLayoutSettings.darkMode}
                      >
                        Category 2
                      </KeyTitleEl>
                    </KeyElNoFlex>
                    <KeyElNoFlex>
                      <ColorKey fill={colors.tertiaryColor} />
                      <KeyTitleEl
                        font={dashboardLayoutSettings.primaryFont}
                        darkMode={dashboardLayoutSettings.darkMode}
                      >
                        Category 3
                      </KeyTitleEl>
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
                    darkMode={dashboardLayoutSettings.darkMode}
                  >
                    <KeyEl>
                      <ColorKey fill={colors.primaryColor} />
                      <KeyTitleEl
                        font={dashboardLayoutSettings.primaryFont}
                        darkMode={dashboardLayoutSettings.darkMode}
                      >
                        Category 1
                      </KeyTitleEl>
                    </KeyEl>
                    <KeyEl>
                      <ColorKey fill={colors.secondaryColor} />
                      <KeyTitleEl
                        font={dashboardLayoutSettings.primaryFont}
                        darkMode={dashboardLayoutSettings.darkMode}
                      >
                        Category 2
                      </KeyTitleEl>
                    </KeyEl>
                    <KeyEl>
                      <ColorKey fill={colors.tertiaryColor} />
                      <KeyTitleEl
                        font={dashboardLayoutSettings.primaryFont}
                        darkMode={dashboardLayoutSettings.darkMode}
                      >
                        Category 3
                      </KeyTitleEl>
                    </KeyEl>
                  </KeyContainer>
                </KeyDiv>
              )}
              <SVGEl
                noTopPadding={true}
                width={dimensions.twoColumnWidth + 20}
                height={dimensions.height}
              >
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
                    width={dimensions.twoColumnWidth}
                    height={dimensions.height}
                    darkMode={dashboardLayoutSettings.darkMode}
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
                    width={dimensions.twoColumnWidth}
                    height={dimensions.height}
                    darkMode={dashboardLayoutSettings.darkMode}
                  />
                  <BubbleChart
                    primaryColor={colors.primaryColor}
                    secondaryColor={colors.secondaryColor}
                    tertiaryColor={colors.tertiaryColor}
                    primaryFont={dashboardLayoutSettings.primaryFont}
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
                    width={dimensions.twoColumnWidth}
                    height={dimensions.height}
                    darkMode={dashboardLayoutSettings.darkMode}
                  />
                  <YTickValue
                    primaryFont={dashboardLayoutSettings.primaryFont}
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
                    width={dimensions.twoColumnWidth}
                    height={dimensions.height}
                    darkMode={dashboardLayoutSettings.darkMode}
                  />
                  <XTickValue
                    primaryFont={dashboardLayoutSettings.primaryFont}
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
                    width={dimensions.twoColumnWidth}
                    height={dimensions.height}
                    darkMode={dashboardLayoutSettings.darkMode}
                  />
                </g>
              </SVGEl>
              <SubNoteEl
                font={dashboardLayoutSettings.primaryFont}
                textColor={subNoteSettings.textColor as 'light' | 'dark'}
                alignment={subNoteSettings.alignment as 'left' | 'right'}
                darkMode={dashboardLayoutSettings.darkMode}
              >
                Source and data credits:
                <LinkEl
                  linkColor={subNoteSettings.linkColor as 0 | 1 | 2}
                  linkStyle={subNoteSettings.linkStyle as 0 | 1 | 2 | 3}
                  primaryColor={colors.primaryColor}
                  darkMode={dashboardLayoutSettings.darkMode}
                >
                  www.example.com
                </LinkEl>
              </SubNoteEl>
            </GraphEl>
          </GraphContainer>
        </BodyContainer>
      </DashBoardArea>
    </BodyArea>
  );
};
