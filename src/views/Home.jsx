import {useEffect, useState} from 'react';
import MediaRow from '../components/MediaRow';
import {useMedia} from '../hooks/apiHooks';
import {useLike} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/contextHooks';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const {user} = useUserContext();

  const {mediaArray, deleteMedia, modifyMedia} = useMedia();
  const {postLike, deleteLike, getLikeCountByMediaId, getLikeByUser} =
    useLike();

  return (
    <>
      <h2>My Media</h2>
      <table>
        <thead>
        <tr>
          <th>Owners username</th>
          <th>Thumbnail</th>
          <th>Title</th>
          <th>Description</th>
          <th>Created</th>
          <th>Size</th>
          <th>Type</th>
          <th></th>
          {user && (
            <>
              <th></th>
              <th></th>
              <th></th>
            </>
          )}
        </tr>
        </thead>
        <tbody>
        {mediaArray.map((item) => (
          <MediaRow
            key={item.media_id}
            item={item}
            deleteMedia={deleteMedia}
            modifyMedia={modifyMedia}
            postLike={postLike}
            deleteLike={deleteLike}
            getLikeCountByMediaId={getLikeCountByMediaId}
            getLikeByUser={getLikeByUser}
          />
        ))}
        </tbody>
      </table>
    </>
  );
};
export default Home;
