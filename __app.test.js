import reducers from '../../reducers';

test('reducers', () => {
  let state;
  state = reducers({auth:{token:null,username:null,authRedirectPath:'/',error:null}}, {type:'AUTH_ERROR',error:'The user or password doesn\'t match!'});
  expect(state).toEqual({auth:{token:null,username:null,authRedirectPath:'/',error:'The user or password doesn\'t match!'}});
});



import reducers from '../../reducers';

test('reducers', () => {
  let state;
  state = reducers({auth:{token:null,username:null,authRedirectPath:'/',error:'The user or password doesn\'t match!'}}, {type:'AUTH_SUCCESS',token:'psxol81bl6omnlhuxugskkd1zu1p76n9lxykfo5y68opwi4gatl8ipltdjrr341o',username:'asd@asd.com'});
  expect(state).toEqual({auth:{token:'psxol81bl6omnlhuxugskkd1zu1p76n9lxykfo5y68opwi4gatl8ipltdjrr341o',username:'asd@asd.com',authRedirectPath:'/',error:'The user or password doesn\'t match!'}});
});
