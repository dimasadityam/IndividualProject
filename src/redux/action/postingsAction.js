
export const getPostingsAction = (data) => {
  console.log("data dari component UI", data)
  return {
    type: "GET_POSTINGS",
    payload: data
  }
}