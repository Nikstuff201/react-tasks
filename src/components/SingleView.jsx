const SingleView = (props) => {
  const {item, setSelectedItem} = props;

  let mediaElement;

  if (item.media_type.startsWith('video/')) {
    mediaElement = <video src={item.filename} controls />;
  } else {
    mediaElement = <img src={item.filename} alt={item.title} />;
  }

  return (
      <dialog open={!!item}>ˍ
    <h1>{item.title}</h1>
    <p>{item.description}</p>
      {mediaElement}
        <button onClick={() => setSelectedItem(null)}></button>
      </dialog>
  )
}

export default SingleView;
