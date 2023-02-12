export default function ScrollPost({ scrollData }: any) {
  return (
    <>
      {scrollData.map((el: any, idx: number) => (
        <div key={idx}>{el.img && <img src={el.img} alt='' />}</div>
      ))}
      {scrollData.map((el: any, idx: number) => (
        <div key={idx}>{el.text && <p>{el.text}</p>}</div>
      ))}
    </>
  );
}
