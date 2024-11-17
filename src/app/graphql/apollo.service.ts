import { Injectable } from '@angular/core';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class ApolloService {
  constructor(private apollo: Apollo) {
    this.apollo.create({
      cache: new InMemoryCache(),
      uri: 'https://choice-mackerel-46.hasura.app/v1/graphql',
    });
  }
}
