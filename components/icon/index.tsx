import React, { Component, HTMLAttributes } from 'react';
import classnames from 'classnames';
import IconProps from './PropsType';

class Icon extends Component<HTMLAttributes<HTMLElement> & IconProps, any> {
  static defaultProps = {
    prefixCls: 'za-icon',
    type: '',
    theme: 'default',
    className: '',
    style: {},
    onClick: () => { },
  };

  render() {
    const {
      prefixCls, type, theme, className, ...others
    } = this.props;
    const cls = classnames({
      [prefixCls!]: true,
      [`${prefixCls}-${type}`]: !!type,
      [`theme-${theme}`]: !!theme,
      [className!]: !!className,
    });

    return <i className={cls} {...others} />;
  }
}

export default Icon;
