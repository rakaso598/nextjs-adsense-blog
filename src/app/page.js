import AdSense from "@/components/AdSense";

export default async function HomePage() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Example
          </h1>
          {/* 페이지 제목 아래 광고 (반응형 자동 광고) */}
          <div className="mt-5">
            <AdSense
              adSlot="1104919833"
              adFormat="auto"
              className="mx-auto"
              style={{ maxWidth: "728px" }}
            />
          </div>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Next.js App Router
          </p>
        </div>

        <div className="mt-10">
          <div className="rounded-lg shadow-lg overflow-hidden">
            <div className="bg-white p-6 sm:p-10">
              <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900"></h2>
                <p className="mt-4 text-lg text-gray-500">Example</p>
              </div>
              {/* 콘텐츠 영역 상단 광고 (배너 광고) */}
              <div className="mt-8 flex justify-center">
                <AdSense
                  adSlot="6879990693"
                  adFormat="banner"
                  style={{ width: "300px", height: "250px" }}
                />
              </div>
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
                  {/* 콘텐츠 내부 광고 (작은 배너 광고) */}
                  <div className="mt-4">
                    <AdSense
                      adSlot="4882406950"
                      adFormat="banner"
                      style={{
                        width: "300px",
                        height: "250px",
                        margin: "0 auto",
                      }}
                    />
                  </div>
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
                  {/* 콘텐츠 내부 광고 (작은 배너 광고) */}
                  <div className="mt-4">
                    <AdSense
                      adSlot="1326019911"
                      adFormat="banner"
                      style={{
                        width: "300px",
                        height: "250px",
                        margin: "0 auto",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 페이지 하단 광고 (반응형 자동 광고) */}
        <div className="mt-12">
          <AdSense
            adSlot="9314582342"
            adFormat="auto"
            className="mx-auto"
            style={{ maxWidth: "728px" }}
          />
        </div>
      </div>
    </div>
  );
}
