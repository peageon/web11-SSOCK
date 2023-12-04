import { useRef } from 'react';
import theme from '../../utils/theme';
import styled from 'styled-components';

interface IntroduceProps {
  view: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const StyledIntroduce = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${theme.colors['--primary-yellow']};
  border-radius: 1.5rem;
  width: 80%;
  height: 60%;
  text-align: center;
  color: ${theme.colors['--black-primary']};
  display: flex;
  flex-direction: column;
  animation: fadein 0.7s;

  @media (min-width: ${theme.size.maxWidth}) {
    width: 600px;
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeout {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

const StyledText = styled.div`
  flex: 9;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  overflow: auto;
  word-break: keep-all;
  font: ${theme.font['--normal-introduce-font']};
`;

const StyledClosed = styled.button`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${theme.font['--normal-button-font']};
  font-size: 14px;
  line-height: normal;
`;

const closeIntroduce = (
  props: IntroduceProps,
  closeRef: React.RefObject<HTMLDivElement>
) => {
  const onAnimationEnd = () => {
    if (closeRef.current) {
      props.view[1](!props.view[0]);
      closeRef.current.removeEventListener('animationend', onAnimationEnd);
    }
  };

  if (closeRef.current) {
    closeRef.current.addEventListener('animationend', onAnimationEnd);
    closeRef.current.style.setProperty('animation', 'fadeout 0.5s forwards');
  }
};

const Introduce = (props: IntroduceProps) => {
  const closeRef = useRef<HTMLDivElement>(null);

  return (
    <StyledIntroduce ref={closeRef}>
      <StyledText>
        안녕하세요 저희는 쏙입니다. <br /> <br />
        국민은행 <br /> 942902-00-180129
        <br /> 계좌주 : 오승엽 <br /> 후원시 찬우 제로투 or 슬릭백 10초
      </StyledText>
      <StyledClosed onClick={() => closeIntroduce(props, closeRef)}>
        닫기
      </StyledClosed>
    </StyledIntroduce>
  );
};

export default Introduce;