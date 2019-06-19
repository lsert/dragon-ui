import React from 'react';
import Select from '../../components/select';
import '../../components/select/style';

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        {
          type: 'optionGroup',
          label: '这是第一分队',
          children: [
            { value: '1', children: '这是1' },
            { value: '2', children: '这是2' },
            { value: '3', children: '这是3' },
          ],
        },
        { value: '4', children: '这是4' },
        { value: '5', children: '这是5' },
        { value: '6', children: '这是6' },
        { value: '7', children: '这是7' },
      ],
    };
  }

  render() {
    return (
      <Select clearable options={this.state.options} />
    );
  }
}
