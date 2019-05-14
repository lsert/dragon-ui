import React, { Component, Children, cloneElement, ReactElement, MouseEventHandler, InsHTMLAttributes } from 'react';
import classnames from 'classnames';
import dom from '../utils/dom';
import events from '../utils/events';
import { SubMenuProps, styleType, childPropsType } from './PropsType';
import MenuContext from './menu-context';

interface StateIF {
  collapsedSubVisible: boolean;
  collapsedSubAnimation: string;
}

export class SubMenu extends Component<SubMenuProps, StateIF> {
  static defaultProps = {
    prefixCls: 'za-menu',
    title: '',
    level: 1,
    style: {},
    openKeys: [],
  };

  subTitle: any;
  sub: any;
  timeout: any;

  state: StateIF = {
    collapsedSubVisible: false,
    collapsedSubAnimation: '',
  };

  componentDidMount() {
    const { openKeys, inlineCollapsed } = this.props;
    if (openKeys.length > 0) {
      if (!inlineCollapsed) {
        const newOpenKeys: string[] = [];
        this.setSubHeight({ openKeys: newOpenKeys });
      }
    }
    if (inlineCollapsed) {
      events.on(document, 'click', this.onClickOutSide);
    }
  }

  componentWillReceiveProps(nextProps: this['props']) {
    const { inlineCollapsed } = nextProps;

    if (!inlineCollapsed) {
      if (this.props.inlineCollapsed) {
        events.off(document, 'click', this.onClickOutSide);
      }
      return;
    }
    if (!this.props.inlineCollapsed) {
      events.on(document, 'click', this.onClickOutSide);
    }
    const { subMenuKey, openKeys } = this.props;
    const isOpenNow = openKeys.indexOf(subMenuKey) > -1;
    const isOpenNext = nextProps.openKeys.indexOf(subMenuKey) > -1;

    if (!isOpenNow && isOpenNext) {
      // 展开菜单
      this.slideDown();
    } else if (isOpenNow && !isOpenNext) {
      // 收起菜单
      this.slideUp();
    }
  }

  componentDidUpdate(prevProps: this['props']) {
    const { inlineCollapsed } = this.props;
    if (!inlineCollapsed) {
      this.setSubHeight(prevProps);
    }
  }

  componentWillUnmount() {
    const { inlineCollapsed } = this.props;
    if (inlineCollapsed) {
      events.off(document, 'click', this.onClickOutSide);
    }
  }

  toggleSubMenuOpen: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    const { subMenuKey, toggleOpenKeys } = this.props;
    if (toggleOpenKeys) {
      toggleOpenKeys(subMenuKey);
    }
  }

  renderChildren() {
    const {
      children, level, inlineIndent, mode, prefixCls, subMenuKey,
    } = this.props;
    const childProps: childPropsType = {
      mode,
      level: level + 1,
      inlineIndent,
      prefixCls,
    };
    return Children.map(children, (child, index) => {
      const c: ReactElement<any> = child as ReactElement<any>;
      const key = (child as ReactElement<any>).key;

      childProps.itemKey = key || `${subMenuKey}-${level}-${index}`;
      childProps.subMenuKey = key || `${subMenuKey}-${level}-${index}`;

      return cloneElement(c, childProps);
    });
  }

  getSubHeight() {
    if (!this.sub) {
      return;
    }
    const childs = [...this.sub.children];
    let marginBottom = 0;

    if (childs[0]) {
      marginBottom = parseFloat(dom.getStyleComputedProperty(childs[0], 'marginBottom'));
    }

    const height = childs.reduce((res, next) => {
      res += (next.offsetHeight + marginBottom);
      return res;
    }, marginBottom / 2);

    return height;
  }

  setSubHeight(prevProps: Pick<this['props'], 'openKeys'>) {
    if (!this.sub) {
      return;
    }
    const { openKeys: lastOpenKeys } = prevProps;
    const { openKeys, subMenuKey } = this.props;

    const keyIndex = openKeys.indexOf(subMenuKey);
    const keysLength = openKeys.length;
    if (keyIndex > -1) {
      if (keysLength > 1 && keyIndex < keysLength - 1 || keysLength < lastOpenKeys.length) {
        // 如果不是最后一级子菜单，或者嵌套的子菜单被收起，当前子菜单高度自适应
        this.sub.style.height = 'auto';
      } else {
        // 否则，设置具体的高度产生过渡动画
        const height = this.getSubHeight();
        this.sub.style.height = height + 'px';
      }
    } else {
      const height = this.getSubHeight();
      this.sub.style.height = height + 'px';

      setTimeout(() => {
        this.sub.style.height = 0;
      }, 0);
    }
  }

  slideUp() {
    this.setState({
      collapsedSubVisible: false,
      collapsedSubAnimation: 'up',
    });
  }

  slideDown() {
    this.setState({
      collapsedSubVisible: true,
      collapsedSubAnimation: 'down',
    });
  }

  onSubAnimationEnd = () => {
    const { subMenuKey, openKeys } = this.props;
    const isOpen = openKeys.indexOf(subMenuKey) > -1;
    this.setState({
      collapsedSubVisible: isOpen,
    });
  }

  onClickOutSide: EventListener = (e) => {
    const { target } = e;
    const { subMenuKey, openKeys, toggleOpenKeys } = this.props;
    if (this.subTitle.contains(target)) {
      return;
    }
    if (!this.sub.contains(target) && openKeys.indexOf(subMenuKey) > -1) {
      if (toggleOpenKeys) {
        toggleOpenKeys(subMenuKey);
      }
    }
  }

  render() {
    const {
      title, level, mode, style, inlineIndent,
      prefixCls, openKeys, subMenuKey, inlineCollapsed,
    } = this.props;
    const { collapsedSubVisible, collapsedSubAnimation } = this.state;

    const subMenuStyle: styleType = {};
    if (mode === 'inline' && !inlineCollapsed) {
      subMenuStyle.paddingLeft = level * inlineIndent;
    }
    const isOpen = openKeys.indexOf(subMenuKey) > -1;
    const cls = classnames(`${prefixCls}-submenu`, {
      open: isOpen,
      [`${prefixCls}-level-${level}`]: level,
    });
    let subStyle: React.CSSProperties = {
      display: 'block',
    };
    let subCls = `${prefixCls}-submenu-sub`;
    if (inlineCollapsed) {
      subStyle = {
        display: collapsedSubVisible ? 'block' : 'none',
      };
      subCls = classnames(`${prefixCls}`, `${prefixCls}-submenu-sub`, {
        [`slide-${collapsedSubAnimation}`]: !!collapsedSubAnimation,
      });
    }

    return (
      <li className={cls} style={style}>
        <div
          ref={(subTitle) => { this.subTitle = subTitle; }}
          onClick={this.toggleSubMenuOpen}
          style={subMenuStyle}
          className={`${prefixCls}-submenu-title`}
        >
          {title}
          <i className={`${prefixCls}-submenu-arrow`} />
        </div>
        <ul
          ref={(sub) => { this.sub = sub; }}
          className={subCls}
          style={subStyle}
          onAnimationEnd={this.onSubAnimationEnd}
        >
          {this.renderChildren()}
        </ul>
      </li>
    );
  }
}

export default function SubMenuConsumer(props: SubMenu['props']) {
  return (
    <MenuContext.Consumer>
      {
        (menuKeys) => (
          <SubMenu
            {...props}
            inlineCollapsed={menuKeys.inlineCollapsed}
            openKeys={menuKeys.openKeys}
            toggleOpenKeys={menuKeys.toggleOpenKeys}
          />
        )}
    </MenuContext.Consumer>
  );
}
