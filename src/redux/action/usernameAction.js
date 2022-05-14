export const getUsernamesAction = (data) => {
  console.log("DATA DARI GETUSERNAMESACTION", data)
  return {
    type: "GET_USERNAMES",
    payload: data
  }
}