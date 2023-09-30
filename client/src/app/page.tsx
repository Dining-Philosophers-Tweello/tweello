"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import comicMusk from "../../public/images/comicMusk.jpg";
const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.05,
    },
  },
};

const imageAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  },
};
const line = "Welcome to ";
const line2 = "Tweello";
const line3 = "A website dedicated to tasks.";
const buttonData = [
  { text: "Register", link: "/register" },
  { text: "Login", link: "/login" },
];

export default function Home() {
  return (
    <div className=" mx-auto ">
      <section className="w-full ">
        <div className="">
          <div className="max-w-8xl h-screen mx-auto flex flex-col md:pl-5  lg:flex-row">
            <div
              className="items-left flex flex-col pt-48 text-left lg:w-1/2 lg:flex-grow lg:items-start
               lg:text-left"
            >
              <motion.h3
                className="self-center leading-[.5rem] text-center md:text-left mt-0 mb-12 text-9xl font-bold  md:text-6xl "
                variants={sentence}
                initial="hidden"
                animate="visible"
              >
                {line.split("").map((char, index) => {
                  return (
                    <motion.span
                      key={char + "-" + index}
                      variants={letter}
                      className="text-6xl font-bold"
                    >
                      {char}
                    </motion.span>
                  );
                })}
                <br></br>
                {line2.split("").map((char, index) => {
                  return (
                    <motion.span
                      key={char + "-" + index}
                      variants={letter}
                      className="text-6xl font-bold text-primary"
                    >
                      {char}
                    </motion.span>
                  );
                })}
                <br />
                {line3.split("").map((char, index) => {
                  return (
                    <motion.span
                      key={char + "-" + index}
                      variants={letter}
                      className="underline-blue mt-12 text-xl font-bold  md:leading-relaxed whitespace-nowrap"
                    >
                      {char}
                    </motion.span>
                  );
                })}
                <motion.li
                  className="flex flex-row justify-evenly gap-x-12  self-center"
                  variants={sentence}
                  initial="hidden"
                  animate="visible"
                >
                  {buttonData.map((button, index) => (
                    <motion.div
                      key={index}
                      variants={letter}
                      whileHover={{
                        position: "relative",
                        zIndex: 1,
                        scale: 1.2,
                        transition: {
                          duration: 0.2,
                        },
                      }}
                    >
                      <Button variant="outline" size="lg">
                        <Link href={button.link}>{button.text}</Link>
                      </Button>
                    </motion.div>
                  ))}
                </motion.li>
              </motion.h3>
            </div>
            <motion.div
              className="lg:slice hidden md:flex rounded-lg lg:mb-0 sm:h-full lg:max-w-5xl"
              variants={imageAnimation}
              initial="hidden"
              animate="visible"
            >
              <Image
                className=" object-cover object-center"
                alt="image"
                src={comicMusk}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
