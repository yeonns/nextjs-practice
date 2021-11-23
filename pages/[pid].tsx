import { Fragment } from "react"
import path from 'path'
import fs from 'fs/promises'

function ProductDetailPage(props) {
  const { loadedProduct } = props

  if (!loadedProduct) {
    return <p>Loading...</p>
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  )
}

export async function getStaticProps(context) {
  const { params } = context

  const productId = params.pid
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData)

  const product = data.products.find(product => product.id === productId)

  return {
    props: {
      loadedProduct: product
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { pid: 'p1' } },
    ],
    fallback: true,
    //fallback: 'blocking', data fetch가 끝나기전에는 어떤 page도 띄워주지않음 if(!loadedProduct) { return <p>Loading...</p> } 제거 가능
  }
}

export default ProductDetailPage