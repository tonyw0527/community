import { useEffect, useRef } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

class Popup {
  static normal(content: string, timeout?: number) {
    this.popup('normal', content, timeout);
  }

  static success(content: string, timeout?: number) {
    this.popup('success', content, timeout);
  }

  static warn(content: string, timeout?: number) {
    this.popup('warn', content, timeout);
  }

  static error(content: string, timeout?: number) {
    this.popup('error', content, timeout);
  }

  static popup(type: string, content: string, timeout = 3000) {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const close = () => {
      unmountComponentAtNode(container);
      container.parentNode?.removeChild(container);
    };

    render(<GlobalPopup type={type} content={content} onClose={close} />, container);

    setTimeout(() => {
      close();
    }, timeout);
  }
}

export default Popup;

export interface GlobalPopupProps {
  type: string;
  content: string;
  onClose: () => void;
}

export function GlobalPopup({ type, content, onClose }: GlobalPopupProps) {
  const theme = useTheme(); // for storybook
  const localTheme = localStorage.getItem('theme');

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pageClickEvent = (e: any) => {
      if (sectionRef.current !== null && !sectionRef.current.contains(e.target)) {
        onClose();
        console.log('hh');
      }
    };

    window.addEventListener('click', pageClickEvent);
    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, []);

  return (
    <>
      <Overlay ptype={type} />
      <Wrapper>
        <Section theme={theme} localTheme={localTheme} tabIndex={-1} ref={sectionRef}>
          <H3 ptype={type}>{setTitle(type)}</H3>
          <P theme={theme} localTheme={localTheme} ptype={type}>
            {content}
          </P>
          <BottomButton ptype={type} tabIndex={0} onClick={onClose}>
            close
          </BottomButton>
        </Section>
      </Wrapper>
    </>
  );
}

const setTitle = (type: string) => {
  let result = '';

  switch (type) {
    case 'success':
      result = '성공';
      break;
    case 'warn':
      result = '주의';
      break;
    case 'error':
      result = '에러';
      break;
    default: {
      result = '알림';
      break;
    }
  }
  return result;
};

const setColor = (ptype: string) => {
  let result = '';

  switch (ptype) {
    case 'success':
      result = '#00A5E3';
      break;
    case 'warn':
      result = '#FC6234';
      break;
    case 'error':
      result = '#FF5C77';
      break;
    default: {
      result = '#868e96';
      break;
    }
  }
  return result;
};

const Overlay = styled.div<{ ptype: string }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${({ ptype }) => ptype === 'error' && 'rgba(0, 0, 0, 0.6)'};
  z-index: 999;
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const Section = styled.section<{ localTheme: string | null }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 1rem 0;
  width: 18rem;
  max-width: 20rem;
  border-radius: 10px;
  outline: 0;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background: ${({ theme }) => (theme.color !== undefined ? theme.color.background + '94' : '')};
  background: ${({ theme, localTheme }) =>
    localTheme !== null ? (localTheme === 'light' ? '#FFFFFF' : '#121212') : theme.color.background + '94'};
`;

const H3 = styled.h3<{ ptype: string }>`
  margin: 0;
  text-align: center;
  color: ${({ ptype }) => setColor(ptype)};
`;

const P = styled.p<{ ptype: string; localTheme: string | null }>`
  margin: 1.5rem;
  color: ${({ theme }) => (theme.color !== undefined ? theme.color.onBackground : '')};
  color: ${({ theme, localTheme }) =>
    localTheme !== null ? (localTheme === 'light' ? '#000000DE' : '#FFFFFFDE') : theme.color.onBackground};
`;

const BottomButton = styled.button<{ ptype: string }>`
  padding: 0.3rem;
  width: 50%;
  border: 0;
  border-radius: 0.5rem;
  background: ${({ ptype }) => setColor(ptype)};
  color: white;

  &:hover {
    cursor: pointer;
    opacity: 0.94;
  }

  &:focus {
    outline: 0;
  }
`;
