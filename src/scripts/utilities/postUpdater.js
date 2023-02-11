/* eslint-disable no-console */
import _ from 'lodash';
import getAsyncResponse from './axiosGetter';
import parseContentsData from './parser';
import indexSourceData from './sourceDataIndexator';

const getNewPosts = (posts, state) => {
  const { posts: postsInState } = state.form.response;
  return posts.filter(({ postTitle: responsePostTitle }) => !postsInState
    .some(({ postTitle }) => responsePostTitle === postTitle));
};

const updatePosts = (state, notifications) => {
  const { involvedSources } = state.form;
  setTimeout(
    () => {
      const promises = involvedSources.map((source) => getAsyncResponse(source)
        .then((responseData) => parseContentsData(responseData.contents, source))
        .then(({ posts }) => getNewPosts(posts, state))
        .then((posts) => {
          if (!_.isEmpty(posts)) {
            state.form.response.posts.unshift(...indexSourceData(posts));
          }
        })
        .catch((err) => { throw err; }));
      Promise.all(promises)
        .catch(() => {
          console.log(notifications.errors.networkErrors.axiosError());
        });
      return updatePosts(state, notifications);
    },
    5000,
  );
};

export default updatePosts;
