"use client";

import styles from "./styles.module.scss";
import {Button, Typography} from "antd";
import {communications, partnersOne, partnersTwo} from "./data";
import {ArrowLeftOutlined, ArrowRightOutlined} from "@ant-design/icons";
import Image from "next/image";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import {useCallback, useRef} from "react";

export default function PartnersAndCommunications() {
  const sliderRef = useRef<any>();

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div>
        <Typography.Title className="mb-2 text-center">Đối tác & Truyền thông</Typography.Title>
        <Typography.Text className="text-center visible">
          Hợp tác với hơn 17+ doanh nghiệp, câu lạc bộ,...
        </Typography.Text>
      </div>
      <div className="mt-16 flex flex-col gap-12 overflow-hidden pt-1 pb-16">
        <div className="group flex gap-5">
          <div className="flex animate-loop-scroll gap-12">
            {partnersOne.map(item => (
              <div key={item.id} className={styles.partnerItem}>
                <Image width={54} height={54} src={item.image} alt="activity"/>
                <Typography.Text>{item.name}</Typography.Text>
              </div>
            ))}
          </div>
          <div className="flex animate-loop-scroll gap-12" aria-hidden="true">
            {partnersOne.map(item => (
              <div key={item.id} className={styles.partnerItem}>
                <Image width={54} height={54} src={item.image} alt="activity"/>
                <Typography.Text>{item.name}</Typography.Text>
              </div>
            ))}
          </div>
        </div>
        <div className="group flex gap-12">
          <div className="flex animate-loop-scroll-right gap-12">
            {partnersTwo.map(item => (
              <div key={item.id} className={styles.partnerItem}>
                <Image width={54} height={54} src={item.image} alt="activity"/>
                <Typography.Text>{item.name}</Typography.Text>
              </div>
            ))}
          </div>
          <div className="flex animate-loop-scroll-right gap-12" aria-hidden="true">
            {partnersTwo.map(item => (
              <div key={item.id} className={styles.partnerItem}>
                <Image width={54} height={54} src={item.image} alt="activity"/>
                <Typography.Text>{item.name}</Typography.Text>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.communicationWrapper}>
        <Swiper
          className="w-full"
          spaceBetween={24}
          ref={sliderRef}
          breakpoints={{
            640: {
              slidesPerView: 1
            },
            768: {
              slidesPerView: 2
            },
            1024: {
              slidesPerView: 2
            },
            1240: {
              slidesPerView: 3
            },
          }}
        >
          {communications.map((item) => (
            <SwiperSlide key={item.id}>
              <a style={{textDecoration: "none"}} target="_blank" href={item.url}>
                <div className={styles.communicationItem}>
                  <div className={styles.banner}>
                    <img
                      src={item.banner}
                      alt="banner"/>
                  </div>
                  <div className={styles.content}>
                    <div className="flex flex-col justify-center items-center">
                      <img
                        src={item.logo}
                        alt="logo"/>
                      <Typography.Title level={4}>{item.title}</Typography.Title>
                    </div>
                    <Button size="large" type="link">
                      Xem thêm
                      <ArrowRightOutlined/>
                    </Button>
                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex justify-center gap-12">
          <Button
            onClick={handlePrev}
            className={styles.actionButton}
            shape="circle"
            icon={<ArrowLeftOutlined/>}
          />
          <Button
            onClick={handleNext}
            className={styles.actionButton}
            shape="circle"
             icon={<ArrowRightOutlined/>}
          />
        </div>
      </div>
    </div>
  )
}