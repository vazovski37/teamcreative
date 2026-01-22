import { useTranslation } from "react-i18next";
import { Container } from "@/components/ui/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";

const partners = [
    "OLMECA", "PROVIDER", "HIDDEN GEORGIA TRAVEL", "HORSEBACK GEORGIA",
    "AGROMAN", "UNIFYD TV", "HAUCK GEORGIA", "CLEAN HOUSE", "CAPRI", "PREMIX"
];

export function PartnersSlider() {
    const { t } = useTranslation();

    return (
        <section className="py-20 overflow-hidden">
            <Container className="flex flex-col items-center mb-16">
                <div className="flex items-center gap-6 md:gap-12">
                    <Image
                        src="/assets/star-icon.png"
                        alt="star"
                        width={30}
                        height={50}
                        className="w-6 h-10 md:w-8 md:h-14"
                    />
                    <h2 className="text-[20px] md:text-[28px] font-medium font-[family-name:var(--font-ms-block)] text-white uppercase tracking-[1.5px] leading-[1.4] md:leading-[71px] text-center">
                        {t('about.partners')}
                    </h2>
                    <Image
                        src="/assets/star-icon.png"
                        alt="star"
                        width={30}
                        height={50}
                        className="w-6 h-10 md:w-8 md:h-14 scale-x-[-1]"
                    />
                </div>
            </Container>

            <div className="w-full">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={20}
                    slidesPerView="auto"
                    loop={true}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                    }}
                    speed={3000}
                    className="partners-swiper"
                >
                    {partners.map((partner, index) => (
                        <SwiperSlide key={index} className="!w-auto">
                            <div className="bg-[#111] hover:bg-[#1a1a1a] transition-colors rounded-2xl px-12 py-8 flex items-center justify-center min-w-[250px] min-h-[100px] border border-white/5">
                                <span className="text-white font-medium text-[16px] md:text-[20px] uppercase whitespace-nowrap font-[family-name:var(--font-firago)]">
                                    {partner}
                                </span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
