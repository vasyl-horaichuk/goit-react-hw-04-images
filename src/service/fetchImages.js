import axios from 'axios';
// Fetch images from Pixabay API using Axios
const params = {
    key: '11240134-58b8f655e9e0f8ae8b6e8e7de',
    options: '&image_type=photo&orientation=horizontal&safesearch=true',
    }
    axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchImages(query, page) {

  try {
    const response = await axios.get(
      `?key=${params.key}&q=${query}${params.options}&per_page=12&page=${page}`
    );
    return response.data;
  } catch (error) {
    console.log('ERROR: ' + error);
  }
}