function UserProfilePage(props) {
  return (
    <h1>{props.username}</h1>
  )
}

export default UserProfilePage

// server에서 실행됨, req, res 가져올 수 있음 (getStaticProps와 다른점)
export async function getServerSideProps(context) {
  const { params, req, res } = context

  return {
    props: {
      username: 'Max'
    }
  }
}