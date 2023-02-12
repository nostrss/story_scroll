import styled from '@emotion/styled';

type ImageProps = {
  isShow: boolean;
};

export const WrapperPage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  border: none;
`;

export const ScrollImage = styled.img<ImageProps>`
  width: 100%;
  height: auto;
  transition: 1s;
  opacity: 0;
  will-change: opacity;
  opacity: ${(props) => (props.isShow ? 1 : 0)};
`;

export const ScrollImageEmpty = styled.img`
  width: 100%;
  height: 360px;
  transition: 0.5s;
  opacity: 0;
  will-change: opacity;
  background-color: rgba(255, 255, 255, 0.8);
`;

export const WrapperBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  margin-top: 15%;
  z-index: 10;
  position: relative;
`;

export const TextBox = styled.p`
  width: 80%;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 0.5rem 1rem;
  margin-bottom: 60vh;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 0 3px;
  margin-top: 30%;
`;
