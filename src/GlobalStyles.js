import { injectGlobal } from 'styled-components';
import theme from './Theme';
import { Body } from './components/View';

export default injectGlobal`
  * {
    padding: 0;
    margin: 0;
  }

  ul {
    list-style: none;
  }

  img {
    width: 100%;
    height: auto;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  .fade-enter {
    ${Body} {
      opacity: 0;
    }
  }
  .fade-enter.fade-enter-active {
    ${Body} {
      opacity: 1;
      transition: opacity ${theme.settings.fadeSpeed};
    }
  }
  .fade-exit {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 0;

    ${Body} {
      opacity: 1;
    }
  }
  .fade-exit.fade-exit-active {
    opacity: 0;
    transition: opacity ${theme.settings.fadeSpeed};
  }
`;
