function UserProfilePage(props) {
  return (
    <h1>{props.username}</h1>
  )
}

export default UserProfilePage

// server에서 실행됨
export async function getServerSideProps(context) {
  return {
    props: {
      username: 'Max'
    }
  }
}