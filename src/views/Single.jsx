import {useLocation, useNavigate} from "react-router-dom";

const Single = () => {
  const navigate = useNavigate();
  const {state} = useLocation();
  console.log(state);
  const item = state;

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
      <button onClick={() => navigate(-1)}>Go back</button>
    </dialog>
  )
}

export default Single;
