import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Query = {
   __typename?: 'Query';
  _?: Maybe<Scalars['Boolean']>;
  getTiles: Array<Tile>;
};


export type QueryGetTilesArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  pageNumber?: Maybe<Scalars['Int']>;
  include?: Maybe<TileRelationship>;
};

export type Tile = {
   __typename?: 'Tile';
  id: Scalars['String'];
  type: Scalars['String'];
  name: Scalars['String'];
  internalName: Scalars['String'];
  url: Scalars['String'];
  tileImage?: Maybe<Scalars['String']>;
  utmSource: Scalars['String'];
  tagMatch?: Maybe<Scalars['Boolean']>;
  utmMedium?: Maybe<Scalars['String']>;
  utmCampaign?: Maybe<Scalars['String']>;
  activeStartsAt?: Maybe<Scalars['String']>;
  activeEndsAt?: Maybe<Scalars['String']>;
  instore: Scalars['Boolean'];
  online?: Maybe<Scalars['Boolean']>;
  global?: Maybe<Scalars['Boolean']>;
  comingSoon?: Maybe<Scalars['Boolean']>;
  logoImage?: Maybe<Scalars['String']>;
  currentTileUrl?: Maybe<Scalars['String']>;
  currentLogoUrl?: Maybe<Scalars['String']>;
  currentUrl?: Maybe<Scalars['String']>;
  status: Scalars['String'];
};

export enum TileRelationship {
  Categories = 'categories',
  Merchant = 'merchant',
  ActivePromotion = 'activePromotion',
  TileTags = 'tileTags'
}


