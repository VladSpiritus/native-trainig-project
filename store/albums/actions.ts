import {createAsyncThunk} from '@reduxjs/toolkit';

import {IAlbums} from '../../common/interfaces';

export const fetchAlbumsAction = createAsyncThunk<IAlbums[]>(
  'fetchAlbumsAction',
  async (_, {rejectWithValue}) => {
    try {
      const resp = await fetch('http://10.0.2.2:3000/albums');
      return await resp.json();
    } catch (e) {
      console.error('Ошибка при загрузке списка альбомов');
      return rejectWithValue(e);
    }
  },
);

export const updAlbumsAction = createAsyncThunk<
  string,
  {
    album: IAlbums;
    isUpdate: boolean;
  }
>('updAlbumsAction', async ({album, isUpdate}, {rejectWithValue, dispatch}) => {
  try {
    if (isUpdate) {
      const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(album),
      };
      await fetch('http://10.0.2.2:3000/albums/' + album.id, requestOptions);
    } else {
      album.key = (Math.random() * 100).toString();
      album.id = Math.round(Math.random() * 10000);
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(album),
      };
      await fetch('http://10.0.2.2:3000/albums', requestOptions);
    }

    dispatch(fetchAlbumsAction())
      .unwrap()
      .catch(() => {
        console.error('Ошибка при загрузке списка альбомов');
      });
    return 'OK';
  } catch (e) {
    console.error('Ошибка при сохранении альбома');
    return rejectWithValue(e);
  }
});

export const delAlbumsAction = createAsyncThunk<
  string,
  {
    album: IAlbums;
  }
>('delFoldersAction', async ({album}, {rejectWithValue, dispatch}) => {
  try {
    const requestOptions = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: '',
    };
    await fetch('http://10.0.2.2:3000/albums/' + album.id, requestOptions);

    dispatch(fetchAlbumsAction())
      .unwrap()
      .catch(() => {
        console.error('Ошибка при загрузке списка альбомов');
      });
    return 'OK';
  } catch (e) {
    console.error('Ошибка при удалении альбома');
    return rejectWithValue(e);
  }
});
