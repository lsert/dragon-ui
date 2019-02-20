import React, { Component, MouseEvent } from 'react';
import classnames from 'classnames';
import { ButtonTypeIF, ButtonPropsIF, LinkPropsIF } from './PropsType';
import Icon from '../icon';

interface ButtonElementIF {
  link: HTMLAnchorElement;
  button: HTMLButtonElement;
}

function isLink(props: LinkPropsIF | ButtonPropsIF): props is LinkPropsIF {
  return props.hasOwnProperty('href');
}

class Button<T extends keyof ButtonTypeIF = 'button'> extends Component<ButtonTypeIF[T], {}> {
  static defaultProps = {
    prefixCls: 'ui-button',
    type: 'button',
    theme: 'default',
    size: null,
    isBlock: false,
    isRadius: false,
    isRound: false,
    isCircle: false,
    isActive: false,
    isFocus: false,
    isDisabled: false,
    isLoading: false,
    className: null,
    style: {},
  };

  onClick = (e: MouseEvent<ButtonElementIF[T]>) => {
    const { disabled, isDisabled, loading, isLoading } = this.props;
    const disabledStatus = disabled || isDisabled;
    const loadingStatus = loading || isLoading;
    if (isLink(this.props)) {
      let props: Readonly<{ children?: React.ReactNode; }> & Readonly<ButtonTypeIF['link']> = this.props;
      if (!disabledStatus && !loadingStatus && props.onClick) {
        props.onClick(e as MouseEvent<HTMLAnchorElement>);
      }
    } else {
      let props: Readonly<{ children?: React.ReactNode; }> & Readonly<ButtonTypeIF['button']> = this.props;
      if (!disabledStatus && !loadingStatus && props.onClick) {
        props.onClick(e as MouseEvent<HTMLButtonElement>);
      }
    }
  }

  render() {
    const { props } = this;
    const {
      prefixCls,
      type,
      theme,
      size,
      isBlock,
      block,
      isRadius,
      radius,
      isRound,
      round,
      isCircle,
      circle,
      isActive,
      active,
      isFocus,
      focus,
      isDisabled,
      disabled,
      isLoading,
      loading,
      className,
      children,
      onClick,
      ...others
    } = props;

    const radiusStatus = radius || isRadius;
    const blockStatus = block || isBlock;
    const roundStatus = round || isRound;
    const circleStatus = circle || isRound;
    const activeStatus = active || isActive;
    const focusStatus = focus || isFocus;
    const disabledStatus = disabled || isDisabled;
    const loadingStatus = loading || isLoading;

    const classes = classnames({
      [prefixCls!]: true,
      block: blockStatus,
      radius: radiusStatus,
      round: roundStatus,
      circle: circleStatus,
      active: activeStatus,
      focus: focusStatus,
      disabled: disabledStatus,
      [`theme-${theme}`]: !!theme,
      [`size-${size}`]: !!size,
      [className!]: !!className,
    });

    let textContent = loadingStatus ? <span><Icon type="loading" className="rotate360" /> {children}</span> : children;

    if (isLink(props)) {
      const { href, target } = (props as Readonly<LinkPropsIF>);
      return <a
        className={classes}
        href={href}
        target={target}
        onClick={this.onClick}
        {...others}
      >
        {textContent}
      </a>;
    }

    return <button
      type={type}
      className={classes}
      disabled={disabledStatus}
      onClick={this.onClick}
      {...others}
    >
      {textContent}
    </button>;
  }
}

export default Button;
