import React, { PureComponent } from 'react';
import Button from '../../components/button';
import Modal from '../../components/modal';
import Menu from '../../components/menu';
import Checkbox from '../../components/checkbox';
import Dropdown from '../../components/dropdown';
import Input from '../../components/input';

class Page extends PureComponent {
  state = {
    visible: false,
  };

  onVisibleChange = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    const overlay = (
      <Menu>
        <Menu.Item><Checkbox value="name">姓名</Checkbox></Menu.Item>
        <Menu.Item><Checkbox value="age">年龄</Checkbox></Menu.Item>
        <Menu.Item
          onClick={() => {
            this.setState({
              visible: false,
            });
          }}
        >
          点我关闭当前弹窗
        </Menu.Item>
      </Menu>
    );

    const { visible } = this.state;
    return (
      <div
        style={{
          margin: 50,
          overflow: 'scroll',
          width: 300,
        }}
      >
        <div
          style={{
            marginLeft: 100,
            width: 500,
          }}
        >
          <Dropdown
            onVisibleChange={(visible) => {
              this.setState({
                visible,
              });
            }}
            visible={visible}
            content={overlay}
            direction="bottomScreen"
            style={{
              width: '100%',
            }}
            width="100%"
          >
            <Button onClick={this.onClick}>点击我</Button>
          </Dropdown>
        </div>
      </div >
    );
  }
}

export default Page;
