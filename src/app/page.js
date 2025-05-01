import AdSense from "@/components/AdSense";

export default async function HomePage() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Example
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Next.js App Router
          </p>
        </div>

        <div className="mt-10">
          <div className="rounded-lg shadow-lg overflow-hidden">
            <div className="bg-white p-6 sm:p-10">
              <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900">
                  <AdSense adSlot="YOUR_AD_UNIT_ID" adFormat="auto" />
                </h2>
                <p className="mt-4 text-lg text-gray-500">Example</p>
              </div>
              <div className="mt-8 flex justify-center"></div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Title1
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Content1</p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Title2
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Content2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
