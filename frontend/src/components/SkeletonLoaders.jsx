export function SkeletonLoader({ width = '100%', height = '20px', borderRadius = '8px' }) {
  return <div className="skeleton-loader" style={{ width, height, borderRadius }}></div>
}

export function SalonCardSkeleton() {
  return (
    <div className="salon-card skeleton-card">
      <SkeletonLoader height="200px" borderRadius="12px" />
      <div className="skeleton-content">
        <SkeletonLoader height="20px" width="70%" />
        <SkeletonLoader height="16px" width="90%" style={{ marginTop: '8px' }} />
        <SkeletonLoader height="16px" width="60%" style={{ marginTop: '8px' }} />
      </div>
    </div>
  )
}

export function BookingSkeleton() {
  return (
    <div className="booking-skeleton">
      <SkeletonLoader height="40px" width="80%" style={{ marginBottom: '20px' }} />
      <div style={{ display: 'grid', gap: '15px' }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <SkeletonLoader key={i} height="60px" />
        ))}
      </div>
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="dashboard-skeleton">
      <SkeletonLoader height="30px" width="40%" style={{ marginBottom: '20px' }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton-card">
            <SkeletonLoader height="150px" />
          </div>
        ))}
      </div>
    </div>
  )
}
