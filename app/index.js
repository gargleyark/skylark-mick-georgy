import _ from 'lodash';
import './index.global.scss';

const component = () => {
  const element = document.createElement('div');
  element.innerHTML = 'OstChallenge';

  return element;
}

document.body.appendChild(component());
