import React, { Component } from 'react';
import classnames from 'classnames';
import IconProps from './PropsType';

class Icon extends Component<IconProps, {}> {
  static defaultProps = {
    prefixCls: 'za-icon',
    type: '',
    theme: 'default',
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
