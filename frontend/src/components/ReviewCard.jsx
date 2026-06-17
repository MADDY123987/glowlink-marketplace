export default function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <div className="review-rating">{review.rating} ★</div>
      <p>{review.comment}</p>
      <div className="review-author">{review.author}</div>
    </div>
  )
}
