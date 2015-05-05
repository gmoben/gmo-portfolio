import Context from 'react-famous/core/Context';
import Modifier from 'react-famous/core/Modifier';
import StateModifier from 'react-famous/modifiers/StateModifier';
import Surface from 'react-famous/core/Surface';
import RenderNode from 'react-famous/core/RenderNode';
import SequentialLayout from 'react-famous/views/SequentialLayout';
import ContainerSurface from 'react-famous/surfaces/ContainerSurface';
import RenderController from 'react-famous/views/RenderController';
import FamousScheduler from 'react-famous/lib/FamousScheduler';
import Utility from 'famous/utilities/Utility';

import _ from 'lodash';

import Transform from 'famous/core/Transform';
import Easing from 'famous/transitions/Easing';

const ICON_PREFIX = 'icon_';
const STATE_MOD_PREFIX = 'statemod_';

class App extends React.Component {

  componentDidMount() {
    let content = this.refs.content.getFamous();
    let renderController = this.refs.renderController.getFamous();

    // Show content
    FamousScheduler.schedule(() => {
      renderController.show(this.refs.content.getFamous(), {duration: 500, curve: Easing.inOutQuint});
    }, 0);

    // Get icons and state modifiers
    let [icons, statemods] = [ICON_PREFIX, STATE_MOD_PREFIX].map((prefix) => {
      return Object.keys(this.refs)
      .filter((key) => _.startsWith(key, prefix))
      .map((key) => this.refs[key].getFamous());
    });

    // Set animations
    _.zip(icons, statemods).map(pair => {
      let [icon, mod] = pair;
      icon.on('mouseover', (event) => {
        icon.addClass('hover');
        mod.halt();
        mod.setTransform(Transform.scale(1.3, 1.3, 1), {duration: 400, curve: Easing.outBack});
      });
      icon.on('mouseout', () => {
        icon.removeClass('hover');
        mod.halt();
        mod.setTransform(Transform.scale(1, 1, 1), {duration: 400, curve: Easing.outBack});
      });

      icon.on('mousedown', () => {
        mod.halt();
        let trans = mod.getTransform();
        mod.setTransform(Transform.scale(1, 1, 1), {duration: 100, curve: Easing.outBack});
        icon.on('mouseup', () => {
          mod.setTransform(trans, {duration: 100, curve: Easing.outBack});
        });

      });

    });

  }

  render() {

    let renderControllerOptions = {
      size: [400, 400]
    };

    let links = {
      // 'Cytogenetics': {
      //   icon: 'icon-erlenmyer-flask-draw',
      //   href: '#'
      // },
      'Soundcloud': {
        icon: 'icon-soundcloud-draw',
        href: 'https://soundcloud.com/notochord'
      },
      'Github': {
        icon: 'icon-github-draw',
        href: 'https://github.com/gmoben'
      },
      'LinkedIn': {
        icon: 'icon-linkedin-draw',
        href: 'https://www.linkedin.com/in/bwarr'
      },
      'Email': {
        icon: 'icon-email-draw',
        href: 'mailto:ben@warr.io'
      }
    };

    let icons = _.map(links, (params, name) => {
      return (
          <StateModifier ref={STATE_MOD_PREFIX + name} key={name}>
            <Modifier options={{origin:[0.5, 0.5]}}>
              <Surface options={{size: [90, 50], classes: ['social-icon']}} ref={ICON_PREFIX + name}>
                <a href={params.href} className={params.icon}/>
              </Surface>
            </Modifier>
        </StateModifier>
      );
    });

    return (
      <div>
        <Context>
          <Modifier options={{align: [0.5, 0.5], origin: [0.5, 0.5]}}>
            <RenderController options={renderControllerOptions} ref="renderController">
              <ContainerSurface options={{size: [400, 400]}} ref='content'>

                <Modifier options={{align: [0.5, 0.35], origin: [0.5, 0.5]}}>
                  <Surface options={{size: [true, true]}} ref='title'>
                    <div className='title'>ben warren</div>
                  </Surface>
                </Modifier>

                <Modifier options={{align: [0.615, 0.65], origin: [0.5, 0.5]}}>
                  <SequentialLayout options={{direction: 0}} ref='icons'>
                    {icons}
                  </SequentialLayout>
                </Modifier>

              </ContainerSurface>
          </RenderController>
          </Modifier>
        </Context>
      </div>
    );
  }
}
export default App;
