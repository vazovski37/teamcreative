"use client";

import { Container } from "@/components/ui/Container";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useTranslation } from "react-i18next";

// Slide data with translation keys
const slides = [
    { id: 1, key: "webDesign", color: "bg-gradient-to-r from-cyan-500 to-blue-600" },
    { id: 2, key: "development", color: "bg-gradient-to-r from-blue-700 to-purple-600" },
    { id: 3, key: "branding", color: "bg-gradient-to-r from-purple-600 to-pink-600" },
    { id: 4, key: "marketing", color: "bg-gradient-to-r from-pink-600 to-orange-500" },
    { id: 5, key: "seo", color: "bg-gradient-to-r from-orange-500 to-yellow-500" },
];

export function Slider3D() {
    const { t } = useTranslation();

    return (
        <section className="py-32 overflow-hidden bg-black text-white">
            <Container className="flex flex-col items-center">
                <h2 className="mb-16 text-center text-[28px] md:text-[45px] font-medium tracking-widest text-white uppercase font-[family-name:var(--font-ms-block)] leading-[1.4] md:leading-[71px]">
                    {t('slider.title')}
                </h2>
            </Container>

            <div className="w-full relative">
                <Swiper
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    loop={true}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                    className="mySwiper w-full py-[50px]"
                    initialSlide={1}
                    style={{
                        "--swiper-pagination-color": "#fff",
                        "--swiper-navigation-color": "#fff",
                    } as React.CSSProperties}
                >
                    {slides.map((slide) => (
                        <SwiperSlide
                            key={slide.id}
                            className="!w-[300px] sm:!w-[450px] md:!w-[800px] !h-[400px]"
                        >
                            <div className={`w-full h-full rounded-[30px] p-8 shadow-2xl flex flex-col justify-end ${slide.color} border border-white/20`}>
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-heading break-words">
                                    {t(`slider.${slide.key}.title`)}
                                </h3>
                                <p className="mt-2 text-sm sm:text-base text-white/80">
                                    {t(`slider.${slide.key}.desc`)}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
