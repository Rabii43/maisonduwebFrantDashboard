import {Action, combineReducers, createFeatureSelector} from '@ngrx/store';
import {authReducer, AuthState} from './auth/auth.reducer';
import {dashboardReducer, DashboardState} from "./dashboard/dashboard.reducer";
import {widgetReducer, WidgetState} from "./widgets/widget.reducer";

// Define the global state of the application
export interface AppState {
  auth: AuthState;
  dashboard: DashboardState;
  widget: WidgetState;
}

// Associate the reducers of each module with the global store
export function reducers(state: AppState, action: Action) {
  return combineReducers({
    auth: authReducer,
    dashboard: dashboardReducer,
    widget: widgetReducer
  })(state, action)
}

const featureSelector = createFeatureSelector<AuthState>("login")
