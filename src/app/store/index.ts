import { ApiUsersState, apiUsersReducer, initialApiUsersState } from './api-users/reducers';
import { ActionReducerMap, createSelector } from '@ngrx/store';


export interface AppState {
  apiUsers: ApiUsersState;
}

export const reducers: ActionReducerMap<AppState> = {
  apiUsers: apiUsersReducer
};

// Api-users selectors
export const selectApiUsersFeature = (state: AppState) => state.apiUsers;
export const selectApiUsersLoading = createSelector(
  selectApiUsersFeature,
  (state: ApiUsersState) => state.loading
);

export const selectApiUsers = createSelector(
  selectApiUsersFeature,
  (state: ApiUsersState) => state.users
);

export const selectApiUsersListPagination = createSelector(
  selectApiUsersFeature,
  (state: ApiUsersState) => state.pagination
);

export const selectApiUsersErrorOnFetching = createSelector(
  selectApiUsersFeature,
  (state: ApiUsersState) => state.errorOnFetching
);
