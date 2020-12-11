import React, { Component } from 'react';

interface PropsIF {
  value: number;     // 当前年份
}

class YearPicker extends Component<PropsIF> {
  static getCurrentYearList(value: number) {
    const minValue = Math.floor(value / 10) * 10;
    const list: number[] = [];
    for (let i = 0; i < 10; i++) {
      list.push(minValue + i);
    }
    return list;
  }

  render() {
    const { value } = this.props;
    const currentList = YearPicker.getCurrentYearList(value);
    return (
      <div>
        <ul className="year-pick-box">
          {
            currentList.map((item) => {
              return <li className="year-pick-item">{item}</li>;
            })
          }
        </ul>
      </div>
    );
  }
}

export default YearPicker;

