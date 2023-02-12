import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

export const TextBox = styled.p`
  width: 80%;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 0.5rem 1rem;
  margin-top: 50vh;
  margin-bottom: 50vh;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 0 3px;
  opacity: 0;
  transition: 0.5s;
  will-change: opacity;
`;

export default function TextItem({ textData, index, setShowImgIndex }: any) {
  const target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(
        ([e]) => {
          const target = e.target as HTMLElement;
          if (e.isIntersecting) {
            target.style.opacity = '1';
            setShowImgIndex(index);
          } else {
            target.style.opacity = '0';
          }
        },
        { threshold: 0.4 }
      );
      observer.observe(target.current as Element);
    }
  }, [index, setShowImgIndex, target]);

  return <TextBox ref={target}>{textData}</TextBox>;
}
