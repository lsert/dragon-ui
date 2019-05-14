import React, { Component, MouseEventHandler } from 'react';
import classnames from 'classnames';
import Tooltip from '../tooltip';
import { ItemProps, styleType } from './PropsType';
import MenuContext from './menu-context';
import { noop } from '../utils';

class MenuItem extends Component<ItemProps, any> {
  static defaultProps = {
    prefixCls: 'za-menu',
    checked: false,
    isDisabled: false,
    level: 1,
    style: {},
    mode: 'inline',
    inlineIndent: 10,
    onClick: noop,
    onDoubleClick: noop,
  };

  handleClick: MouseEventHandler<HTMLLIElement> = (e) => {
    const { itemKey, inlineCollapsed, toggleSelectedKeys, toggleSubMenuOpen } = this.props;
    this.props.onClick(e, itemKey);
    if (toggleSelectedKeys) {
      toggleSelectedKeys(itemKey);
    }
    if (inlineCollapsed) {
      if (toggleSubMenuOpen) {
        toggleSubMenuOpen('');
      }
    }
  }

  render() {
    const { props } = this;
    const {
      checked, isDisabled, children, prefixCls, level, inlineIndent,
      className, style, onDoubleClick, selectedKeys, itemKey, mode, inlineCollapsed,
    } = props;

    const cls = classnames({
      [`${prefixCls}-level-${level}`]: level,
      [`${prefixCls}-item`]: true,
      active: !!itemKey && selectedKeys.indexOf(itemKey) > -1,
      [className!]: !!className,
      selected: !!checked,
      disabled: 'disabled' in props || isDisabled,
    });
    const itemStyle: styleType = {
      ...style,
    };
    if (mode === 'inline' && !inlineCollapsed) {
      itemStyle.paddingLeft = level * inlineIndent;
    }
    return (
      <Tooltip
        title={(level === 1 && inlineCollapsed) ? children : ''}
        direction="right"
        className="za-menu-item__tooltip"
      >
        <li
          className={cls}
          role="menuitem"
          style={itemStyle}
          onClick={this.handleClick}
          onDoubleClick={onDoubleClick}
        >
          {children}
        </li>
      </Tooltip>
    );
  }
}

export default function MenuItemConsumer(props: MenuItem['props']) {
  return (
    <MenuContext.Consumer>
      {
        (menuKeys) => (
          <MenuItem
            {...props}
            inlineCollapsed={menuKeys.inlineCollapsed}
            selectedKeys={menuKeys.selectedKeys}
            toggleSubMenuOpen={menuKeys.toggleOpenKeys}
            toggleSelectedKeys={menuKeys.toggleSelectedKeys}
          />
        )}
    </MenuContext.Consumer>
  );
}
