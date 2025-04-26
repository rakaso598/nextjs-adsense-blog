import StartButton from "@/components/ui/StartButton";

export default async function HomePage() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            코드잇로그
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Next.js App Router 인증인가 적용한 코드잇 블로그
          </p>
        </div>

        <div className="mt-10">
          <div className="rounded-lg shadow-lg overflow-hidden">
            <div className="bg-white p-6 sm:p-10">
              <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900">
                  시작하기
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                  지금 바로 로그인하고 블로그 글을 작성해보세요!
                </p>
              </div>
              <div className="mt-8 flex justify-center">
                <StartButton />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  블로그 글 작성
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>
                    블로그 글을 작성하고 공유하세요. 이미지 URL을 추가하여
                    시각적인 콘텐츠를 제공할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  안전한 인증 시스템
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>
                    안전한 인증 시스템으로 사용자 정보를 보호합니다. JWT 토큰을
                    사용하여 로그인 상태를 유지합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
