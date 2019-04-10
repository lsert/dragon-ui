import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import Popper from './popper';
import Events from '../utils/events';
import PropsType, { directionMap } from './PropsType';

const directMap = {
  top: 'top',
  topLeft: 'top-start',
  topRight: 'top-end',
  right: 'right',
  rightTop: 'right-start',
  rightBottom: 'right-end',
  bottom: 'bottom',
  bottomLeft: 'bottom-start',
  bottomRight: 'bottom-end',
  left: 'left',
  leftTop: 'left-start',
  leftBottom: 'left-end',
};

class Popover extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-popover',
    className: null,
    visible: false,
    trigger: 'click',
    mask: false,
    radius: true,
    direction: 'bottomRight',
    onMaskClick() { },
    content: null,
  };

  private instance!: HTMLDivElement;
  private pop!: HTMLDivElement;
  private reference!: HTMLElement;
  private popper!: Popper;
  private timer?: number;
  private arrow!: HTMLSpanElement;

  constructor(props: PropsType) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    const { instance, pop } = this;
    const reference = findDOMNode(this.reference); // eslint-disable-line
    const { trigger } = this.props;

    if (trigger === 'click') {
      Events.on(reference, 'click', () => {
        this.setState({
          visible: !this.state.visible,
        });
      });
      Events.on(document, 'click', ({ target }: MouseEvent) => {
        if (!target) return;
        if (
          !instance ||
          instance.contains(target as Node) ||
          !reference ||
          reference.contains(target as Node) ||
          !pop ||
          pop.contains(target as Node) ||
          !this.popper
        ) {
          return;
        }
        this.hidePop();
      });
    } else {
      Events.on(reference, 'mouseenter', () => {
        this.showPop();
      });
      Events.on(reference, 'mouseleave', () => {
        this.hidePop();
      });
      Events.on(pop, 'mouseenter', () => {
        this.showPop();
      });
      Events.on(pop, 'mouseleave', () => {
        this.hidePop();
      });
    }
  }

  componentWillReceiveProps(nextProps: this['props']) {
    if (this.state.visible !== nextProps.visible) {
      this.setState({
        visible: !!nextProps.visible,
      });
    }
  }

  componentDidUpdate() {
    const { visible } = this.state;
    const { direction } = this.props;
    const reference = findDOMNode(this.reference); // eslint-disable-line

    if (visible) {
      if (this.popper) {
        this.popper.update();
      } else {
        if (this.arrow) {
          this.arrow.setAttribute('x-arrow', '');
        }
        let placement = directMap[direction] as directionMap;
        if (reference && reference instanceof HTMLElement) {
          this.popper = new Popper(reference, this.pop, {
            placement,
          });
        }
      }
    } else {
      if (this.popper) {
        this.popper.destroy();
      }
      delete this.popper;
    }
  }

  componentWillUnmount() {
    if (this.popper) {
      this.popper.destroy();
    }
    delete this.popper;
  }

  showPop() {
    clearTimeout(this.timer);
    this.setState({
      visible: true,
    });
  }

  hidePop() {
    const { trigger } = this.props;
    if (trigger === 'click') {
      this.setState({
        visible: false,
      });
      return;
    }
    this.timer = setTimeout(() => {
      this.setState({
        visible: false,
      });
    }, 200);
  }

  render() {
    const { visible } = this.state;
    const {
      children,
      content,
      prefixCls,
      className,
      radius,
      mask,
      onMaskClick,
    } = this.props;
    const child = React.isValidElement(children) ? (
      children
    ) : (
        <span>{children}</span>
      );
    const popContent = typeof content === 'function' ? content() : content;
    const cls = classnames({
      'ui-popover': true,
      [className!]: !!className,
    });
    const contentCls = classnames({
      [`${prefixCls}-content`]: true,
      [`${prefixCls}-content-show`]: visible,
      [`${prefixCls}-content-radius`]: !!radius,
    });
    const maskCls = classnames({
      [`${prefixCls}-mask`]: true,
      [`${prefixCls}-mask-show`]: visible,
    });

    return (
      <div
        className={cls}
        // tslint:disable-next-line:jsx-no-multiline-js
        ref={(instance) => {
          if (instance) {
            this.instance = instance;
          }
        }}
      >
        {mask ? <div className={maskCls} onClick={onMaskClick} /> : null}
        <div
          className={contentCls}
          // tslint:disable-next-line:jsx-no-multiline-js
          ref={(pop) => {
            if (pop) {
              this.pop = pop;
            }
          }}
        >
          {popContent}
          <span
            className={`${prefixCls}-arrow`}
            // tslint:disable-next-line:jsx-no-multiline-js
            ref={(arrow) => {
              if (arrow) {
                this.arrow = arrow;
              }
            }}
          />
        </div>
        {React.cloneElement(child, { ref: (reference: HTMLElement) => { this.reference = reference; } })}
      </div>
    );
  }
}

export default Popover;
