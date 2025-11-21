import PropTypes from 'prop-types'
import {Link} from "react-router-dom";

const MediaRow = (props) => {
  const {item} = props;
  return (
    <tr>
      <td>
        <img src={item.thumbnail} alt={item.title}/>
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td><Link to="/single" state={item}>Show</Link></td>
    </tr>

  );
};

MediaRow.propTypes = {
  item: PropTypes.shape({
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    filesize: PropTypes.number.isRequired,
    media_type: PropTypes.string.isRequired,
  }).isRequired,
};

export default MediaRow;
