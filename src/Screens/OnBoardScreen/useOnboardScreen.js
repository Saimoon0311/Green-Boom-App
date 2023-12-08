import {useState} from 'react';
import {Dimensions} from 'react-native';
import useReduxStore from '../../Hooks/UseReduxStore';
import {onBoardinData} from '../../Utils/localDB';
import {types} from '../../Redux/types';

const useOnboardingScreen = ({navigate, params}) => {
  const {dispatch} = useReduxStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const width = Dimensions.get('window').width;

  const onSnapToItem = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentIndex(currentIndex);
  };

  const getStart = () => {
    dispatch({
      type: types.onBoardFinished,
    });
  };
  const goNext = () => {
    if (currentIndex == 1) getStart();
    setCurrentIndex(pre => pre + 1);
  };

  return {
    onBoardinData,
    onSnapToItem,
    currentIndex,
    getStart,
    goNext,
  };
};

export default useOnboardingScreen;
