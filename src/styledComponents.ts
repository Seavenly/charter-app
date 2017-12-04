/* tslint:disable:no-duplicate-imports */
import * as styledComponents from 'styled-components';
import {
  ThemedStyledComponentsModule,
  ThemedStyledFunction,
} from 'styled-components';

import { ITheme } from './theme';

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<ITheme>;

export { css, injectGlobal, keyframes, ThemeProvider };

export function withProps<U>() {
  return <P, T, O>(fn: ThemedStyledFunction<P, T, O>) =>
    fn as ThemedStyledFunction<P & U, T, O & U>;
}

export default styled;
