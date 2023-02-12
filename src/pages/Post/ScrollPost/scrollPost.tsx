import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  ScrollImage,
  ScrollImageEmpty,
  WrapperBox,
  WrapperPage,
} from './scrollPost.style';
import TextItem from './textItem/textItem';

export default function ScrollPost({ scrollData }: any) {
  const [showImgIndex, setShowImgIndex] = useState();

  return (
    <>
      {scrollData.map((el: any, index: number) => (
        <WrapperPage key={uuidv4()}>
          {el.img ? (
            <ScrollImage src={el.img} alt='' isShow={showImgIndex === index} />
          ) : (
            <ScrollImageEmpty alt='' />
          )}
        </WrapperPage>
      ))}
      <WrapperBox>
        {scrollData.map((el: any, index: number) => (
          <TextItem
            key={uuidv4()}
            textData={el.text}
            index={index}
            setShowImgIndex={setShowImgIndex}
          />
        ))}
      </WrapperBox>
    </>
  );
}
