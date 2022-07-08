import axios from 'axios';

const BACK_END_URL = 'http://localhost:3000/api/v1';

// GET ALL categories
export const fetchAllCategories = async () => {
  const categoriesData = await axios.get(`${BACK_END_URL}/categories`);
  return categoriesData;
};

// GET ALL fruniture
export const fetchAllFurniture = async (categoryId) => {
  const furnitureData = await axios.get(`${BACK_END_URL}/categories/${categoryId}/furniture_items`)
    .then((res) => res.data);
  return furnitureData;
};