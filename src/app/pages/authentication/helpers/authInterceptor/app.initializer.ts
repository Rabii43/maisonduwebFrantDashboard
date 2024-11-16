import {AuthService} from '../../_service/auth.service';

export function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      // attempt to refresh token on app start up to auto authenticate
      // @ts-ignore
      authService.refreshToken().subscribe().add(resolve);
    });
  };
}
