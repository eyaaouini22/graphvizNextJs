import axios from 'axios';
 import { graphviz } from '~/pages/api/graphviz';


async function fetchFilesList(): Promise<graphviz[]> {
  const response = await axios.get<graphviz[]>('http://localhost:8084/graph/list');
  return response.data;
}

export default fetchFilesList;