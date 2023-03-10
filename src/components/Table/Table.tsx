import {setWindowSize, WindowType} from '../Window/window-reducer';
import {RootState} from '../../app/store';
import {useSelector} from 'react-redux';
import {Window} from '../Window/Window';
import React from 'react';
import './table.css'
import '../../../node_modules/react-resizable/css/styles.css'
import '../../../node_modules/react-grid-layout/css/styles.css'
import RGL, {WidthProvider} from 'react-grid-layout';
import {useAppDispatch} from '../../app/hooks';

const ReactGridLayout = WidthProvider(RGL);

export const Table = React.memo(() => {
        const windows = useSelector<RootState, WindowType[]>(state => state.window.windows)
        const dispatch = useAppDispatch()
        const generateWindows = (): JSX.Element[] => {
            return windows.map((w) => {
                return <div key={w.channel} style={{position: 'relative'}}><Window channel={w.channel}/></div>
            })
        }

        const generateLayout = (): RGL.Layout[] => {
            return windows.map((w) => {
                return {
                    x: w.x,
                    y: w.y,
                    w: w.chat && w.chatPosition === 'rightVideo' ? w.width + 1 : w.width,
                    h: w.chat && w.chatPosition === 'underVideo' ? w.height + 1 : w.height,
                    minW: 3,
                    maxW: 12,
                    i: w.channel,
                }
            })
        }
        const onResizeStop = (layout: RGL.Layout[]) => {
            layout.map(
                w => dispatch(setWindowSize(w.i, {width: w.w, height: w.h}, {x: w.x, y: w.y}))
            )
        }
        const layout = generateLayout();
        return (
            <div className={'table'}>
                <div className={'windows'}>
                    <ReactGridLayout className="layout"
                                     cols={12}
                                     layout={layout}
                                     onResizeStop={onResizeStop}
                                     margin={[15, 15]}
                    >
                        {generateWindows()}
                    </ReactGridLayout>
                </div>
            </div>)
    }
)

