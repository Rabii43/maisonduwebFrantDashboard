import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import {HttpHeaders} from "@angular/common/http";


export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({
      uri: 'https://choice-mackerel-46.hasura.app/v1/graphql',
      headers: new HttpHeaders({
        'x-hasura-admin-secret': 'e6msOMQXXPeufT44M4roPRUkjrS7POWJbbiSyu7NXpsN4ikrNDB74N2OBy46mo70',
        'content-type': 'application/json',
      }),
    }),
    cache: new InMemoryCache(),
  };
}
@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
