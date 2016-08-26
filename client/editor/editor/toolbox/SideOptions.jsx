import React, { Component } from 'react';
import { RichUtils } from 'draft-js';
import { BLOCK_TYPES } from '../util/constants';
import StyleButton from './StyleButton.jsx';

const styles = {
  container: {
    position: 'relative',
    left: 0,
    top: 10,
    zIndex: 998,
  },
}

export default class SideOptions extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div style={Object.assign({}, styles.container, this.props.style)}>
        {BLOCK_TYPES.map(type => {
          if (type.style === this.props.activeBlock) {
            return;
          }
          return (
            <StyleButton
              label={type.label}
              icon={type.icon}
              onToggle={this.props.toggleBlockType}
              style={type.style}
              activeBlock={this.props.activeBlock}
            />)
        })}
      </div>
    );
  }
}
