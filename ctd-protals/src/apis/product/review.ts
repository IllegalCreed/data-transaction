import request from '@/axios'

export const getProductReviews = (id: string | number): Promise<unknown> => {
  const params = {
    id
  }
  return request.post(
    {
      url: '/getProductReviews',
      params
    },
    false
  )
}

export const getProductReviewInfo = (id: string | number): Promise<unknown> => {
  const params = {
    id
  }
  return request.post(
    {
      url: '/getProductReviewInfo',
      params
    },
    false
  )
}
