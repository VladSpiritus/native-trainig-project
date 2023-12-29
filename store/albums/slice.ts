import {createSlice} from '@reduxjs/toolkit';

import {FetchStatus} from '../../common/enums';

import {fetchAlbumsAction} from './actions';
import {IAlbums} from '../../common/interfaces';

const initialState = {
  albums: {
    loadingState: FetchStatus.IDLE,
    data: [] as IAlbums[],
    error: undefined as unknown as string,
  },
};

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAlbumsAction.pending, state => {
        state.albums.loadingState = FetchStatus.PENDING;
        state.albums.error = undefined as unknown as string;
      })
      .addCase(fetchAlbumsAction.fulfilled, (state, action) => {
        state.albums.loadingState = FetchStatus.SUCCEEDED;
        state.albums.data = action.payload;
      })
      .addCase(fetchAlbumsAction.rejected, (state, action) => {
        state.albums.loadingState = FetchStatus.FAILED;
        state.albums.error = action.error.message as string;
        state.albums.data = [];
        console.error(action.error);
      });
  },
});
