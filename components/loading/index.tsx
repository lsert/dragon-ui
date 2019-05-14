import React, { Component } from 'react';
import PropsType from './PropsType';

class Loading extends Component<PropsType, {}> {
  static defaultProps = {
    prefixCls: 'ui-loading',
    visible: false,
  };

  render() {
    const { visible, children, prefixCls, ...others } = this.props;
    return (
      <div className={prefixCls} {...others}>
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
