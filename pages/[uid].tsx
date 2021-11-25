function UserIdPage(props) {
  return (
    <h1>{props.id}</h1>
  )
}

export default UserIdPage

// server side이므로
// getStaticPaths 함수 없이도 /u1, /u2 등 페이지 호출이 가능해진다
export async function getServerSideProps(context) {
  const { params } = context
  const userId = params.uid

  return {
    props: {
      id: 'userid-' + userId
    }
  }
}