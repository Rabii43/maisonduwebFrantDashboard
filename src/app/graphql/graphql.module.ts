import { NgModule } from '@angular/core';
import {APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

@NgModule({
  imports: [],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({ uri: 'https://choice-mackerel-46.hasura.app/v1/graphql' }),
        };
      },
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
