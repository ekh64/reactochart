import React from "react";
import identity from "lodash/identity";
import defaults from "lodash/defaults";
import assign from "lodash/assign";
import omit from "lodash/omit";
import measureText from "./utils/measureText";
import PropTypes from "prop-types";

export default class MeasuredValueLabel extends React.Component {
  static propTypes = {
    value: PropTypes.any
  };
  static defaultProps = {
    format: identity,
    style: {
      fontFamily: "Helvetica, sans-serif",
      fontSize: "20px",
      lineHeight: 1,
      textAnchor: "middle"
    }
  };
  static getLabel(props) {
    const { value, format } = props;
    const style = defaults(props.style, MeasuredValueLabel.defaultProps.style);
    const labelStr = format(value);
    const measured = measureText(assign({ text: labelStr }, style));

    return {
      value: props.value,
      text: measured.text,
      height: measured.height.value,
      width: measured.width.value
    };
  }

  render() {
    const { value, format } = this.props;
    const passedProps = omit(this.props, ["value", "format"]);

    return (
      <text {...passedProps}>
        {React.Children.count(this.props.children)
          ? this.props.children
          : format(value)}
      </text>
    );
  }
}
