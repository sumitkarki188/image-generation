import React from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";

const Description = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-24 p-6 md:px-28"
    >
      <h1 className="text-3xl sm:text-4xl">Create AI Images</h1>
      <p className="text-gray-500 mb-8">Turn your imagination into visuals</p>

      <div className="flex flex-col gap-5 md:gap-14 md:flex-row items-center">
        <img
          className="w-80 xl:w-96 rounded-lg "
          src={assets.sample_img_1}
          alt=""
        />
        <div>
          <h2 className="text-3xl font-medium max-w-lg mb-4">
            Introducing the AI-Powered Text to image Generator
          </h2>
          <p className="text-gray-600 mb-4">
            Experience the future of creativity with our AI-powered
            text-to-image generator. Transform your words into stunning visuals
            effortlessly. Whether you're a designer, marketer, or content
            creator, our tool empowers you to bring your ideas to life in
            seconds. Say goodbye to creative blocks and hello to endless
            possibilities. Try it now and see your imagination come alive!
          </p>

          <p className="text-gray-600">
            Unleash your creativity with our AI-powered text-to-image generator.
            Transform words into stunning visuals effortlessly. Perfect for
            designers, marketers, and content creators. Try it now and bring
            your ideas to life!
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Description;
