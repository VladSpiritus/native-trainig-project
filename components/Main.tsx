import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import {gStyle} from '../styles/style';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigate';
import {IAlbums} from '../common/interfaces';
import Icon from 'react-native-vector-icons/Ionicons';
import Form from './Form';
import {MenuView} from '@react-native-menu/menu';
import {useAppDispatch, useAppSelector} from '../store';
import {fetchAlbumsAction, updAlbumsAction} from '../store/albums/actions';
import {albumsSelector} from '../store/albums/selectors';

const emptyAlbum: IAlbums = {
  name: '',
  anons: '',
  full: '',
  key: '0',
  img: '',
  id: 0,
};

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

function Main({navigation}: Readonly<Props>) {
  const [albums, setAlbums] = useState<IAlbums[]>([]);
  const [loading, setLoading] = useState(true);
  const [needUpdate, setNeedUpdate] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (needUpdate) {
      dispatch(fetchAlbumsAction())
        .unwrap()
        .catch(() => {
          console.error('Ошибка при загрузке сетевых папок');
        });
      setNeedUpdate(false);
    }
  }, [dispatch, needUpdate]);

  const al = useAppSelector(albumsSelector);

  useEffect(() => {
    setAlbums(al.data);
    setLoading(false);
  }, [al]);

  const [isModal, setIsModal] = useState(false);

  const addAlbum = async (album: IAlbums) => {
    dispatch(updAlbumsAction({album, isUpdate: false}));
    setIsModal(false);
  };

  return (
    <SafeAreaView>
      <Modal visible={isModal} style={styles.modal} animationType={'slide'}>
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
          <Text style={styles.title}>Форма добавления</Text>
          <Form addAlbum={addAlbum} album={emptyAlbum} />
        </View>
      </Modal>
      <View>
        <MenuView
          title="Menu Title"
          onPressAction={({nativeEvent}) => {
            if (nativeEvent.event === 'add') {
              setIsModal(true);
            }
            if (nativeEvent.event === 'refresh') {
              setNeedUpdate(true);
            }
          }}
          actions={[
            {
              id: 'add',
              title: 'Добавить',
              titleColor: '#2367A2',
              image: 'ic_menu_add',
              imageColor: '#2367A2',
            },
            {
              id: 'refresh',
              title: 'Обновить',
              attributes: {
                destructive: true,
              },
              image: 'ic_menu_rotate',
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

        <Text style={[gStyle.title, styles.header]}>Darkestrah</Text>
        {loading && <Text>Loading..</Text>}
        {albums && (
          <FlatList
            data={albums}
            style={styles.list}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate('FullInfo', item)}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.anons}>{item.anons}</Text>
                <Image
                  source={{
                    width: undefined,
                    height: 125,
                    uri: item.img,
                  }}
                />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modal: {
    height: 100,
    width: undefined,
    marginLeft: 10,
  },
  list: {
    height: 600,
  },
  iconAdd: {
    marginTop: 10,
    marginBottom: -10,
    marginLeft: 10,
  },
  header: {
    marginBottom: 3,
  },
  item: {
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    color: '#474747',
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    marginTop: 10,
  },
  anons: {
    fontSize: 12,
    color: '#474747',
    fontFamily: 'Roboto-Light',
    textAlign: 'center',
    marginTop: 5,
  },
  iconMenu: {
    paddingTop: 10,
    marginLeft: 10,
  },
});

export default Main;
