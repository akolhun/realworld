import superagentPromise from 'superagent-promise';
import _superagent, {
  ResponseError,
  SuperAgentRequest,
  Response,
} from 'superagent';


export const API_URI = 'http://localhost:3000/api';

const superagent = superagentPromise(_superagent, global.Promise);

function applyAuth(httpClient: any, authToken: string ) {
  httpClient.set('Token' + authToken)
  return httpClient
}

const requests = {
  get: (url: string, handler: (err:Body, res:Body) => void, authToken: string | null ) => {
    let httpClient = superagent
      .get(`${API_URI}${url}`)
      .end((err:Body, res:Body) => handler(err, res))
      return authToken!=null?applyAuth(httpClient, authToken): httpClient
  }, 
  post: (url: string, body: any, handler: (err:Body, res:Body) => void, authToken: string | null) =>
        superagent
          .post(`${API_URI}${url}`, body)
          .set('authorization', 'Token ' + authToken)
          .end((err:Body, res:Body) => handler(err, res))
};

export default requests;
