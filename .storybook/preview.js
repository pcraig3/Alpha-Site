import * as nextImage from "next/image";
import "../icomoon/style.css";
import "../styles/globals.css";
import "../styles/forms.css";
import "../styles/menu.css";
import "./fonts.css";

import i18n from "./i18n.js";
import { I18nProviderWrapper } from "./i18nextProviderWrapper";
import { RouterContext } from "next/dist/shared/lib/router-context";

export const globalTypes = {
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    defaultValue: "en",
    toolbar: {
      icon: "globe",
      items: [
        { value: "en", right: "EN", title: "English" },
        { value: "fr", right: "FR", title: "Français" },
      ],
    },
  },
};

// override next js image component to make it work with storybook
// https://github.com/vercel/next.js/issues/18393#issuecomment-750910068
Object.defineProperty(nextImage, "default", {
  configurable: true,
  value: (props) => {
    const height = props.height;
    const width = props.width;
    const quotient = height / width;
    const paddingTop = isNaN(quotient) ? "100%" : `${quotient * 100}%`;
    let wrapperStyle;
    let sizerStyle;
    let sizerSvg;
    let toBase64;
    let imgStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      boxSizing: "border-box",
      padding: 0,
      border: "none",
      margin: "auto",
      display: "block",
      width: 0,
      height: 0,
      minWidth: "100%",
      maxWidth: "100%",
      minHeight: "100%",
      maxHeight: "100%",
      objectFit: props.objectFit ? props.objectFit : undefined,
      objectPosition: props.objectPosition ? props.objectPosition : undefined,
    };

    if (
      width !== undefined &&
      height !== undefined &&
      props.layout !== "fill"
    ) {
      if (props.layout === "responsive") {
        wrapperStyle = {
          display: "block",
          overflow: "hidden",
          position: "relative",
          boxSizing: "border-box",
          margin: 0,
        };
        sizerStyle = {
          display: "block",
          boxSizing: "border-box",
          paddingTop,
        };
      } else if (props.layout === "intrinsic" || props.layout === undefined) {
        wrapperStyle = {
          display: "inline-block",
          maxWidth: "100%",
          overflow: "hidden",
          position: "relative",
          boxSizing: "border-box",
          margin: 0,
        };
        sizerStyle = {
          boxSizing: "border-box",
          display: "block",
          maxWidth: "100%",
        };
        sizerSvg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" version="1.1"/>`;
        toBase64 = Buffer.from(sizerSvg).toString("base64");
      } else if (props.layout === "fixed") {
        wrapperStyle = {
          overflow: "hidden",
          boxSizing: "border-box",
          display: "inline-block",
          position: "relative",
          width,
          height,
        };
      }
    } else if (
      width === undefined &&
      height === undefined &&
      props.layout === "fill"
    ) {
      wrapperStyle = {
        display: "block",
        overflow: "hidden",
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        boxSizing: "border-box",
        margin: 0,
      };
    } else {
      throw new Error(
        `Image with src "${props.src}" must use "width" and "height" properties or "layout='fill'" property.`
      );
    }

    return (
      <div style={wrapperStyle}>
        {sizerStyle ? (
          <div style={sizerStyle}>
            {sizerSvg ? (
              <img
                style={{ maxWidth: "100%", display: "block" }}
                alt={props.alt}
                aria-hidden={true}
                role="presentation"
                src={`data:image/svg+xml;base64,${toBase64}`}
              />
            ) : null}
          </div>
        ) : null}
        <img {...props} decoding="async" style={imgStyle} />
      </div>
    );
  },
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};

export const decorators = [
  (Story, { globals }) => {
    return (
      <I18nProviderWrapper i18n={i18n} locale={globals.locale}>
        <Story />
      </I18nProviderWrapper>
    );
  },
];
