import {useEffect, useState} from 'react';
import {videosData} from '../../Utils/localDB';
import API from '../../Utils/helperFunc';
import {sendType, tabButtonType} from '../../Utils/Urls';
import useReduxStore from '../../Hooks/UseReduxStore';
import {getCategory} from '../../Redux/Action/contentAction';
import {
  callS,
  emailS,
  messageS,
  microphoneS,
  trainingPDFIcon,
  wordIcon,
} from '../../Assets';

const useTraining = ({navigate, goBack}, {params}) => {
  const {dispatch, getState} = useReduxStore();
  const titleData = getState('getCategory');
  const category = titleData[params?.id]?.cat ?? [];
  const subCategory = titleData[params?.id]?.subCat ?? [];
  console.log('cat subcat', subCategory[0]);
  const isCategory = Boolean(category.length > 0);
  const iconType = {
    pdf: trainingPDFIcon,
    word: wordIcon,
  };
  const scriptIconType = {
    email: emailS,
    call: callS,
    voicemail: microphoneS,
    sms: messageS,
  };
  const [accordionItem, setAccordionItem] = useState('');

  const [subCat, setSubCat] = useState(null);
  const [activeBtn, setActiveBtn] = useState({
    id: category[0]?.id,
    title: category[0]?.title,
  });
  console.log('st', activeBtn);
  const onCategory = async item => {
    setActiveBtn(item);
    const {ok, data} = await API.post(tabButtonType, {
      id: item?.id,
      type: params.id,
    });
    console.log('dd', data);
    if (ok) {
      setSubCat(data.data);
      subCategory = data.data;
      // console.log('asdtest', data.data);
    }
  };
  useEffect(() => {
    dispatch(getCategory(params?.id));
    setActiveBtn({
      id: category[0]?.id,
      title: category[0]?.title,
    });
  }, []);

  return {
    isCategory,
    categoryData: params?.category,
    title: params?.title,
    isVideo: params?.isVideo,
    category,
    subCategory: subCat ?? subCategory,
    iconType,
    onCategory,
    activeBtn,
    accordionItem,
    setAccordionItem,
    scriptIconType,
  };
};

export default useTraining;
