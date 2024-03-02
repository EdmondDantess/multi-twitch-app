import { setWindowSize, WindowType } from '../Window/window-reducer';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { Window } from '../Window/Window';
import React from 'react';
import './table.css';
import '../../../node_modules/react-resizable/css/styles.css';
import '../../../node_modules/react-grid-layout/css/styles.css';
import RGL, { WidthProvider, Responsive } from 'react-grid-layout';
import { useAppDispatch } from '../../app/hooks';

const ReactGridLayout = WidthProvider(Responsive);

export const Table = React.memo(() => {
  const windows = useSelector<RootState, WindowType[]>(
    (state) => state.window.windows,
  );
  const dispatch = useAppDispatch();
  const generateWindows = (): JSX.Element[] => {
    return windows.map((window) => {
      return (
        <div key={window.channel} className={'relative '}>
          <Window channel={window.channel} />
        </div>
      );
    });
  };

  const generateLayout = (): RGL.Layout[] => {
    return windows.map((window) => {
      return {
        x: window.x,
        y: window.y,
        w: window.width,
        h: window.height,
        i: window.channel,
      };
    });
  };
  const onResizeDropStop = (layout: RGL.Layout[]) => {
    layout.forEach((window) => {
      dispatch(
        setWindowSize(
          window.i,
          { width: window.w, height: window.h },
          { x: window.x, y: window.y },
        ),
      );
    });
  };
  const layout = generateLayout();
  return (
    <div className={'table'}>
      <div className={'table__windows'}>
        <ReactGridLayout
          className="layout "
          rowHeight={100}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          layouts={{
            lg: layout,
          }}
          useCSSTransforms
          resizeHandles={['ne', 'n', 's', 'se', 'w']}
          onResize={onResizeDropStop}
          onDragStop={onResizeDropStop}
          margin={[22, 22]}
        >
          {generateWindows()}
        </ReactGridLayout>
      </div>
    </div>
  );
});
