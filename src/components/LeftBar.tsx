import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export default function LeftBar() {
  const socialMedia = [
    { platform: "Instagram", link: "https://www.instagram.com/abdulwasaydogar/", icon: <FaInstagram /> },
    { platform: "Twitter", link: "https://twitter.com/AbdulWasaDogar", icon: <FaTwitter /> },
    { platform: "Linkedin", link: "https://www.linkedin.com/in/abdul-wasay-6013b0269/", icon: <FaLinkedin /> },
    { platform : "Github" , link: "https://github.com/AbdulWasay2568" , icon: <FaGithub/>}
  ];

  return (

    <div className="w-full lg:w-1/4 flex flex-col items-center text-zinc-200">
          <div className="bg-[#121212] rounded-lg w-full p-4 shadow">
            {socialMedia.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 cursor-pointer mb-4 hover:bg-[#223434] rounded-lg transition duration-300 w-full"
              >
                <div className="flex items-center gap-4 text-lg">
                  {social.icon}
                  <p>{social.platform}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
  );
}
