import useMedia from '../hooks/ApiHooks';
import {useState} from 'react';
import SingleView from './SingleView';
import MediaRow from './MediaRow';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const {mediaArray} = useMedia();

  return (
    <>
      <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      <table>
        <tbody>
          {mediaArray.map((mediaItem) => (
            <MediaRow
              key={mediaItem.media_id}
              item={mediaItem}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
