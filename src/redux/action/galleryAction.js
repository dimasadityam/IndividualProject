
export const getGalleryAction = (data) => {
  console.log("DATA DARI GETGALLERYACTIOB", data)
  return {
    type: "GET_GALLERY",
    payload: data
  }
}