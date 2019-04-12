import React, { Component, HTMLProps } from 'react';
import PropsType from './PropsType';

class Loading extends Component<HTMLProps<HTMLDivElement> & PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-loading',
    visible: false,
  };

  render() {
    const { visible, children, prefixCls, ...others } = this.props;
    return (
      <div {...others} className={prefixCls}>
        <div className={`${prefixCls}-spins`} style={{ display: (visible ? 'block' : 'none') }}>
          <span className={`${prefixCls}-spin ${prefixCls}-spin-first`} />
          <span className={`${prefixCls}-spin ${prefixCls}-spin-second`} />
          <span className={`${prefixCls}-spin ${prefixCls}-spin-third`} />
        </div>
        <div className={visible ? `${prefixCls}-inner` : ''}>{children}</div>
      </div>
    );
  }
}

export default Loading;
