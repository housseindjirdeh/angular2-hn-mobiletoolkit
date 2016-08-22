import { provideRouter, RouterConfig } from '@angular/router';

import StoriesComponent from './stories/stories.component';
import ItemCommentsComponent from './item-comments/item-comments.component';
import UserComponent from './user/user.component';

const routes: RouterConfig = [
  { path: '', component: StoriesComponent},
  { path: 'news/:page', component: StoriesComponent },
  { path: 'newest/:page', component: StoriesComponent },
  { path: 'show/:page', component: StoriesComponent },
  { path: 'ask/:page', component: StoriesComponent },
  { path: 'jobs/:page', component: StoriesComponent },
  { path: 'item/:id', component: ItemCommentsComponent },
  { path: 'user/:id', component: UserComponent }
];

export const appRouterProviders = [
  provideRouter(routes)
];