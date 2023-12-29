import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {gStyle} from '../styles/style';
import {RootStackParamList} from '../navigate';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IAlbums} from '../common/interfaces';
import Icon from 'react-native-vector-icons/Ionicons';
import {MenuView} from '@react-native-menu/menu';
import {Button} from '@ui-kitten/components';
import Form from './Form';
import {useAppDispatch} from '../store';
import {delAlbumsAction, updAlbumsAction} from '../store/albums/actions';

type Props = NativeStackScreenProps<RootStackParamList, 'FullInfo'>;

function FullInfo({route, navigation: {goBack}}: Readonly<Props>) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [album, setAlbum] = useState<IAlbums | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setAlbum(route.params as IAlbums);
  }, [route.params]);

  const delAlbum = async () => {
    if (album) {
      dispatch(delAlbumsAction({album}));
    }
    setModalVisible(false);
    goBack();
  };

  const updAlbum = async (albm: IAlbums) => {
    dispatch(updAlbumsAction({album: albm, isUpdate: true}));
    setAlbum(albm);
    setIsModal(false);
  };

  return (
    <SafeAreaView>
      <View>
        {route?.params && (
          <>
            <MenuView
              title="Menu Title"
              onPressAction={({nativeEvent}) => {
                if (nativeEvent.event === 'destructive') {
                  setModalVisible(true);
                }
                if (nativeEvent.event === 'edit') {
                  setIsModal(true);
                }
              }}
              actions={[
                {
                  id: 'edit',
                  title: 'Изменить',
                  titleColor: '#2367A2',
                  image: 'ic_menu_edit',
                  imageColor: '#2367A2',
                },
                {
                  id: 'destructive',
                  title: 'Удалить',
                  attributes: {
                    destructive: true,
                  },
                  image: 'ic_menu_delete',
                },
              ]}
              shouldOpenOnLongPress={false}>
              <Icon
                name="menu-outline"
                size={30}
                color="#000"
                style={styles.iconMenu}
              />
            </MenuView>
            {album && (
              <>
                <Image
                  source={{
                    width: undefined,
                    height: 400,
                    uri: album.img,
                  }}
                />
                <Text style={gStyle.title}>{album.name}</Text>
                <Text style={styles.full}>{album.full}</Text>
                {/* <Icon
                  name="star-outline"
                  size={30}
                  color="#000"
                  style={styles.iconAdd}
                  onPress={() => {
                    setIsModal(false);
                  }}
                /> */}
              </>
            )}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Удалить запись?</Text>
                  <View style={styles.fixToText}>
                    <Button
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => delAlbum()}>
                      <Text style={styles.textStyle}>OK</Text>
                    </Button>
                    <Button
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Text style={styles.textStyle}>Отмена</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </Modal>

            <Modal
              visible={isModal}
              style={styles.modal}
              animationType={'slide'}>
              <View>
                <Icon
                  name="close-circle"
                  size={30}
                  color="#000"
                  style={styles.iconAdd}
                  onPress={() => {
                    setIsModal(false);
                  }}
                />
                <Text style={styles.title}>Форма изменения</Text>
                <Form addAlbum={updAlbum} album={route.params as IAlbums} />
              </View>
            </Modal>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  full: {
    fontSize: 12,
    color: '#474747',
    fontFamily: 'Roboto-Light',
    textAlign: 'center',
    marginTop: 20,
  },
  iconMenu: {
    paddingTop: 10,
    marginLeft: 10,
  },
  iconAdd: {
    marginTop: 10,
    marginBottom: -10,
    marginLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 3,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
  modal: {
    height: 100,
    width: undefined,
    marginLeft: 10,
  },
  title: {
    fontSize: 22,
    color: '#474747',
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default FullInfo;
