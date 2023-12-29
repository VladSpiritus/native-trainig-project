import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {Formik} from 'formik';
import {IAlbums} from '../common/interfaces';

type props = {
  album: IAlbums;
  addAlbum: (values: IAlbums) => void;
};

function Form({album, addAlbum}: Readonly<props>) {
  return (
    <View>
      <Formik
        initialValues={{
          name: album.name,
          anons: album.anons,
          full: album.full,
          img: album.img,
          key: album.key,
          id: album.id,
        }}
        onSubmit={(values, action) => {
          addAlbum(values);
          action.resetForm();
        }}>
        {props => (
          <View>
            <TextInput
              style={styles.input}
              value={props.values.name}
              placeholder="Введите название"
              onChangeText={props.handleChange('name')}
            />
            <TextInput
              style={styles.input}
              value={props.values.anons}
              placeholder="Введите анонс"
              onChangeText={props.handleChange('anons')}
            />
            <TextInput
              style={styles.input}
              value={props.values.full}
              multiline
              placeholder="Введите описание"
              onChangeText={props.handleChange('full')}
            />
            <TextInput
              style={styles.input}
              value={props.values.img}
              placeholder="Укажите фото"
              onChangeText={props.handleChange('img')}
            />
            <Button title="Сохранить" onPress={() => props.handleSubmit()} />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    marginTop: 15,
    padding: 10,
    borderColor: 'silver',
    borderRadius: 5,
  },
});

export default Form;
