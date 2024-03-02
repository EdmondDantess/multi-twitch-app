import { deleteWindow, setChatOpenClose, setChatPos } from './window-reducer';
import React, { memo } from 'react';
import './window.css';
import { contentChatURL, contentVideoURL } from './utils/iframeContent';
import close from '../../assets/icons/close.png';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

type WindowPropsType = {
  channel: string;
};

export const Window: React.FC<WindowPropsType> = memo(({ channel }) => {
  const dispatch = useAppDispatch();
  const window = useAppSelector((state) =>
    state.window.windows.find((w) => w.channel === channel),
  );

  function chatOpenCloseHandler() {
    dispatch(setChatOpenClose(channel));
  }

  function deleteWindowHandler() {
    dispatch(deleteWindow(channel));
  }

  function changeChatPosHandler() {
    dispatch(
      setChatPos(
        channel,
        window?.chatPosition === 'underVideo' ? 'rightVideo' : 'underVideo',
      ),
    );
  }

  function calcPropertyPosChat(value1: string, value2: string): any {
    return window?.chatPosition === 'underVideo' ? value1 : value2;
  }

  return (
    <div
      className={`window`}
      style={{
        flexDirection: calcPropertyPosChat('column', 'row'),
      }}
    >
      <div className={'window__channel-name'}>{channel}</div>

      <iframe
        title={channel}
        src={contentVideoURL(channel)}
        allowFullScreen
        width={calcPropertyPosChat('100%', window?.chat ? '67%' : '100%')}
        height={
          window?.chat && window?.chatPosition === 'underVideo' ? '33%' : '100%'
        }
      />
      {window?.chat && (
        <iframe
          title={'window.chat'}
          src={contentChatURL(channel)}
          height={calcPropertyPosChat('67%', '100%')}
          width={calcPropertyPosChat('100%', '33%')}
        />
      )}
      <div
        className={'window__chat'}
        style={{
          bottom: window?.chatPosition === 'underVideo' ? '-20px' : '0%',
          left: window?.chatPosition === 'rightVideo' ? '100%' : '',
          width: calcPropertyPosChat('100%', '20px'),
          height: calcPropertyPosChat('20px', '100%'),
          writingMode: calcPropertyPosChat('horizontal-tb', 'vertical-rl'),
        }}
      >
        <div className={'window__delete'} onClick={deleteWindowHandler}>
          <img src={close} alt="delete icon" />
        </div>
        <div
          className={'window__chat-pos'}
          style={{
            width: calcPropertyPosChat('10%', '100%'),
            height: calcPropertyPosChat('100%', '10%'),
          }}
          onClick={changeChatPosHandler}
        >
          {calcPropertyPosChat('🡆', '🡆')}
        </div>
        <div
          className={'window__chat__btn'}
          style={{
            width: calcPropertyPosChat('90%', '20px'),
            height: calcPropertyPosChat('100%', '90%'),
          }}
          onClick={chatOpenCloseHandler}
        >
          {calcPropertyPosChat(
            window?.chat ? 'Close chat' : '🡅 Open chat',
            window?.chat ? 'Close chat' : '🡇 Open chat',
          )}
        </div>
      </div>
    </div>
  );
});
