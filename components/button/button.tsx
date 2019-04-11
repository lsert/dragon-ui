import React, { Component, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ButtonProps from './PropsType';
import Icon from '../icon';
import ButtoGroup from './button-group';

interface ButtonTypeIF {
  button: ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps;
  anchor: AnchorHTMLAttributes<HTMLAnchorElement> & ButtonProps;
}

function isAnchorProps(props: Button<'anchor'>['props'] | Button<'button'>['props']): props is Button<'anchor'>['props'] {
  return props.hasOwnProperty('href');
}

class Button<T extends keyof ButtonTypeIF = 'button'> extends Component<ButtonTypeIF[T], {}> {
  static Group: typeof ButtoGroup = ButtoGroup;
  static defaultProps = {
    prefixCls: 'za-button',
    htmlType: 'button',
    theme: 'default',
    shape: 'radius',
    ghost: false,
    size: null,
    block: false,
  };

  static propTypes = {
    type: PropTypes.string,
    shape: PropTypes.oneOf(['circle', 'round', 'rect', 'radius']),
    size: PropTypes.oneOf(['xl', 'lg', 'sm', 'xs']),
    onClick: PropTypes.func,
    loading: PropTypes.bool,
    className: PropTypes.string,
    icon: PropTypes.string,
    block: PropTypes.bool,
  };

  onClick = (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => {
    const { disabled, loading, onClick } = this.props;
    if (disabled || loading) {
      return;
    }
    if (onClick) {
      (onClick as (e: typeof event) => void)(event);
    }
  }

  render() {
    const {
      prefixCls, size, block, shape, active, focus, disabled, ghost,
      loading, className, onClick, children, style, theme, icon, ...others
    } = this.props;

    const classes = classnames({
      'is-block': block,
      'is-rect': shape === 'rect',
      'is-radius': shape === 'radius',
      'is-round': shape === 'round',
      'is-circle': shape === 'circle',
      'is-active': active,
      'is-focus': focus,
      'is-disabled': disabled,
      'is-loading': loading,
      'is-ghost': ghost,
      'has-icon': icon,
      [`${prefixCls}`]: true,
      [`${prefixCls}--${theme}`]: theme,
      [`${prefixCls}--${size}`]: size,
      [className!]: className,
    });

    const textContent =
      loading ? (
        <React.Fragment>
          <Icon type="loading" className="rotate360" />&nbsp;&nbsp;{children}
        </React.Fragment>
      ) : (children);

    const { props } = this;
    if (isAnchorProps(props)) {
      return (
        <a
          className={classes}
          {...others}
          onClick={this.onClick}
        >
          {textContent}
        </a>
      );
    }

    return (
      <button
        className={classes}
        disabled={disabled}
        {...others}
      >
        {textContent}
      </button>
    );
  }
}

export default Button;
