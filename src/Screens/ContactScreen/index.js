import React, {memo, useCallback} from 'react';
import {View, Text, Image, ScrollView, FlatList} from 'react-native';
import {TextComponent} from '../../Components/TextComponent';
import {styles} from './styles';
import useContactScreen from './useContactScreen';
import {catData, contactData} from '../../Utils/localDB';
import {contacticon, downloadIcon} from '../../Assets';
import {hp} from '../../Config/responsive';
import {HeaderComponent} from '../../Components/HeaderComponent';
import {Touchable} from '../../Components/Touchable';

const ContactScreen = ({navigation}) => {
  const {} = useContactScreen(navigation);
  const renderItem = useCallback(({item, index}) => {
    return (
      <View style={styles.mainContact}>
        <Image source={item?.image} style={styles.contactProfile} />
        <View style={styles.contactInner}>
          <TextComponent
            text={item?.designation}
            styles={styles.designationStyle}
          />
          <TextComponent
            text={`${item?.name}${' - ' + item?.subDesignation}`}
            styles={styles.name}
          />
          <TextComponent text={item?.email} styles={styles.name} />
          <TextComponent
            text={`${item?.phone} ${item?.available}`}
            styles={styles.name}
          />
        </View>
      </View>
    );
  });
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <HeaderComponent title={'Catalogs & Brochures'} />
        <View style={styles.catMain}>
          <Image source={contacticon} style={styles.contactIcon} />
          <FlatList
            refreshing={false}
            data={contactData}
            renderItem={renderItem}
            contentContainerStyle={{
              // alignItems: 'center',
              marginTop: hp('2'),
            }}
          />
        </View>
      </ScrollView>
    </>
  );
};
export default memo(ContactScreen);
