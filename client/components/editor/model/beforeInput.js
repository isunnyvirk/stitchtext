import StringToTypeMap from '../util/constants';
import { getCurrentBlock, resetBlockWithType } from './index';

export default (editorState, str, onChange, mapping = StringToTypeMap) => {
  const selection = editorState.getSelection();
  const block = getCurrentBlock(editorState);
  
  if (selection.getAnchorOffset() > 3) {
    return false;
  }
  const blockTo = mapping[block.getText() + str];

  if (!blockTo) {
    return false;
  }
  const finalType = blockTo.split(':');

  if (finalType.length < 1 || finalType.length > 4) {
    return false;
  }
  const fType = finalType[0];
  onChange(resetBlockWithType(editorState, fType));
  return true;
}
