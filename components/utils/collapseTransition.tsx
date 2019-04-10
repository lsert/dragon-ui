import React, { Component, createRef } from 'react';

interface IProps {
  visible: boolean;
  children: React.ReactNode;
}

const percent = .06;

export default class CollapseTransition extends Component<IProps, any> {
  collapseWrap = createRef<HTMLDivElement>();

  componentDidMount(): void {
    this.beforeEnter();
    if (this.props.visible) {
      this.enter();
    }
  }

  componentWillUnmount(): void {
    this.beforeLeave();
    this.leave();
  }

  componentDidUpdate(props: this['props']) {
    if (this.props.visible !== props.visible) this.triggerChange(this.props.visible);
  }

  shouldComponentUpdate(props: this['props']) {
    return this.props.visible !== props.visible;
  }

  triggerChange(visible: boolean): void {
    if (visible) {
      this.beforeEnter();
      this.enter();
    } else {
      this.beforeLeave();
      this.leave();
    }
  }

  beforeEnter() {
    const el: any = this.collapseWrap.current;
    el.dataset.oldPaddingTop = el!.style.paddingTop;
    el.dataset.oldPaddingBottom = el!.style.paddingBottom;
    el.dataset.oldOverflow = el!.style.overflow;
    el.style.height = 0;
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
  }

  enter() {
    const el: any = this.collapseWrap.current;
    let tempHeight = 0;
    let tempPaddingTop = 0;
    let tempPaddingBottom = 0;
    el.style.display = 'block';

    function step(context: CollapseTransition) {
      tempHeight = Math.min(el.scrollHeight, tempHeight += el.scrollHeight * percent);
      tempPaddingTop = Math.min(el.dataset.oldPaddingTop, tempPaddingTop += el.dataset.oldPaddingTop * percent);
      tempPaddingBottom = Math.min(el.dataset.oldPaddingBottom, tempPaddingBottom += el.dataset.oldPaddingBottom * percent);
      el.style.height = tempHeight + 'px';
      el.style.paddingTop = tempPaddingTop;
      el.style.paddingBottom = tempPaddingBottom;
      if (tempHeight < el.scrollHeight) {
        requestAnimationFrame(() => { step(context); });
      } else {
        context.afterEnter();
      }
    }

    requestAnimationFrame(() => { step(this); });
    el.style.overflow = 'hidden';
  }

  afterEnter() {
    const el: any = this.collapseWrap.current;
    el.style.display = 'block';
    el.style.height = '';
    el.style.overflow = el.dataset.oldOverflow;
  }

  beforeLeave() {
    const el: any = this.collapseWrap.current;
    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.dataset.oldOverflow = el.style.overflow;

    el.style.display = 'block';
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px';
    }
    el.style.overflow = 'hidden';
  }

  leave() {
    const el: any = this.collapseWrap.current;
    let tempHeight = el.scrollHeight;
    let tempPaddingTop = el.dataset.oldPaddingTop;
    let tempPaddingBottom = el.dataset.oldPaddingBottom;

    function step(context: CollapseTransition) {
      tempHeight = Math.max(0, tempHeight -= el.scrollHeight * percent);
      tempPaddingTop = Math.max(0, tempPaddingTop -= el.dataset.oldPaddingTop * percent);
      tempPaddingBottom = Math.max(0, tempPaddingBottom -= el.dataset.oldPaddingBottom * percent);
      el.style.height = tempHeight + 'px';
      el.style.paddingTop = tempPaddingTop;
      el.style.paddingBottom = tempPaddingBottom;
      if (tempHeight !== 0) {
        requestAnimationFrame(() => { step(context); });
      } else {
        context.afterLeave();
      }
    }

    requestAnimationFrame(() => { step(this); });
  }

  afterLeave() {
    const el: any = this.collapseWrap.current;
    if (!el) return;

    el.style.display = 'none';
    el.style.height = '';
    el.style.overflow = el.dataset.oldOverflow;
    el.style.paddingTop = el.dataset.oldPaddingTop;
    el.style.paddingBottom = el.dataset.oldPaddingBottom;
  }

  render() {
    return (
      <div
        className="collapse-transition"
        ref={this.collapseWrap}
        style={{ overflow: 'hidden' }}
      >
        {this.props.children}
      </div>
    );
  }
}
