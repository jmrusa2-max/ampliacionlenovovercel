// app/[modelo]/loading.tsx
export default function Loading() {
  return (
    <div className="w-full max-w-4xl animate-fade-in-up">
      <div className="w-full bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden p-6 sm:p-8">
        {/* Title skeleton */}
        <div className="flex flex-col items-center mb-6">
          <div className="skeleton h-8 w-64 mb-3" />
          <div className="skeleton h-5 w-40" />
        </div>

        {/* Status cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* RAM card skeleton */}
          <div className="flex flex-col items-center rounded-lg border border-white/5 p-6">
            <div className="skeleton h-6 w-24 mb-4" />
            <div className="skeleton h-16 w-16 rounded-full mb-4" />
            <div className="skeleton h-8 w-12 mb-2" />
            <div className="skeleton h-4 w-36" />
          </div>

          {/* Storage card skeleton */}
          <div className="flex flex-col items-center rounded-lg border border-white/5 p-6">
            <div className="skeleton h-6 w-32 mb-4" />
            <div className="skeleton h-16 w-16 rounded-full mb-4" />
            <div className="skeleton h-8 w-12 mb-2" />
            <div className="skeleton h-4 w-36" />
          </div>
        </div>

        {/* Button skeleton */}
        <div className="flex justify-center mt-8">
          <div className="skeleton h-12 w-48 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
