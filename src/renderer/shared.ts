import { createGlobalStyle } from "styled-components";

export const colors = {
  darkBg: "rgb(16, 18, 19)",
  evenDarkerBg: "rgb(13,13,14)",
  primaryText: "rgb(217, 217, 217)",
  primaryTextDark: "rgb(131,130,130)",
  error: "rgb(198,38,38)",
};

declare var __static: string;

// noinspection CssUnknownTarget
export const GlobalStyle = createGlobalStyle`



/* pt-sans-regular - latin_cyrillic-ext_cyrillic */
@font-face {
  font-display: fallback;

  font-family: "PT Sans";
  font-style: normal;
  font-weight: 400;
  src: url("/pt-sans-v11-latin_cyrillic-ext_cyrillic-regular.eot"); /* IE9 Compat Modes */
  src: local("PT Sans"), local("PTSans-Regular"),
    url("/pt-sans-v11-latin_cyrillic-ext_cyrillic-regular.eot?#iefix") format("embedded-opentype"),
    /* IE6-IE8 */ url("/pt-sans-v11-latin_cyrillic-ext_cyrillic-regular.woff2") format("woff2"),
    /* Super Modern Browsers */ url("/pt-sans-v11-latin_cyrillic-ext_cyrillic-regular.woff") format("woff"),
    /* Modern Browsers */ url("/pt-sans-v11-latin_cyrillic-ext_cyrillic-regular.ttf") format("truetype"),
    /* Safari, Android, iOS */ url("/pt-sans-v11-latin_cyrillic-ext_cyrillic-regular.svg#PTSans")
      format("svg"); /* Legacy iOS */
}
@font-face {
  font-display: fallback;

  font-family: "Trajan Pro 3";
  src: url("/TrajanPro3Regular.ttf") format("truetype");
  font-style: normal;
  font-weight: 400;
}

  body {
    overflow: hidden;
    height: 100vh;
    width: 100vw;
    margin: 0 0;
    font-family: "Trajan Pro 3", sans-serif;
  }
`;
