'use client'

import React from 'react'
import Link from 'next/link'
import { episode as staticEpisode, siteConfig, episodes as staticEpisodesData } from '@/data/siteData'
import type { Episode } from '@/lib/data'

interface EpisodeHeroProps {
  episode?: Episode | null
}

const EpisodeHero = ({ episode: propEpisode }: EpisodeHeroProps) => {
  const ep = propEpisode ?? staticEpisode
  const episodesData = propEpisode ? [propEpisode] : staticEpisodesData
  return (
    <>
      {/* Marquee Banner */}
      <div className="bg-secondary py-4 overflow-hidden whitespace-nowrap -rotate-[2deg] transform origin-center">
        <div className="flex animate-marquee">
          <span className="text-black font-bold uppercase tracking-[0.3em] text-sm inline-block">
            {siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span className="text-black font-bold uppercase tracking-[0.3em] text-sm inline-block">
            {siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <div>
              {/* Episode Badge */}
              <div className="inline-block bg-gray-200 px-4 py-2 rounded-md text-xs font-bold text-black uppercase tracking-widest mb-6">
                EPISODE {ep.number}
              </div>

              {/* Heading */}
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-black mb-6">
                {ep.title}
              </h1>

              {/* Description */}
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-8">
                {ep.description.replace(/\*\*/g, '')}
              </p>

              {/* Platform Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={siteConfig.platformLinks.apple}
                  className="flex items-center gap-3 px-6 py-4 bg-black text-white rounded-2xl transition-all hover:scale-105 w-full sm:w-auto sm:min-w-[15rem]"
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <svg width="30" height="30" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_132_37)">
                        <path d="M8.01003 3.18685e-05C3.58091 -0.0123431 -0.0123431 3.58091 3.18685e-05 8.01003V27.99C-0.0123431 32.4192 3.58091 36.0124 8.01003 36H27.99C32.4192 36.0124 36.0124 32.4192 36 27.99V8.01003C36.0124 3.58091 32.4192 -0.0123431 27.99 3.18685e-05H8.01003ZM17.7942 3.84866C21.2985 3.84866 24.4677 5.20316 26.883 7.73328C28.7179 9.63791 29.7484 11.6584 30.276 14.3202C30.4572 15.2055 30.4572 17.6187 30.2862 18.6143C29.7237 21.7834 27.99 24.6207 25.4295 26.5602C24.516 27.252 22.2829 28.4535 21.9252 28.4535C21.7902 28.4535 21.78 28.3185 21.8385 27.7617C21.9499 26.8707 22.0545 26.6895 22.5585 26.478C23.3607 26.145 24.732 25.1652 25.5702 24.3282C27.0338 22.8623 28.0778 21.0297 28.5818 19.0193C28.8979 17.7818 28.8563 15.0334 28.5109 13.7633C27.4208 9.71891 24.1155 6.58016 20.0734 5.73528C18.9023 5.49566 16.7625 5.49566 15.5734 5.73528C11.4829 6.58016 8.09553 9.87866 7.06503 14.0277C6.78941 15.1572 6.78941 17.9067 7.06503 19.0317C7.75016 21.78 9.52653 24.2978 11.8519 25.7985C12.3098 26.1034 12.8599 26.4139 13.0894 26.5084C13.5923 26.7244 13.7048 26.9078 13.797 27.7909C13.8555 28.3365 13.8432 28.4884 13.716 28.4884C13.6339 28.4884 13.0185 28.224 12.3672 27.9135L12.3087 27.8674C8.59953 26.0449 6.22578 22.9579 5.35953 18.8494C5.14916 17.7885 5.10753 15.264 5.31903 14.2909C5.85791 11.6775 6.88953 9.63903 8.60516 7.83453C11.079 5.22566 14.2605 3.84866 17.7987 3.84866H17.7942ZM18 8.06853C18.6087 8.07416 19.2015 8.12703 19.6572 8.22603C23.8365 9.15753 26.7942 13.3369 26.2193 17.4837C25.9909 19.1588 25.4172 20.5313 24.3979 21.8082C23.8939 22.4528 22.6688 23.5317 22.4528 23.5317C22.4168 23.5317 22.3819 23.121 22.3819 22.6283V21.7193L23.0029 20.9757C25.3575 18.1575 25.1888 14.22 22.6215 11.6427C21.6259 10.6347 20.4705 10.0418 18.9822 9.77403C18.0225 9.59291 17.8223 9.59291 16.8143 9.76166C15.2798 10.008 14.0952 10.5987 13.0399 11.6427C10.4625 14.1975 10.2915 18.1575 12.6484 20.9757L13.2694 21.7193V22.6339C13.2694 23.1379 13.2278 23.5418 13.1749 23.5418C13.1344 23.5418 12.7823 23.3022 12.4065 23.0029L12.3537 22.9849C11.106 21.9893 10.0047 20.2253 9.54678 18.4905C9.27228 17.442 9.27228 15.4564 9.55916 14.4124C10.3152 11.5943 12.3953 9.40841 15.273 8.38353C15.8884 8.16641 16.9707 8.04941 17.991 8.06741L18 8.06853ZM17.8009 12.5505C18.27 12.5505 18.7324 12.645 19.0733 12.8205C19.7989 13.2019 20.4042 13.9332 20.6314 14.7072C21.3289 17.0742 18.8213 19.1487 16.5465 18.0878H16.5297C15.4575 17.5894 14.8827 16.6523 14.8703 15.4328C14.8703 14.3314 15.4789 13.3763 16.5398 12.8138C16.8739 12.6383 17.3374 12.5494 17.8054 12.5494L17.8009 12.5505ZM17.7885 19.647C19.2724 19.6414 20.3434 20.1679 20.7417 21.0994C21.0398 21.7969 20.9295 23.994 20.4132 27.5513C20.0678 30.0353 19.8743 30.6619 19.395 31.0849C18.7324 31.6699 17.8009 31.8353 16.9099 31.518H16.9054C15.8333 31.131 15.6038 30.609 15.1583 27.5502C14.6498 23.994 14.5373 21.7958 14.8377 21.0983C15.2292 20.1724 16.2957 19.6527 17.7897 19.6459L17.7885 19.647Z" fill="white"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_132_37">
                          <rect width="36" height="36" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-white/60 uppercase">Available on</div>
                    <div className="text-base font-bold text-white">Apple Podcast</div>
                  </div>
                </Link>

                <Link
                  href={siteConfig.platformLinks.spotify}
                  className="flex items-center gap-3 px-6 py-4 bg-black text-white rounded-2xl transition-all hover:scale-105 w-full sm:w-auto sm:min-w-[15rem]"
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <svg width="30" height="30" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_132_42)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M30.2385 16.8439C24.1148 13.2073 14.0125 12.8725 8.16429 14.6471C7.22569 14.9302 6.23389 14.4019 5.94889 13.4614C5.66389 12.5228 6.194 11.531 7.1326 11.246C13.8453 9.2073 25.0021 9.60043 32.053 13.7861C32.8966 14.2877 33.174 15.3788 32.6724 16.2224C32.1746 17.066 31.0802 17.3455 30.2385 16.8439ZM30.039 22.2304C29.6096 22.9277 28.6976 23.1459 28.0003 22.7184C22.895 19.5796 15.1088 18.6713 9.0687 20.5048C8.284 20.7404 7.45751 20.2995 7.22001 19.5167C6.98441 18.7339 7.4252 17.9071 8.208 17.6696C15.1069 15.5758 23.6854 16.5906 29.5507 20.1949C30.248 20.6224 30.4665 21.535 30.039 22.2304ZM27.7134 27.4034C27.3714 27.962 26.6437 28.1388 26.0851 27.7968C21.6239 25.0703 16.0075 24.4549 9.3936 25.9654C8.7571 26.1117 8.1206 25.7123 7.9762 25.0739C7.8299 24.4374 8.227 23.8035 8.8673 23.6572C16.1044 22.0023 22.3117 22.7143 27.3201 25.7752C27.8787 26.1172 28.0554 26.8448 27.7134 27.4034ZM19 0C8.5063 0 0 8.5063 0 19C0 29.4937 8.5063 38 19 38C29.4937 38 38 29.4937 38 19C38 8.5082 29.4937 0 19 0Z" fill="white"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_132_42">
                          <rect width="38" height="38" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-white/60 uppercase">Available on</div>
                    <div className="text-base font-bold text-white">Spotify</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Right Image — Episode Thumbnail */}
            <div className="relative w-full h-[280px] md:h-[380px] flex items-center justify-center">
              <div className="w-full h-full rounded-2xl overflow-hidden">
                <img
                  src={episodesData[0]?.logo || '/cover-placeholder.jpg'}
                  alt={ep.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default EpisodeHero
