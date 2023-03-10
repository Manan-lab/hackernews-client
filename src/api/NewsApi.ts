import axios from 'axios';

const url = process.env.REACT_APP_API_URL;
export default class NewsApi {
  static async getNews() {
    return axios.get(
      `${url}/newstories.json`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json;',
        }
      }
    );
  };

  static async getNewsById(newsId: string) {
    return axios.get(

      `${url}/item/${newsId}.json?print=pretty`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json;',
        }
      }
    );
  };
}
