function getRecommended() {
  // fetch('https://www.fastmock.site/mock/899de9c07424960e972a6ae2615eba3f/api/recommended-list').then((res) => {
  //   console.log(res)
  // }).catch((err) => {
  //   console.log(err)
  // })
  axios({
    url: 'https://www.fastmock.site/mock/899de9c07424960e972a6ae2615eba3f/api/recommended-list',
    method: 'get'
  }).then(res => {
    console.log(res.data)
  })
}
getRecommended()