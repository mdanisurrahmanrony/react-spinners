/** @jsx jsx */
import * as React from "react";
import { keyframes, css, jsx, SerializedStyles } from "@emotion/react";

import { sizeDefaults, parseLengthAndUnit, cssValue } from "./helpers";
import { LoaderSizeProps } from "./interfaces";

const rotate = keyframes`
  100% {transform: rotate(360deg)}
`;

const bounce = keyframes`
  0%, 100% {transform: scale(0)}
  50% {transform: scale(1.0)}
`;

class Loader extends React.PureComponent<Required<LoaderSizeProps>> {
  public static defaultProps = sizeDefaults(60);

  public style = (i: number): SerializedStyles => {
    const { size, color, speedMultiplier } = this.props;
    const { value, unit } = parseLengthAndUnit(size);

    return css`
      position: absolute;
      top: ${i % 2 ? "0" : "auto"};
      bottom: ${i % 2 ? "auto" : "0"};
      height: ${`${value / 2}${unit}`};
      width: ${`${value / 2}${unit}`};
      background-color: ${color};
      border-radius: 100%;
      animation-fill-mode: forwards;
      animation: ${bounce} ${2 / speedMultiplier}s ${i === 2 ? "-1s" : "0s"} infinite linear;
    `;
  };

  public wrapper = (): SerializedStyles => {
    const { size, speedMultiplier } = this.props;

    return css`
      position: relative;
      width: ${cssValue(size)};
      height: ${cssValue(size)};
      animation-fill-mode: forwards;
      animation: ${rotate} ${2 / speedMultiplier}s 0s infinite linear;
    `;
  };

  public render(): JSX.Element | null {
    const { loading, css } = this.props;

    return loading ? (
      <span css={[this.wrapper(), css]}>
        <span css={this.style(1)} />
        <span css={this.style(2)} />
      </span>
    ) : null;
  }
}

export default Loader;
