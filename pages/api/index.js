import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {
  try {
    // Check if sw and ne are defined before accessing their properties
    if (!sw || !ne || !sw.lat || !sw.lng || !ne.lat || !ne.lng) {
      throw new Error("Invalid coordinates provided");
    }

    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
          "x-rapidapi-key": "0c8f286ff3msha7ea350e2b943f1p152473jsnfe57b0faf208",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(`Fetch data Error : ${error}`);
    throw error; // rethrow the error to handle it in the calling code
  }
};
