"use client";
import { motion, useAnimation } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8 } },
};

const slideInFromLeft = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const slideInFromRight = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function Home() {
  const settings = {
    arrow: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 100,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const controls = useAnimation();
  const containerRef = useRef(null);
  const [xPos, setXPos] = useState(0);

  const skills = [
    {
      icon: "./icons/html.svg",
      title: "HTML",
      description:
        "The art of organizing chaos on the internet. 🎨 Coding my way through the web, one at a time. 🌐",
    },
    {
      icon: "./icons/css.svg",
      title: "CSS",
      description:
        "The Secret Behind Every Beautiful Website. 🎨 Turning Lines of Code into Works of Art.",
    },
    {
      icon: "./icons/js.svg",
      title: "JS",
      description:
        "The Brain Behind Every Interactive Website. Making the Web Smarter🧠 and More",
    },
    {
      icon: "./icons/react.svg",
      title: "React",
      description:
        "Making Reusable Code Beautiful and Efficient The Powerhouse Behind Modern Web Apps. 🚀",
    },
    {
      icon: "./icons/tailwind.svg",
      title: "Tailwind",
      description:
        "Turning Concepts into Clean Code. Crafting 🎨 Responsive Designs with Ease.",
    },
    {
      icon: "./icons/next.svg",
      title: "Next.js",
      description:
        "Building Fast, Scalable, and SEO-Friendly Apps. From Zero to Production-Ready",
    },
    {
      icon: "./icons/python.svg",
      title: "Python",
      description:
        "Powerful and easy-to-learn language used in web, automation, and AI.",
    },
    {
      icon: "./icons/mongo.svg",
      title: "MongoDB",
      description:
        "NoSQL database designed for speed, flexibility, and scalability.",
    },
    {
      icon: "./icons/express.svg",
      title: "Express.js",
      description:
        "Lightweight Node.js framework for building fast backend APIs.",
    },
    {
      icon: "./icons/typescript.svg",
      title: "Typescript",
      description:
        "Typed JavaScript that boosts code reliability and maintainability.",
    },
    {
      icon: "./icons/nodejs.svg",
      title: "Node",
      description:
        "Runs JavaScript on the server for high-performance web apps.",
    },
  ];

  const handleMouseEnter = () => {
    controls.stop();
    if (containerRef.current) {
      const computedStyle = window.getComputedStyle(containerRef.current);
      const matrix = new DOMMatrixReadOnly(computedStyle.transform);
      setXPos(matrix.m41); // current X position
    }
  };

  const handleMouseLeave = () => {
    const width = containerRef.current.offsetWidth / 2;
    controls.set({ x: xPos });
    controls.start({
      x: [xPos, xPos - width],
      transition: {
        x: {
          repeat: Infinity,
          duration: 30,
          ease: "linear",
        },
      },
    });
  };

  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        x: {
          repeat: Infinity,
          duration: 30,
          ease: "linear",
        },
      },
    });
  }, []);
   
  return (
    <>
      <Navbar />
      {/* Home section   */}
      <motion.div
        id="home"
        className="grid grid-cols-1 md:grid-cols-2 "
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.section
          className="min-h-[80vh] md:min-h-screen bg-black pt-16 md:pt-0 sm:min-h-[10vh]"
          variants={slideInFromLeft}
        >
          <div className="heading px-6 md:ml-[10vw] mt-[10vh] md:mt-[30vh]">
            <motion.h1
              className="font-bold text-3xl md:text-4xl text-white"
              variants={item}
            >
              Hi , I&apos;m{" "}
              <span className="font-extrabold text-4xl md:text-6xl text-yellow-500">
                Satyam
              </span>
            </motion.h1>
            <motion.h2
              className="font-bold text-xl md:text-2xl text-white mt-2"
              variants={item}
            >
              a <span className="text-orange-600">Web Developer.</span>
            </motion.h2>
            <motion.p
              className="text-sm md:text-lg text-gray-300 mt-4 w-full md:w-[30vw] font-grotesk"
              variants={item}
            >
              Passionate about building beautiful, fast, and responsive
              websites. I love transforming complex problems into simple,
              beautiful, and intuitive designs.
            </motion.p>
            <motion.div
              className="relative inline-block p-[2px] rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 mt-6 md:mt-8"
              variants={item}
            >
              <a
                href="#about"
                className="px-4 py-2 md:px-6 md:py-3 text-white font-semibold text-sm md:text-lg bg-black rounded-md w-full h-full hover:scale-105 transform transition-all duration-300 block text-center"
              >
                About Me
              </a>
            </motion.div>
          </div>
        </motion.section>

        {/* Image section remains hidden on small screens */}
        <motion.section
          className="bg-black hidden md:block"
          variants={slideInFromRight}
        >
          <img
            src="./img.jpeg"
            alt="Profile"
            className="mix-blend-hard-light mt-40 w-full max-w-[60vw] object-contain"
          />
        </motion.section>
      </motion.div>

      {/* About section   */}
      <motion.div
        id="about"
        className="about bg-black grid grid-cols-1 md:grid-cols-2"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }} // Reduced margin for small screens
        variants={container}
      >
        <motion.section
          className="img min-h-[40vh] md:min-h-screen flex justify-center items-center py-8 md:py-0"
          variants={slideInFromLeft}
        >
          <img
            className="w-full max-w-[80vw] md:w-[50vw] mix-blend-hard-light object-contain"
            src="./about.png"
            alt="About illustration"
          />
        </motion.section>

        <motion.section
          className="paragraph flex justify-center items-center font-grotesk px-4 py-6 md:py-0"
          variants={slideInFromRight}
        >
          <div className="bg-gradient-to-r from-gray-900 via-purple-600 to-violet-500 p-[2px] rounded-2xl shadow-lg w-full max-w-lg">
            <motion.div
              className="bg-black/80 backdrop-blur-lg p-4 md:p-8 rounded-2xl border border-white/20"
              variants={scaleUp}
            >
              <h1 className="text-2xl md:text-4xl font-bold font-sora text-yellow-400 text-center">
                About Me
              </h1>
              <p className="text-gray-300 mt-3 md:mt-4 leading-relaxed text-center text-xs md:text-base">
              Hey there! I&apos;m a
                <span className="text-purple-400 font-semibold">
                  {" "}
                  Full-Stack Developer
                </span>{" "}
                skilled in
                <span className="text-blue-400 font-semibold"> React.js</span>,
                <span className="text-yellow-400 font-semibold"> Next.js</span>,
                <span className="text-green-400 font-semibold">
                  {" "}
                  Tailwind CSS
                </span>
                ,
                <span className="text-pink-400 font-semibold"> Express.js</span>
                , and
                <span className="text-purple-500 font-semibold"> MongoDB</span>.
                I am also good at languages like
                <span className="text-yellow-400 font-semibold"> C++ </span>
                <span className="text-green-400 font-semibold"> Java </span>
                <span className="text-blue-400 font-semibold"> Python </span>
                and
                <span className="text-yellow-400 font-semibold">
                  {" "}
                  Javascript{" "}
                </span>
              </p>
              <p className="text-gray-400 mt-3 text-center text-sm md:text-base">
                🚀 Built
                <span className="text-orange-400 font-semibold">
                  {" "}
                  Spotify, Netflix & Twitter clones
                </span>
                <br />
                🛠 Exploring
                <span className="text-cyan-400 font-semibold">
                  {" "}
                  AI integration
                </span>{" "}
                for smart web apps
                <br />
                🎯 Passionate about
                <span className="text-green-300 font-semibold">
                  {" "}
                  coding, problem-solving & tech
                </span>
              </p>
               
              <div className="flex justify-center mt-4 md:mt-5">
                <a
                  href="#contact"
                  className="px-4 py-1 md:px-6 md:py-2 text-black font-semibold text-xs md:text-base bg-yellow-400 rounded-full shadow-lg hover:bg-yellow-500 transition-all"
                >
                  Connect with Me
                </a>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </motion.div>

      {/* Skills section   */}
      <motion.div
        id="skills"
        className="min-h-screen flex justify-center flex-col w-full bg-black py-10 md:py-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h1 className="text-3xl md:text-4xl flex justify-center text-center text-yellow-400 font-sora font-bold mb-10 md:mb-20">
          My Skills
        </motion.h1>

        <div
          className="relative w-[90vw] sm:w-[80vw] mx-auto overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            className="flex gap-10 w-max"
            animate={controls}
            ref={containerRef}
          >
            {[...skills, ...skills].map((skill, index) => (
              <motion.div
                key={index}
                className="relative group flex justify-center"
                whileHover={{ y: -10 }}
              >
                <motion.div
                  className="box border border-purple-700 shadow-xl h-[35vh] min-h-[300px] w-full max-w-[300px] md:w-[22vw] md:max-w-none rounded-2xl flex flex-col items-center transition-all duration-300 bg-black/80 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.4)",
                  }}
                >
                  <div className="icon bg-gradient-to-tr from-gray-700 to-purple-800 rounded-full h-24 w-24 md:h-28 md:w-28 flex justify-center items-center mt-6 md:mt-8 border border-violet-600 shadow-lg">
                    <motion.img
                      className="w-16 md:w-20 object-contain"
                      src={skill.icon}
                      alt={skill.title}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  </div>

                  <div className="text-white w-[80%] text-center mt-4 md:mt-6">
                    <p className="font-grotesk text-sm md:text-base">
                      <span className="font-bold text-lg md:text-xl text-yellow-400 font-sora">
                        {skill.title}
                      </span>{" "}
                      {skill.description}
                    </p>
                  </div>
                </motion.div>

                <motion.div className="absolute inset-0 rounded-2xl bg-purple-500/10 blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Project section   */}
      <motion.div
        id="projects"
        className="min-h-[80vh] md:min-h-screen max-w-full flex justify-center flex-col w-full bg-black py-8 md:py-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <motion.h1
          className="font-bold text-2xl md:text-4xl text-yellow-400 font-sora mt-8 md:mt-24 mb-6 md:mb-20 ml-4 md:ml-10"
          variants={item}
        >
          #Projects
        </motion.h1>

        <motion.div variants={scaleUp} className="px-2 md:px-0">
          <Slider {...settings}>
          {[
            {
              image: "./images/spotify.avif",
              title: "Spotify clone",
              description:
              "A good listening experience with this application",
              link: "https://github.com/Satyam117-web/Spotify",
            },
            { 
             image:"./Ezmart.png",
             title:"Ezmart",
             description:"A web application for online shopping",
             link:"https://ezmart1.vercel.app/"
            },
            {
              image:"./Localite.png",
              title:"Localite",
              description:"A web application for local businesses",
              link:"https://localite-xzyk.vercel.app/"
            },
              {
                image: "./pass.jpg",
                title: "Password Manager",
                description: "An application to manages your password securely",
                link: "https://github.com/Satyam117-web/PassOp-Mongo",
              },
              {
                image: "./url.png",
                title: "Bit links",
                description:
                  "Bit links is a url shorten tool to shorten your links",
                link: "https://github.com/Satyam117-web/Bitlinks",
              },
              {
                image: "./brainwave.jpeg",
                title: "Brainwave",
                description: "A react based website with some cool designs",
                link: "https://github.com/Satyam117-web/WebsitePro",
              },
              {
                image: "./todolist.jpg",
                title: "Todolist",
                description: "A react website which stores your todos ",
                link: "https://github.com/Satyam117-web/Todolist",
              },
            ].map((project, index) => (
              <div className="px-1 md:px-4" key={index}>
                <motion.div
                  className="bg-gradient-to-r from-gray-900 via-purple-600 to-violet-500 p-[2px] rounded-2xl m-1 md:m-5 hover:scale-105 transform transition-all duration-300 w-full max-w-[90vw] md:w-[27vw]"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="card bg-gradient-to-tr from-slate-800 to-violet-800 rounded-2xl h-[40vh] md:h-[50vh] w-full shadow-lg overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-[50%] md:h-[60%] object-cover rounded-t-lg"
                    />
                    <div className="p-3 md:p-4">
                      <h3 className="font-bold text-base md:text-xl text-white font-code">
                        {project.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-300 font-grotesk">
                        {project.description}
                      </p>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1 md:px-4 md:py-2 bg-white text-black rounded-xl items-center flex justify-center font-code text-sm md:text-xl font-semibold bg-gradient-to-tr from-blue-500 to-slate-200 mt-1 md:mt-3"
                      >
                        Demo
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </motion.div>
      </motion.div>

      {/* Contact section   */}
      <motion.div
        id="contact"
        className="min-h-[80vh] md:min-h-screen max-w-full flex justify-center flex-col w-full bg-black py-8 md:py-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn} 
      >
        <ContactForm />
      </motion.div>
    </>
  );
}