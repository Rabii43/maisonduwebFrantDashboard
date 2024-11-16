import {createReducer, on} from '@ngrx/store';
import * as AuthActions from './auth.actions';
import {Iuser, UserApiModel} from "../../pages/_models/users";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";

export interface AuthState extends EntityState<Iuser> {
  user: UserApiModel | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Create entity adapter for users
const adapter: EntityAdapter<Iuser> = createEntityAdapter<Iuser>({
  selectId: x => x.user.id,
  sortComparer: false
});

// Define the initial state
const initialState: AuthState = adapter.getInitialState({
  user: null,
  token: null,
  loading: false,
  error: null,
});

// Define the reducer
export const authReducer = createReducer(initialState,
  on(AuthActions.logout, () => ({
    ...initialState, // Reset the state to the initial state
  })),
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, {user, token, refresh_token}) => ({
    ...state,
    user,
    token,
    refresh_token,
    loading: false,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error,
  }))
);

// Export default selectors
export const {selectAll, selectEntities} = adapter.getSelectors();
