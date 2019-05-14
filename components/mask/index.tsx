import React, { Component, MouseEventHandler } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

class Mask extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-mask',
    visible: false,
    type: 'normal',
    onClose: () => { },
  };

  onClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (this.props.onClose) {
      this.props.onClose(e);
    }
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  render() {
    const {
      visible, type, onClose, prefixCls, ...others
    } = this.props;
    const markCls = classnames({
      [prefixCls!]: true,
      transparent: type === 'transparent',
      light: type === 'light',
      dark: type === 'dark',
    });

    return visible ? (
      <div className={markCls} {...others} onClick={this.onClick} />
    ) : null;
  }
}

export default Mask;
