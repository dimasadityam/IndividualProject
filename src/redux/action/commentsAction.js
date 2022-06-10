
export const getCommentsAction = (data) => {
  console.log("data Comments dari component UI", data)
  return {
    type: "GET_COMMENTS",
    payload: data
  }
}