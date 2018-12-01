import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from 'styled-components';

export interface ThemeInterface {
  fontFamily: string;
  textColor: string;
  invertedTextColor: string;
  primaryColor: string;
  borderColor: string;
  boxShadowColor: string;
  wrapperColor: string;
  selectedItemColor: string;
  standardBorderRadius: string;
  inputHeight: string;
}

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<ThemeInterface>;

export { css, createGlobalStyle, keyframes, ThemeProvider };
export default styled;
